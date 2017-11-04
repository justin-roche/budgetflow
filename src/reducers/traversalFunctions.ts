import { SimulationFunctions } from '../parser/simulationFunctions';
import { ArrayById, ArrayToObject} from './utilities';

/* TRAVERSAL */

function traverseCycles(_state, payload: Number = 1) {
    let cycleCount = payload;
    let state = { ..._state }
    let cache =  { ...state.cache };

    for (let c = 0; c < cycleCount; c++) {
        let sources = getSources(ArrayById(state.nodesData));
        let newNodesDataArray = breadthTraverse(sources, state);
        let newNodesDataObject = newNodesDataArray.reduce((acc, item) => {
            return { ...acc, [item.id]: item };
        }, {});
        state = { ...state, nodesData: newNodesDataObject };
        let name = String(c);
        cache[name] = state;
    }

    state = { ...state, nodesData: applyDisplayFunctions(state), cache: cache };

    return state;
}

function breadthTraverse(current: Array<NodeData>, g, _linkedSources = []) {

    /* apply step function to nodes */

    let steppedSources = current.map((nodeData, i) => {
        return { ...nodeData, ...applyStepFunction(nodeData) };
    })

    let nestedTargets: Array<Array<NodeData>> = current.map(nodeData => { // n
        return getOutNodes(nodeData, g);
    });

    /* apply graph step function */


    /* apply link function forward for a single level */
    let { linkedTargets, linkedSources } = linkSources(steppedSources, nestedTargets, _linkedSources, g);

    if (Object.keys(linkedTargets).length === 0) {
        return ArrayById(linkedSources);
    } else {
        return ArrayById(linkedSources).concat(breadthTraverse(ArrayById(linkedTargets), g, _linkedSources.concat(ArrayById(linkedSources))));      // n
    }

}

declare interface LinkedSources {
    linkedTargets: NodesData
    linkedSources: NodesData
}
function linkSources(steppedSources: Array<NodeData>, allTargets: Array<Array<NodeData>>, sourcesAlreadyLinked, g): LinkedSources {

    return steppedSources.reduce(function (acc, sourceData, i) {
        let outNodes: Array<NodeData> = allTargets[i];

        if (!sourceData.active || outNodes.length === 0 || sourcesAlreadyLinked.some(n => n.id === sourceData.id)) {
            return {
                linkedTargets: { ...acc.linkedTargets, ...ArrayToObject(outNodes) },
                linkedSources: { ...acc.linkedSources, [sourceData.id]: sourceData }
            };
        }
        else {
            /* apply link function when outNodes and not already stepped source
                the single function is applied to multiple target nodes  */
            let { linkedTargets, linkedSource } = linkSource(sourceData, outNodes, g);
            return {
                linkedTargets: { ...acc.linkedTargets, ...linkedTargets },
                linkedSources: { ...acc.linkedSources, ...linkedSource }
            };
        }
    }, { linkedTargets: {}, linkedSources: {} });
}

declare interface LinkedSource {
    linkedTargets: NodesData,
    linkedSource: NodesData
}

/* link from a single source to it's multiple targets */

function linkSource(_source: NodeData, targets: Array<NodeData>, g: Graph) {

    return targets.reduce((acc: any, target, i) => {

        /* extract from NodesData type of acc to NodeData type */
        let source = acc.linkedSource[_source.id];

        let edge: EdgeData = getEdge(source, target, g);
        let { linkedSource, linkedTarget } = linkTarget(source, target, edge);

        return {
            linkedTargets: {
                ...acc.linkedTargets,
                [linkedTarget.id]: linkedTarget
            },
            linkedSource: { [linkedSource.id]: linkedSource }
        }

    }, { linkedTargets: ArrayToObject(targets), linkedSource: { [_source.id]: _source } })

}

declare interface LinkPair {
    linkedSource: NodeData,
    linkedTarget: NodeData
}
function linkTarget(source: NodeData, target: NodeData, edge): LinkPair {

    return edge.linkFunctions.reduce((acc, functionSettings) => {
        let fn = SimulationFunctions.linkFunctions[functionSettings.name];

        /* application */
        let singleResult;
        if (target.active || functionSettings.phase === 'prelink') {
            /* apply if node is active */
            singleResult = fn(acc.linkedSource, target, ...functionSettings.arguments);
            return {
                linkedSource: singleResult.source,
                linkedTarget: singleResult.target
            };
        } else {
            return {
                linkedSource: source,
                linkedTarget: target
            }
        }

    }, { linkedSource: source, linkedTarget: target });
}

function applyStepFunction(nodeData) {
    let update = nodeData.stepFunctions.reduce((acc, functionSettings) => {
        let fn = SimulationFunctions.stepFunctions[functionSettings.name];
        let newSlice = fn(nodeData, ...functionSettings.arguments);
        let updated = { ...acc, ...newSlice };
        return updated;
    }, { ...nodeData });

    return update;
}

function applyDisplayFunctions(g) {
    let nodesArr = ArrayById(g.nodesData);

    /* apply for graph */
    let displayFns = g.data.displayFunctions.nodes;

    let update = displayFns.reduce((nodesArr, functionSettings) => {
        /* for each display function */
        let fn = SimulationFunctions.displayFunctions[functionSettings.name];

        /* reduce the nodesArray */
        let updatedNodesArr = nodesArr.reduce((acc, node) => {
            let nodeData = g.nodesData[node.id]
            let newDisplayData = fn(node, nodeData, ...functionSettings.arguments);
            return acc.concat([{ ...node, displayData: { ...newDisplayData } }]);
        }, []);

        return updatedNodesArr;

    }, nodesArr);

    /* convert back to object type */
    return ArrayToObject(update);
}

/* helper functions */

function getSources(g) {
    return g.filter(n => n.type === 'source');
}

function getOutNodes(nodeData, g) {
    return g.nodes[nodeData.id].outEdges
        .map(edgeName => {
            return g.edges[edgeName]
        })
        .map(edge => {
            return g.nodes[edge.target]
        })
        .map(outNode => {
            return g.nodesData[outNode.id]
        });
}

function getEdge(source, target, g) {
    return g.nodes[source.id].outEdges.map(edge => g.edges[edge])
        .filter(g => g.target === target.id)
        .map(edgeDescription => g.edgesData[edgeDescription.id])
        .pop();
}

export { traverseCycles, applyDisplayFunctions };