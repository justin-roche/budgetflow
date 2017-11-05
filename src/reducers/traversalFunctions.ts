import { stepFunctions } from '../parser/stepFunctions';
import { displayFunctions } from '../parser/displayFunctions';
import { linkFunctions } from '../parser/linkFunctions';

import { ArrayById, ArrayToObject} from './utilities';
import { _ } from 'underscore';

function traverseCycles(_state, payload: Number = 1, globalState) {
    let cycleCount = payload;
    let state = { ..._state }

    for (let c = 0; c < cycleCount; c++) {
        let sources = ArrayToObject(getSources(ArrayById(state.nodesData)));
        let {linkedNodes, linkedEdges} = breadthTraverse(sources, state, globalState);
        state = { ...state, nodesData: linkedNodes, edgesData: linkedEdges };
    }

    /* update the display */
    state = { ...state, nodesData: applyDisplayFunctions(state, globalState)};

    return state;
}

function breadthTraverse(current: NodesData, g, s, _linkedSources = []) {

    /* apply step function to nodes */

    let steppedSources = _.map(current, (nodeData) => {
        return { ...nodeData, ...applyStepFunction(nodeData) };
    })

    let nestedTargets: Array<Array<NodeData>> = _.map(current,(nodeData, i) => { 
        return getOutNodes(nodeData, g);
    });

    /* apply graph step function */


    /* apply link function forward for a single level */
    let { linkedTargets, linkedSources, linkedEdges } = linkSources(steppedSources, nestedTargets, _linkedSources, g);

    if (_.size(linkedTargets) === 0) {
        return {linkedNodes: linkedSources, linkedEdges: linkedEdges };

    } else {
        /* return the next level, previously linked targets become sources */
        let subLevelsResults = breadthTraverse(linkedTargets, g, s, {..._linkedSources, ...linkedSources});

        return {...{linkedNodes: {...linkedSources, ...subLevelsResults.linkedNodes},
                ...{linkedEdges: {...linkedEdges, ...subLevelsResults.linkedEdges} } } };

    }

}

declare interface LinkedSources {
    linkedTargets: NodesData
    linkedSources: NodesData
    linkedEdges: EdgesData
}

function linkSources(steppedSources: Array<NodeData>, nestedTargets, sourcesAlreadyLinked, g): LinkedSources {

    return steppedSources.reduce(function (acc, sourceData, i) {
        let outNodes: Array<NodeData> = nestedTargets[i]; 

        /* retrieve already reduced outNodes */
        outNodes = outNodes.map(outNode => acc.linkedTargets[outNode.id]? acc.linkedTargets[outNode.id] : outNode);

        if (outNodes.length === 0 || sourcesAlreadyLinked[sourceData.id]) {
            return {
                linkedTargets: { ...acc.linkedTargets, ...ArrayToObject(outNodes) },
                linkedSources: { ...acc.linkedSources, [sourceData.id]: sourceData },
                linkedEdges: {...acc.linkedEdges}
            };
        }
        else {
            /* apply link when outNodes and not already stepped sources  */
            let { linkedTargets, linkedSource, linkedEdges } = linkSource(sourceData, outNodes, g);
            return {
                linkedTargets: { ...acc.linkedTargets, ...linkedTargets },
                linkedSources: { ...acc.linkedSources, ...linkedSource },
                linkedEdges: {...acc.linkedEdges, ...linkedEdges}
            };
        }
    }, { linkedTargets: {}, linkedSources: {}, linkedEdges: {} });
}

declare interface LinkedSource {
    linkedTargets: NodesData,
    linkedSource: NodesData
    linkedEdges: EdgeData
}

/* link from a single source to it's multiple targets */

function linkSource(_source: NodeData, targets: Array<NodeData>, g: Graph) {

    return targets.reduce((acc: any, target, i) => {

        /* retrieve already reduced source */
        let source = acc.linkedSource[_source.id];

        let edge: EdgeData = getEdge(source, target, g);
        
        if(edge.active) {
            let { linkedSource, linkedTarget } = linkTarget(g, source, target, edge);
            return {
                linkedTargets: { ...acc.linkedTargets, [linkedTarget.id]: linkedTarget},
                linkedSource: { [linkedSource.id]: linkedSource },
                linkedEdges: {...acc.linkedEdges, [edge.id]: edge}
            }
        } else {
            return {...acc, linkedEdges: {...acc.linkedEdges, [edge.id]: edge}};
        }
        
    }, { linkedTargets: ArrayToObject(targets), linkedSource: { [_source.id]: _source }, linkedEdges: {}} )

}

declare interface LinkPair {
    linkedSource: NodeData,
    linkedTarget: NodeData
}
function linkTarget(g, source: NodeData, target: NodeData, edge): LinkPair {

    return edge.linkFunctions.reduce((acc, functionSettings) => {
        let fn = linkFunctions[functionSettings.name];

        let linkPair = fn(acc.linkedSource, target, ...functionSettings.arguments);
        return {
            linkedSource: linkPair.source,
            linkedTarget: linkPair.target
        };

    }, { linkedSource: source, linkedTarget: target });
}

function activeEdge (g, edgeData: EdgeData) {
    if(!edgeData.conditions) {
        return true;
    } else {
        return edgeData.conditions.reduce((acc, condition: Condition ) =>{
            if(acc === true) return acc;
            if(condition.type === 'sufficient' && linkFunctions.canActivate(g, edgeData, condition.expression)) return true;
            return acc;
        },false);
    }
}

function applyStepFunction(nodeData) {
    let update = nodeData.stepFunctions.reduce((acc, functionSettings) => {
        let fn = stepFunctions[functionSettings.name];
        let newSlice = fn(nodeData, ...functionSettings.arguments);
        let updated = { ...acc, ...newSlice };
        return updated;
    }, { ...nodeData });

    return update;
}

function applyDisplayFunctions(g, globalState): NodesData {

    let nodesArr: Array<NodeData> = ArrayById(g.nodesData);
    let displayFns = g.data.displayFunctions.nodes;

    /* reduce the nodesArray */
    let updatedNodesArr = nodesArr.reduce((acc, nodeData) => {

        let appliedNodeData = displayFns.reduce((acc, fn) => {
            let newDisplayData = displayFunctions[fn.name](g, nodeData.id, ...fn.arguments);
            return { ...acc, displayData: { ...acc.displayData, ...newDisplayData } };
        }, nodeData);

        return acc.concat(appliedNodeData);

    }, []);

    /* convert back to object type */
    return ArrayToObject(updatedNodesArr);
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