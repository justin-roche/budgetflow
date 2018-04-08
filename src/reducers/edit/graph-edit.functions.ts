import { linkFunctions } from 'reducers/traversal/linkFunctions';
import { _ } from 'underscore';
import { extend, ArrayToObject, ArrayById } from '../utilities/utilities';

/* NODE */

function deleteNode(_g, nd) {
    let g = JSON.parse(JSON.stringify(_g));
    let nid = nd.id;

    let [retainedNodes, excludedNodes] = _.partition(g.nodes, nd => nd.id !== nid);
    let [retainedNodesData, exludedNodesData] = _.partition(g.nodesData, nd => nd.id !== nid);
    let [retainedEdges, exludedEdges] = _.partition(g.edges, ed => (ed.source !== nid && ed.target !== nid));
    let [retainedEdgesData, exludedEdgesData] = _.partition(g.edges, edata => retainedEdges.some(ed => ed.id === edata.id));

    let updatedNodesArray = removeEdgeAssociations(retainedNodes, exludedEdges);

   
    g.nodes = ArrayToObject(updatedNodesArray);
    g.nodesData = ArrayToObject(retainedNodesData);

    g.edges = ArrayToObject(retainedEdges);
    g.edgesData = ArrayToObject(retainedEdgesData);
    reindexNodes(g);

    return g;
}

function reindexNodes(g) {
    let priors = ArrayById(g.nodes).map((node, i) => node.id); // 'n2'
    let updates = ArrayById(g.nodes).map((node, i) => 'n'+i);  // 'n1'
    
    ArrayById(g.edges).forEach(e => {
        e.outNodes = e.OutNodes.map(id => {
            let updateIndex = priors.indexOf(id);
            return updates[updateIndex];
        })
        e.inNodes = e.inNodes.map(id => {
            let updateIndex = priors.indexOf(id);
            return updates[updateIndex];
        })
    });
    Object.keys(g.nodesData).forEach((key,i) => {
        let x = g.nodesData[key];
        x.id = 'n'+i;
        delete g.nodesData[key];
        g.nodesData['n'+i] = x;
    })
    Object.keys(g.nodes).forEach((key,i) => {
        let x = g.nodes[key];
        x.id = 'n'+i;
        delete g.nodes[key];
        g.nodes['n'+i] = x;
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
    nodes = removeEdgeAssociations(nodes, [removedEdges])
    nodes = ArrayToObject(nodes);

    return { ...g, edgesData: edgesData, edges: edges, nodes: nodes};
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
        groupId: 0,
        name: null,
        source: false,
        displayFunctions: [],
        nodeFunctions: [],
        displayData: {},
        value: 0,
    }
}

function getNewNodeFunctionId(g) {
    let l = _.size(g.nodeFunctions) - 1;
    return 'f' + l;
}

function extendNodeData(baseNodeData, newNodeData) {
    return 
}

// function updateNodeFunctions(_g: Graph, nodeFunctions) {
//     let nfs = JSON.parse(JSON.stringify(nodeFunctions))
//     let g = JSON.parse(JSON.stringify(_g));
//     nfs.forEach((nf) => {
//         g.nodeFunctions[nf.id] = nf;
//     });
//     return g;
// }

function updateNodeData(_g: Graph, _nd) {
    let g = JSON.parse(JSON.stringify(_g));
    let _new = JSON.parse(JSON.stringify(_nd));
    let id = _new.id;

    let old = _g.nodesData[id];

    g.nodesData[id] = _new;
    return g;

}

// function addNodeFunctionsToGraphNodeFunctions(g, nodeData) {
//         nodeData.type.nodeFunctions.forEach((fn, i) => {
//             let id = getNewNodeFunctionId(g);
//             fn.id = id;
//             nodeData.nodeFunctions[i] = id;
//         });
// }

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
    addEdgesData(g, edge, data);
    addLinkFunctionsByType(g, edge, data, source, target);

    return g;
}

function addLinkFunctionsByType(g, edge, edgeData, sourceId, targetId) {
    let source = g.nodesData[sourceId];
    if(source.type && source.type.direction === 'source') {
        source.type.linkFunctions.forEach((fn, i) => {
            edgeData.linkFunctions = [];
            edgeData.linkFunctions.push(fn);
        });
    }

    let target = g.nodesData[targetId];
    if(target.type && target.type.direction === 'target') {
        target.type.linkFunctions.forEach((fn, i) => {
            edgeData.linkFunctions = [];
            edgeData.linkFunctions.push(fn);
        });
    }
    
}

function getNewNodeId(g) {
    return String(g.nodes.length);
}

function getNewEdgeId(g) {
    return String(g.edges.length);
}

function getNewLinkFunctionId(g) {
    let l = _.size(g.linkFunctions) - 1;
    return 'f' + l;
}

function updateEdgeReferences(g, e, ed) {
    g.edges[e.id] = e;
    g.nodes[e.source].outEdges.push(e.id);
    g.nodes[e.target].inEdges.push(e.id);
}

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