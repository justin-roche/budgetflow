import { _ } from 'underscore';
import { extend, ArrayToObject, ArrayById } from '../utilities/utilities';

/* EDGE */

function addEdge(g, source, target) {
    if (shareEdge(g, source, target)) return g;

    let graph = JSON.parse(JSON.stringify(g));

    let id = source + '-' + target

    let edge = {
        source: source,
        target: target,
        id: id
    };

    let data: EdgeData = {
        id: id,
        active: true,
        linkFunctions: []
    };

    updateEdgeReferences(g, edge, data);
    addEdgesData(g, edge, data);
    addLinkFunctionsByType(g, edge, data, source, target);
    console.log('edge added', 'edge', edge, 'data', data, 'source', source, 'graph', g)
    return g;
}

function addLinkFunctionsByType(g, edge, edgeData, sourceId, targetId) {
    let source = g.nodesData[sourceId];
    if(source.type && source.type.direction === 'source') {
        source.type.linkFunctions.forEach((fn, i) => {
            edgeData.linkFunctions = [];
            edgeData.linkFunctions.push(fn);
            console.log('adding edge linkfunction from source', fn);
            addEdgeDisplayDataByType(edge, source);
        });
    }

    let target = g.nodesData[targetId];
    if(target.type && target.type.direction === 'target') {
        target.type.linkFunctions.forEach((fn, i) => {
            edgeData.linkFunctions = [];
            edgeData.linkFunctions.push(fn);
            console.log('adding edge linkfunction from target', fn)
            addEdgeDisplayDataByType(edge, target);
        });
    }
    
}

function addEdgeDisplayDataByType(edge, node) {
    if(node.type.edge) {
        for(let prop in node.type.edge) {
            console.log('adding edge property', prop, node.type.edge[prop])
            edge[prop] = node.type.edge[prop];
        }
    }
}

function getNewEdgeId(g) {
    return String(g.edges.length);
}

function getNewLinkFunctionId(g) {
    let l = _.size(g.linkFunctions) - 1;
    return 'f' + l;
}

// function updateEdgeReferences(g, e, ed) {
//     g.edges.push(e);
//     g.nodes[e.source].outEdges.push(e.id);
//     g.nodes[e.target].inEdges.push(e.id);
// }

function addEdgesData(g, e, ed) {
    g.edgesData[e.source] = g.edgesData[e.source] || [];
    g.edgesData[e.source][e.target] = ed;
}

function shareEdge(g, source, target) {
    return g.edges.some(test => {
        let ts = test.source;
        let tt = test.target;
        if (tt === source && ts === target || tt === target && ts === source) {
            return true;
        }
    });
}

function deleteEdge(g: Graph, eid) {
    let edgesData = { ...g.edgesData };
    let edges = { ...g.edges };
    debugger;
    let removedEdges = edgesData[eid];
    delete edges[eid];
    delete edgesData[eid];

    let nodes = _.toArray(g.nodes);
    // nodes = removeEdgeAssociations(nodes, [removedEdges])
    nodes = ArrayToObject(nodes);

    return { ...g, edgesData: edgesData, edges: edges, nodes: nodes};
}

// function removeEdgeAssociations(retainedNodes, removedEdges): Nodes {
//     let nodes = retainedNodes.map(node => {
//         node = { ...node }
//         node.inEdges = node.inEdges.filter(id => removedEdges.every(edge => edge.id !== id));
//         node.outEdges = node.outEdges.filter(id => removedEdges.every(edge => edge.id !== id));
//         return node;
//     });
//     return nodes;
// }


function updateEdgeData(_g: Graph, edgeData: EdgeData) {
   let g = JSON.parse(JSON.stringify(_g));
   let [x,y] = edgeData.id.split('-');
   g.edgesData[x][y] = edgeData;
   updateEdgeDisplayData(edgeData, g.edges.filter(e => e.id === edgeData.id)[0]);
   return g;
}

function updateEdgeDisplayData(ed, edge) {
    if(ed.linkFunctions.length === 0) {
        edge.stroke = 'diagonalHatch';
    }
}

function toggleEdgeActivation(g, eid) {
    return extend(g).select(`edgesData.${eid}`).data((obj: any) => {
        return { ...obj, ...{ active: !obj.active } };
    });
}

export { addEdge, updateEdgeData, toggleEdgeActivation, deleteEdge, removeEdgeAssociations }