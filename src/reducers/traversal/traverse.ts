import { ArrayById, ArrayToObject } from '../utilities/utilities';
import { _ } from 'underscore';
import { applyNodeFunction } from '../functions/applyNodeFunction';
import { applyLinkFunction } from '../functions/applyLinkFunction';

/* TRAVERSAL */

function traverseGraph(s: Graph) {
    let state = JSON.parse(JSON.stringify(s));
    breadthTraverse(state);
    return state;
}

function breadthTraverse(state: Graph) {
    let gId = 0;
    if (!state.nodeGroups) {
        breadthTraverseGroup(state, undefined);
    }
    else {
        while (gId < state.nodeGroups.length) {
            breadthTraverseGroup(state, gId)
            gId++
        }
    }
}

function breadthTraverseGroup(state, groupId) {
    let q = getSources(state.nodesData, groupId);

    while (q.length > 0) {
        let source = q.shift();
        applyNodeFunctions(state, source);
        let forwardNodes = getOutNodes(source, state);
        forwardNodes.forEach(target => {
            reduceTarget(state, source, target);
            if (target.groupId == groupId) q.push(target);
        });
    }
}

function applyNodeFunctions(graph, source) {
    source.nodeFunctions.forEach(config => {
        applyNodeFunction({ config, graph, source });
    });
}
/* apply link function from source node to target node  */

function reduceTarget(graph: Graph, source: NodeData, target: NodeData) {
    let edge: EdgeData = getEdge(graph, source, target);
    if (edge.active === false) return;
    if (target.active === false) return;

    edge.linkFunctions
        .forEach(config => {
            applyLinkFunction({
                graph,
                target,
                source,
                config
            });
        })
}

function getLinkFunction(state, id) {
    let config: any = state.linkFunctions[id];
    if (!config) {
        throw new Error('link function undefined: ' + id + ' for node ');
    }
    return config;
}

/* helper functions */

function getSources(g, groupId) {
    return _.filter(g, n => n.source && n.groupId === groupId);
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

function getEdge(state: Graph, source, target) {
    return state.edgesData[source.id][target.id];
}

export { traverseGraph };