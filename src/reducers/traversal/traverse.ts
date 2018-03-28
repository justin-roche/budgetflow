import { ArrayById, ArrayToObject } from '../utilities/utilities';
import { _ } from 'underscore';
import { linkFunctions } from './linkFunctions';
import { applyStepFunction } from './applyStepFunction';

/* TRAVERSAL */

function traverseGraph(s: Graph) {
    let state = JSON.parse(JSON.stringify(s));
    breadthTraverse(state);
    return state;
}

function breadthTraverse(state: Graph) {

    // g = iterateLevel(g);
    let q = getSources(state.nodesData);

    while (q.length > 0) {
        let source = q.shift();
        applyStepFunction(state, source);
        let forwardNodes = getOutNodes(source, state);
        forwardNodes.forEach(target => {
            reduceTarget(state, source, target);
            q.push(target);
        });
    }
}

/* apply link function from source node to target node  */

function reduceTarget(state: Graph, source: NodeData, target: NodeData) {
    let edge: EdgeData = getEdge(state, source, target);
    if (edge.active && target.active) {
        edge.linkFunctions.forEach(fnId => {
            let [fn, functionConfig] = getLinkFunction(state, fnId)
            fn({
                graph: state,
                target: target,
                source: source,
                config: functionConfig
            });
        })
    }
}

function getLinkFunction(state, id) {
    let functionConfig: any = state.functions[id];
    if (!functionConfig) {
        throw new Error('link function undefined: ' + id + ' for node ');
    }
    let fn = linkFunctions[functionConfig.name].fn;
    return [fn, functionConfig];
}

/* helper functions */

function getSources(g) {
    return _.filter(g, n => n.type === 'source');
}

/* add cache removed on certain graph changes */
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

/* add cache removed on certain graph changes */
function getEdge(state: Graph, source, target) {
    return state.nodes[source.id].outEdges.map(edge => state.edges[edge])
        .filter(g => g.target === target.id)
        .map(edgeDescription => state.edgesData[edgeDescription.id])
        .pop();
}

export { traverseGraph };