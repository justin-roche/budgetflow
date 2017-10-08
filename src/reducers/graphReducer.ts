import {SimulationFunctions} from '../simulator/simulationFunctions';

function graphReducer(state = null, action) {
    switch (action.type) {
        case 'GRAPH_SET': {
            return action.payload;
        }
        case 'NODES_SET': {
            return { ...state, nodes: action.payload };
        }
        case 'ADD_NODE': {
            return { ...state, ...addNewNode(state, action.payload)};
        }
        case 'DELETE_NODE': {
            return {...state, ...deleteNode(state, action.payload)}
        }
        case 'ADD_EDGE': {
            let index = Object.keys(state.edges).length;
            let id = 'e'+index; 
            let newEdgeComposite = addNewEdge(state, action.payload, id);
            let newNodesObj = updateOutNodes(state.nodes,action.payload, id)
            return { ...state, ...newEdgeComposite, nodes: newNodesObj};
        }
        case 'BREADTH_TRAVERSE': {
            let _state = traverseCycles(state, action.payload);
            return { ...state, ..._state };
        }
        case 'UPDATE_DISPLAY_FUNCTIONS': {
            return {...state, nodes: applyDisplayFunctions(state)}
        }
        default:
            return state;
    }

}

/* addition and deletion */

function deleteNode(g, nid) {
    let nodes = ArrayToObject(ArrayById(g.nodes).filter(nd => nd.id !== nid.id));
    let nodesData = ArrayToObject(ArrayById(g.nodesData).filter(nd => nd.id !== nid.id));

    let edgesArray = ArrayById(g.edges).filter(ed => (ed.source !== nid.id && ed.target !== nid.id));
    let edgesData = ArrayToObject(ArrayById(g.edges).filter(edata => {
        return edgesArray.some(ed => ed.id === edata.id)
    }));
    let edges = ArrayToObject(edgesArray);

    return {...g, nodes: nodes, nodesData: nodesData, edges: edges, edgesData: edgesData};
    
}

function addNewNode(g, nd) {
    let index = Object.keys(g.nodes).length;
    let id = 'n'+index; 
    let nodeDescription = {...nd, ...{id: id, outEdges:[], inEdges: []}};
    let nodeData = {id: id, type: 'sink', displayFunctions: [], stepFunctions: [], value: 0}
    return {...g, 
            nodes: {...g.nodes, [id]: nodeDescription},
            nodesData: {...g.nodesData, [id]: nodeData}}
}

function addNewEdge(g, ed, id) {
    let previouslyConnected = ArrayById(g.edges).some(edge => {
        let _s = edge.source;
        let _t = edge.target; 
        if(_s === ed.target && _t === ed.source || _t === ed.source && _s === ed.target || _t === ed.target && _s === ed.source){
            return true;
        }
    });
    if(previouslyConnected){
        return g;
    }

    let edgeDescription = {...ed, ...{id: id}};
    let edgeData = {id: id, type: 'sink', linkFunctions: []}
    return {...g, 
            edges: {...g.edges, [id]: edgeDescription},
            edgesData: {...g.edgesData, [id]: edgeData}}
}

function updateOutNodes(nodes, ed, id) {
    let outEdges = nodes[ed.source].outEdges.concat([id])
    let inEdges = nodes[ed.target].inEdges.concat([id])
    let targetNode = {...nodes[ed.target], inEdges: inEdges};
    let sourceNode = {...nodes[ed.source], outEdges: outEdges};
    return {...nodes, [ed.target]: targetNode, [ed.source]: sourceNode };
}

function traverseCycles(_state, payload: any = {}) {
    let cycleCount = payload.cycles || 1; 
    let state = {..._state}

    for(let c = 0; c < cycleCount; c++) {
        let sources = getSources(ArrayById(state.nodesData));
        let newNodesDataArray = breadthTraverse(sources, { step: applyStepFunction, link: applyLinkFunctions }, state);
        let newNodesDataObject = newNodesDataArray.reduce((acc, item) => {
            return { ...acc, [item.id]: item };
        }, {});
        state = { ...state, nodesData: newNodesDataObject };
    }

    state = {...state, nodesData: applyDisplayFunctions(state)};
    
    return state;
}

