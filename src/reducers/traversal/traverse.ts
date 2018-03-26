import { ArrayById, ArrayToObject} from '../utilities/utilities';
import { _ } from 'underscore';
import { linkFunctions } from './linkFunctions';
import { applyStepFunction } from './applyStepFunction';

/* TRAVERSAL */

function traverseGraph(s: Graph) {
    let state = { ...s}

    let sources = getSources(state.nodesData);
    let {linkedNodes, linkedEdges} = breadthTraverse(state, sources);

    let nodesData = Object.assign({},state.nodesData, linkedNodes);
    let edgesData = Object.assign({},state.edgesData, linkedEdges);
    let graph = Object.assign({}, state, {nodesData: nodesData, edgesData: edgesData});
    // let s2= Object.assign({}, state, {graph: graph});

    /* update the display */
    //state = { ...state, nodesData: applyDisplayFunctions(state)};

    return graph;
}

function breadthTraverse(state: Graph, current, _linkedSources = []) {

    /* apply step function to nodes */

    // g = iterateLevel(g);

    let steppedSources = _.map(current, (nodeData) => {
        return { ...nodeData, ...applyStepFunction(state, nodeData) };
    })

    let nestedTargets: Array<Array<NodeData>> = _.map(current,(nodeData, i) => { 
        return getOutNodes(nodeData, state);
    });

    /* apply graph step function */


    /* apply link function forward for a single level */
    let currentLevelResults = linkSources(state, steppedSources, nestedTargets, _linkedSources);

    if (_.size(currentLevelResults.linkedTargets) === 0) {
        return {linkedNodes: currentLevelResults.linkedSources, linkedEdges: currentLevelResults.linkedEdges };

    } else {
        /* return the next level, previously linked targets become sources */
        let subLevelsResults = breadthTraverse(state, currentLevelResults.linkedTargets, {..._linkedSources, ...currentLevelResults.linkedSources});

        return {...{linkedNodes: {...currentLevelResults.linkedSources, ...subLevelsResults.linkedNodes},
                ...{linkedEdges: {...currentLevelResults.linkedEdges, ...subLevelsResults.linkedEdges} } } };

    }

}

declare interface LinkedSources {
    linkedTargets: NodesData
    linkedSources: NodesData
    linkedEdges: EdgesData
}

function linkSources(state:Graph, steppedSources: Array<NodeData>, nestedTargets, sourcesAlreadyLinked): LinkedSources {

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
            let { linkedTargets, linkedSource, linkedEdges } = linkSource(state, sourceData, outNodes);
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

function linkSource(state:Graph, _source: NodeData, targets: Array<NodeData>) {

    return targets.reduce((acc: any, target, i) => {

        /* retrieve already reduced source */
        let source = acc.linkedSource[_source.id];

        let edge: EdgeData = getEdge(state, source, target);
        
        if(edge.active && target.active) {
            let { linkedSource, linkedTarget } = linkTarget(state, source, target, edge);
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

/* apply link function from source node to target node
return both updated */

function linkTarget(state:Graph, source: NodeData, target: NodeData, edge): LinkPair {

    return edge.linkFunctions.reduce((acc, linkFunctionId) => {
        let functionConfig: any = state.functions[linkFunctionId];
        let fn = linkFunctions[functionConfig.name].fn;

        let linkPair = fn({
            graph: state,
            target: target,
            source: source,
            config: functionConfig
        });
        return {
            linkedSource: linkPair.source,
            linkedTarget: linkPair.target
        };

    }, { linkedSource: source, linkedTarget: target });
}

/* helper functions */

function getSources(g) {
    return _.filter(g, n => n.type === 'source');
}

function getOutNodes(nodeData, g: Graph) {
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

function getEdge(state: Graph, source, target) {
    return state.nodes[source.id].outEdges.map(edge => state.edges[edge])
        .filter(g => g.target === target.id)
        .map(edgeDescription => state.edgesData[edgeDescription.id])
        .pop();
}

export { traverseGraph };