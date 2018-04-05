import { linkFunctions } from 'reducers/traversal/linkFunctions';
import { _ } from 'underscore';
import { extend, ArrayToObject, ArrayById } from '../utilities/utilities';

/* NODE */

function deleteNode(g, nid) {
    let [retainedNodes, excludedNodes] = _.partition(g.nodes, nd => nd.id !== nid);
    let [retainedNodesData, exludedNodesData] = _.partition(g.nodesData, nd => nd.id !== nid);
    let [retainedEdges, exludedEdges] = _.partition(g.edges, ed => (ed.source !== nid && ed.target !== nid));
    let [retainedEdgesData, exludedEdgesData] = _.partition(g.edges, edata => retainedEdges.some(ed => ed.id === edata.id));

    let updatedNodesArray = removeEdgeAssociations(retainedNodes, exludedEdges);

    let nodes = ArrayToObject(updatedNodesArray);
    let nodesData = ArrayToObject(retainedNodesData);

    let edges = ArrayToObject(retainedEdges);
    let edgesData = ArrayToObject(retainedEdgesData);

    let nodesIds = g.nodesIds.filter(id => id !== nid);

    return {
        ...g,
        nodes: nodes,
        nodesData: nodesData,
        edges: edges,
        edgesData: edgesData,
        nodesIds: nodesIds,
    };
}

function deleteEdge(g: Graph, eid) {
    let edgesData = { ...g.edgesData };
    let edges = { ...g.edges };

    let removedEdges = edgesData[eid];
    delete edges[eid];
    delete edgesData[eid];

    let nodes = _.toArray(g.nodes);
    nodes = removeEdgeAssociations(nodes, [removedEdges])
    nodes = ArrayToObject(nodes);
    let edgesIds = g.edgesIds.filter(id => id !== eid);

    return { ...g, edgesData: edgesData, edges: edges, nodes: nodes, edgesIds: edgesIds };
}

function removeEdgeAssociations(retainedNodes, removedEdges): Nodes {
    let nodes = _.map(retainedNodes, node => {
        node = { ...node }
        node.inEdges = node.inEdges.filter(id => removedEdges.every(edge => edge.id !== id));
        node.outEdges = node.outEdges.filter(id => removedEdges.every(edge => edge.id !== id));
        return node;
    });
    return nodes;
}

function addNewNode(_g, arg) {
    let g = JSON.parse(JSON.stringify(_g));
    let appliedNodeData = JSON.parse(JSON.stringify(arg.nodeData || {}));
    let appliedNode = JSON.parse(JSON.stringify(arg.node || {}));

    let id = getNewNodeId(g);
    g.nodesIds = g.nodesIds.concat(id);

    let newNode = createBaseNode(g, id)
    let newNodeData = createBaseNodeData(g, id);

    newNode = Object.assign({}, newNode, appliedNode);
    newNodeData = Object.assign({}, newNodeData, appliedNodeData);
    
    g.nodes[id] = newNode;
    g.nodesData[id] = newNodeData;

    return g;
}

function createBaseNode(g, id) {
    let node: any = {};
    node.id = id;
    node.outEdges = [];
    node.inEdges = [];
    return node;
}

function createBaseNodeData(g, id): NodeData {
    return {
        active: true,
        id: id,
        name: null,
        source: false,
        displayFunctions: [],
        nodeFunctions: [],
        displayData: {},
        value: 0
    }
}

function getNewNodeFunctionId(g) {
    let l = _.size(g.nodeFunctions) - 1;
    return 'f' + l;
}

function extendNodeData(baseNodeData, newNodeData) {
    return 
}

function updateNodeFunctions(_g: Graph, nodeFunctions) {
    debugger;
    let nfs = JSON.parse(JSON.stringify(nodeFunctions))
    let g = JSON.parse(JSON.stringify(_g));
    nfs.forEach((nf) => {
        g.nodeFunctions[nf.id] = nf;
    });
    return g;
}

function updateNodeData(_g: Graph, _nd) {
    let g = JSON.parse(JSON.stringify(_g));
    let _new = JSON.parse(JSON.stringify(_nd));
    let id = _new.id;

    let old = _g.nodesData[id];
    if(_new.type) addNodeFunctionsToGraphNodeFunctions(g, _new);

    g.nodesData[id] = _new;
    return g;

}

function addNodeFunctionsToGraphNodeFunctions(g, nodeData) {
        nodeData.type.nodeFunctions.forEach((fn, i) => {
            let id = getNewNodeFunctionId(g);
            fn.id = id;
            g.nodeFunctions[id] = fn;
            nodeData.nodeFunctions[i] = id;
        });
}

/* EDGE */

function addEdge(g, source, target) {
    if (shareEdge(g, source, target)) return g;

    let graph = JSON.parse(JSON.stringify(g));

    let id = getNewEdgeId(graph);

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
    
    transferLinkFunctions(g, edge, data, source, target);

    return g;
}

function transferLinkFunctions(g, edge, edgeData, source, target) {
    let out = g.nodesData[source];
    if(out.type && out.type.direction === 'out') {
        out.type.linkFunctions.forEach((fn, i) => {
            let id = getNewLinkFunctionId(g);
            g.linkFunctions[id] = fn;
            edgeData.linkFunctions[i] = id;
        });
    }

    let _in = g.nodesData[target];
    if(_in.type && _in.type.direction === 'in') {
        _in.type.linkFunctions.forEach((fn, i) => {
            let id = getNewLinkFunctionId(g);
            g.linkFunctions[id] = fn;
            edgeData.linkFunctions[i] = id;
        });
    }
    
}

function getNewNodeId(g) {
    return 'n' + g.nodesIds.length;
}

function getNewEdgeId(g) {
    return 'e' + g.edgesIds.length;
}

function getNewLinkFunctionId(g) {
    return 'f' + g.linkFunctions.length;
}

function updateEdgeReferences(g, e, ed) {
    g.edges[e.id] = e;
    g.edgesData[e.id] = ed;
    g.edgesIds.push(e.id);
    g.nodes[e.source].outEdges.push(e.id);
    g.nodes[e.target].inEdges.push(e.id);
}

function shareEdge(g, source, target) {
    return g.edgesIds.some(test => {
        let ts = g.edges[test].source;
        let tt = g.edges[test].target;
        if (tt === source && ts === target || tt === target && ts === source) {
            return true;
        }
    });
}

function updateEdgeData(g: Graph, edgeData: EdgeData) {
    return extend(g).select(`edgesData.${edgeData.id}`).data((obj: any) => {
        return { ...obj, ...edgeData };
    });
}

function toggleEdgeActivation(g, eid) {
    return extend(g).select(`edgesData.${eid}`).data((obj: any) => {
        return { ...obj, ...{ active: !obj.active } };
    });
}

export { updateNodeFunctions, addNewNode, addEdge, updateEdgeData, updateNodeData, toggleEdgeActivation, deleteNode, deleteEdge }