function breadthTraverse(current: Array<NodeData>, fns, g, _linkedSources = []) {

    /* apply step function to nodes */

    let steppedSources = current.map((nodeData, i) => {
        return { ...nodeData, ...fns.step(nodeData, g)};
    })

    let nestedTargets = current.map(nodeData => { // n
        return getOutNodes(nodeData, g);
    });

    /* apply graph step function */
    

    /* apply link function forward */

    let linkedPairs = steppedSources.reduce(function (acc, sourceNodeData, i) {
            let outNodes = nestedTargets[i];
            if(outNodes.length === 0 || _linkedSources.some(n => n.id === sourceNodeData.id)) {
                return { linkedTargets: acc.linkedTargets,
                        linkedSources: acc.linkedSources.concat(sourceNodeData)};
            }
            else {
                /* apply link function when outNodes and not already stepped source
                    the single function is applied to multiple target nodes  */
                let [_linkedTargets, _linkedSource] = applyLinkFunctions(outNodes, sourceNodeData, g);
                return {linkedTargets: acc.linkedTargets.concat(_linkedTargets), 
                        linkedSources: acc.linkedSources.concat(_linkedSource)};
            } 
        }, {linkedTargets: [], linkedSources: []});

    let linkedTargets = linkedPairs.linkedTargets;
    let linkedSources = linkedPairs.linkedSources;

    if (linkedTargets.length === 0) {
        return linkedSources;
    } else {
        return linkedSources.concat(breadthTraverse(linkedTargets, fns, g, _linkedSources.concat(linkedSources)));      // n
    }

}

function applyStepFunction(nodeData) {
    let update = nodeData.stepFunctions.reduce((acc, functionSettings) => {
        let fn = SimulationFunctions.stepFunctions[functionSettings.name];
        let newSlice = fn(nodeData, ...functionSettings.arguments);
        let updated = { ...acc, ...newSlice };
        return updated;
    }, { ...nodeData });

    return update;
}

function applyLinkFunctions(targets: Array<NodeData>, source: NodeData, g: Graph, i = 0) {

    let edge: EdgeData = getEdge(source, targets[i], g);
    let target = targets[i];

    /* pre-link functions */

    let preLinkResult = edge.preLinkFunctions.reduce((acc, functionSettings) => {
        let fn = SimulationFunctions.preLinkFunctions[functionSettings.name];
        
        let singleResult = fn(acc.source, target, ...functionSettings.arguments);
        
        return { source: singleResult.source, 
                 target: singleResult.target };
    }, { source: { ...source }, target: { ...target } });


    /* apply to value functions */

    let Result = edge.linkFunctions.reduce((acc, functionSettings) => {
        let fn = SimulationFunctions.linkFunctions[functionSettings.name];

        /* application */
        let singleResult;
        if(target.active) {
            /* apply if node is active */
            singleResult = fn(acc.source, target, ...functionSettings.arguments);
            return { source: singleResult.source, 
                    target: singleResult.target };
        } else {
            return {source: source,
                    target: target}
        }
       
    }, { source: { ...preLinkResult.source }, target: { ...preLinkResult.target } });

    
    let linkedSource = Result.source;
    let linkedTarget = Result.target;

    if (i === targets.length - 1) {
        return [[linkedTarget], [linkedSource]];
    } else {
        let [returnedLinkedTargets, returnedLinkedSource] = applyLinkFunctions(targets, linkedSource, g, i + 1);
        return [[linkedTarget].concat(returnedLinkedTargets), returnedLinkedSource]      // n
    }
}

function applyDisplayFunctions(g) {
    let nodesArr = ArrayById(g.nodesData);

    /* apply for graph */
    let displayFns = g.data.displayFunctions.nodes;
    
    let update = displayFns.reduce((nodesArr,functionSettings) => {
        /* for each display function */
        let fn = SimulationFunctions.displayFunctions[functionSettings.name];
 
        /* reduce the nodesArray */
        let updatedNodesArr = nodesArr.reduce((acc, node) => {
            let nodeData = g.nodesData[node.id]
            let newDisplayData = fn(node, nodeData, ...functionSettings.arguments);
            return acc.concat([{...node, displayData: {...newDisplayData}}]);
        },[]);
        
        return updatedNodesArr;

    }, nodesArr);

    /* convert back to object type */
    return ArrayToObject(update);
}

/* helper functions */

function getSources(g) {
    return g.filter(n => n.type === 'source');
}

function ArrayById(o) {
    return Object.keys(o).map(k => o[k]);
}

function ArrayToObject(a) {
    return a.reduce((acc, n) => {
        return {...acc, [n.id]: n};
    },{});
}

function getOutNodes(nodeData, g) {
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

function getEdge(source, target, g) {
    return g.nodes[source.id].outEdges.map(edge => g.edges[edge])
        .filter(g => g.target === target.id)
        .map(edgeDescription => g.edgesData[edgeDescription.id])
        .pop();
}

export { graphReducer}