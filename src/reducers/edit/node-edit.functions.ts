import { _ } from 'underscore';
import { extend, ArrayToObject, ArrayById } from '../utilities/utilities';
import { removeEdgeAssociations } from './edge-edit.functions';

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

function createBaseNodeData(g, id): any {
    return {
        active: true,
        id: id,
        groupIds: [0],
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

function getNewNodeId(g) {
    return String(g.nodesData.length);
}






export { addNewNode,updateNodeData, deleteNode }