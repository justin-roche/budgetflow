import {ArrayToObject, ArrayById} from '../utilities';
import { _ } from 'underscore';

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

    return { ...g, 
            nodes: nodes, 
            nodesData: nodesData, 
            edges: edges, 
            edgesData: edgesData 
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

    return {...g, edgesData: edgesData, edges: edges, nodes: nodes};
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
    
    return {
        ...g,
        nodes: { ...g.nodes, [node.id]: node },
        nodesData: { ...g.nodesData, [node.id]: nodeData }
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

function shareEdge(g, {edge, data}) {
    return ArrayById(g.edges).some(test => {
        let ts = test.source;
        let tt = test.target;
        if (tt === edge.source && ts === edge.target || tt === edge.target && ts === edge.source) {
            return true;
        }
    });
}

function addNewEdge(g, o) {
    if(shareEdge(g, o)) return g;

    let edge = { ...o.edge, id: getNewEdgeId(g)};
    let data: EdgeData = {...{ id: edge.id, active: true, linkFunctions: [] }, ...o.data};

    return {
            ...g, 
            edges: { ...g.edges, [edge.id]: edge },
            edgesData: { ...g.edgesData, [edge.id]: data },
            nodes: {...g.nodes, ...updateOutNodes(g.nodes, edge)}
    };
}

function getNewNodeId(g) {
    return 'n' + Object.keys(g.nodes).length;
}

function getNewEdgeId(g) {
    return 'e' + Object.keys(g.edges).length;
}

function updateOutNodes(nodes, e: Edge) {
    let outEdges = nodes[e.source].outEdges.concat([e.id])
    let inEdges = nodes[e.target].inEdges.concat([e.id])
    let targetNode = { ...nodes[e.target], inEdges: inEdges };
    let sourceNode = { ...nodes[e.source], outEdges: outEdges };
    return { ...nodes, [e.target]: targetNode, [e.source]: sourceNode };
}

function addLinkFunction(g, edge: Edge, linkFunction: FunctionItem) : AppState {
    let id = edge.id;
    let currentEdgeData = g.edgesData[id];
    let currentLinkFunctions = currentEdgeData.linkFunctions;
    let updatedEdgeData = {...currentEdgeData, linkFunctions: currentLinkFunctions.concat(linkFunction)}
    return {...g, edgesData: {...g.edgesData, [id]: updatedEdgeData}};
}

/*untested*/
function updateEdge(g, edge: Edge, edgeData: EdgeData) {
    console.log('update data', edge, edgeData);
    let id = edge.id; 
    let currentEdge = g.edges[id];
    let currentEdgeData = g.edgesData[id];
    let updatedEdge = {...currentEdge, ...edge};
    let updatedEdgeData = {...currentEdgeData, ...edgeData};
    let updatedEdges = {...g.edges, id: updatedEdge};
    let updatedEdgesData = {...g.edgesData, id: updatedEdgeData};
    return {...g, edges: updatedEdges, edgesData: updatedEdgesData};
}

export { addNewNode, addNewEdge, updateEdge, deleteNode, deleteEdge, nodePropertySet, addLinkFunction }