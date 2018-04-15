import { _ } from 'underscore';
import { extend, ArrayToObject, ArrayById } from '../utilities/utilities';
import { removeEdgeAssociations } from './edge-edit.functions';

/* NODE */

function deleteNode(_g, nd) {
    let g = JSON.parse(JSON.stringify(_g));
    let nid = nd.id;
    debugger;
    let [retainedNodesData, exludedNodesData] = _.partition(g.nodesData, nd => nd.id !== nid);
    let [retainedEdgesData, exludedEdgesData] = _.partition(g.edges, edata => retainedEdges.some(ed => ed.id === edata.id));

    g.nodesData = retainedNodesData;
    g.edgesData = retainedEdgesData;

    // reindexNodes(g);
    console.log('reindexed nodes', g.nodesData)
    return g;
}

function reindexNodes(g) {
    let priors = g.nodesData.map((node, i) => node.id); // 'n2'
    let updates = g.nodesData.map((node, i) => 'n'+i);  // 'n1'
    
    /* assign updated ids */
    g.nodesData.forEach((nd,i) => {
        nd.id = 'n'+i;
    });
    
}


function addNewNode(_g, arg) {
    let g = JSON.parse(JSON.stringify(_g));
    let appliedNodeData = JSON.parse(JSON.stringify(arg.nodeData || {}));
    let d3Data = JSON.parse(JSON.stringify(arg.node || {}));

    let id = getNewNodeId(g);

    let newNodeData = createBaseNodeData(g, id);
    newNodeData.d3 = d3Data;

    newNodeData = Object.assign({}, newNodeData);
    
    g.nodesData.push(newNodeData);
    console.log('node data added', g.nodesData)
    return g;
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
        d3: createBaseNode(g, id)
    }
}

function createBaseNode(g, id) {
    let node: any = {};
    return node;
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
    return new Date().getTime();
}






export { addNewNode,updateNodeData, deleteNode }