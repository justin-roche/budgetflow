import {ArrayToObject, ArrayById} from '../utilities';
import { _ } from 'underscore';
import { extend } from '../utilities';

/* NODE */

function deleteNode(g, nid) {
    let [retainedNodes, excludedNodes] = _.partition(g.nodes, nd => nd.id !== nid);
    let [retainedNodesData, exludedNodesData] =  _.partition(g.nodesData, nd => nd.id !== nid);
    let [retainedEdges, exludedEdges] =  _.partition(g.edges, ed => (ed.source !== nid && ed.target !== nid));
    let [retainedEdgesData, exludedEdgesData] =  _.partition(g.edges, edata => retainedEdges.some(ed => ed.id === edata.id));

    let updatedNodesArray = removeEdgeAssociations(retainedNodes, exludedEdges);

   
    let nodes = ArrayToObject(updatedNodesArray);
    let nodesData = ArrayToObject(retainedNodesData);
    
    let edges = ArrayToObject(retainedEdges);
    let edgesData = ArrayToObject(retainedEdgesData);

    let nodesIds = g.nodesIds.filter(id => id !== nid);

    return { ...g, 
            nodes: nodes, 
            nodesData: nodesData, 
            edges: edges, 
            edgesData: edgesData,
            nodesIds: nodesIds,
        };
}

function deleteEdge(g: Graph, eid) {
    let edgesData = {...g.edgesData};
    let edges = {...g.edges};

    let removedEdges = edgesData[eid];
    delete edges[eid];
    delete edgesData[eid];

    let nodes = _.toArray(g.nodes);
    nodes = removeEdgeAssociations(nodes, [removedEdges] )
    nodes = ArrayToObject(nodes);
    let edgesIds = g.edgesIds.filter(id => id !== eid);

    return {...g, edgesData: edgesData, edges: edges, nodes: nodes, edgesIds: edgesIds};
}

function removeEdgeAssociations(retainedNodes, removedEdges) : Nodes {
    let nodes = _.map(retainedNodes, node => {
        node = {...node}
        node.inEdges = node.inEdges.filter(id => removedEdges.every(edge => edge.id !== id));
        node.outEdges = node.outEdges.filter(id => removedEdges.every(edge => edge.id !== id));
        return node; 
    });
    return nodes;
}

function addNewNode(g, nd) {
   
    let node: AppNode = { ...nd, 
                        ...{ id: getNewNodeId(g), outEdges: [], inEdges: [] } };
    
    let nodeData: NodeData = {...createBaseNodeData(), id: node.id};
    let nodesIds = g.nodesIds.concat(node.id);
    return {
        ...g,
        nodes: { ...g.nodes, [node.id]: node },
        nodesData: { ...g.nodesData, [node.id]: nodeData },
        nodesIds: nodesIds
    }
}

function createBaseNodeData() : NodeData {
    return {
        active: true,
        id: null,
        type: 'sink',
        displayFunctions: [],
        stepFunctions: [],
        displayData: {},
        value: 0
    }
}

function nodePropertySet(g, nodeData: NodeData): Graph {
    let nd = g.nodesData[nodeData.id];
    nd = { ...nd, ...nodeData };
    let nodesData = { ...g.nodesData, [nd.id]: nd };
    console.log('new nodes data', nodesData);
    return { ...g, nodesData: nodesData };
}

/* EDGE */

function addEdge(g, source, target) {
    if(shareEdge(g, source, target)) return g;

    let graph = {...g};
    
    let edge = {source: source, target: target, id: getNewEdgeId(graph)};
    let data: EdgeData = { id: edge.id, active: true, linkFunctions: [] };
    let nodes = updateEdgeReferences(g, edge);

    return {
            ...g, 
            edges: { ...g.edges, [edge.id]: edge },
            edgesData: { ...g.edgesData, [edge.id]: data },
            edgesIds: g.edgesIds.concat([edge.id]),
            nodes: {...g.nodes, ...nodes}
    };
}

function getNewNodeId(g) {
    return 'n' + g.nodesIds.length;
}

function getNewEdgeId(g) {
    return 'e' + g.edgesIds.length;
}

function updateEdgeReferences(g, e) {
    let sourceNode = extend(g.nodes[e.source]).select('outEdges').data(obj => {
        return obj.concat([e.id]);
    })
    let targetNode = extend(g.nodes[e.target]).select('inEdges').data(obj => {
        return obj.concat([e.id]);
    })
    return { ...g.nodes, [e.target]: targetNode, [e.source]: sourceNode };
}


function addLinkFunction(g, edge: Edge, linkFunction: FunctionItem) : AppState {
    let id = edge.id;
    let currentEdgeData = g.edgesData[id];
    let currentLinkFunctions = currentEdgeData.linkFunctions;
    let updatedEdgeData = {...currentEdgeData, linkFunctions: currentLinkFunctions.concat(linkFunction)}
    return {...g, edgesData: {...g.edgesData, [id]: updatedEdgeData}};
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
        return { ...obj, ...{active: !obj.active} };
    });
}

export { addNewNode, addEdge, updateEdgeData, toggleEdgeActivation, deleteNode, deleteEdge, nodePropertySet, addLinkFunction }