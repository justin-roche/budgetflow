import { SimulationFunctions } from '../simulator/simulationFunctions';

function graphReducer(state = null, action) {
    switch (action.type) {
        case 'GRAPH_SET': {
            return action.payload;
        }
        case 'NODES_SET': {
            return { ...state, nodes: action.payload };
        }
        case 'ADD_NODE': {
            return { ...state, ...addNewNode(state, action.payload) };
        }
        case 'DELETE_NODE': {
            return { ...state, ...deleteNode(state, action.payload) }
        }
        case 'ADD_EDGE': {
            let index = Object.keys(state.edges).length;
            let id = 'e' + index;
            let newEdgeComposite = addNewEdge(state, action.payload, id);
            let newNodesObj = updateOutNodes(state.nodes, action.payload, id)
            return { ...state, ...newEdgeComposite, nodes: newNodesObj };
        }
        case 'BREADTH_TRAVERSE': {
            let _state = traverseCycles(state, action.payload);
            return { ...state, ..._state };
        }
        case 'UPDATE_DISPLAY_FUNCTIONS': {
            return { ...state, nodes: applyDisplayFunctions(state) }
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

    return { ...g, nodes: nodes, nodesData: nodesData, edges: edges, edgesData: edgesData };

}

function addNewNode(g, nd) {
    let index = Object.keys(g.nodes).length;
    let id = 'n' + index;
    let nodeDescription = { ...nd, ...{ id: id, outEdges: [], inEdges: [] } };
    let nodeData = { id: id, type: 'sink', displayFunctions: [], stepFunctions: [], value: 0 }
    return {
        ...g,
        nodes: { ...g.nodes, [id]: nodeDescription },
        nodesData: { ...g.nodesData, [id]: nodeData }
    }
}

function addNewEdge(g, ed, id) {
    let previouslyConnected = ArrayById(g.edges).some(edge => {
        let _s = edge.source;
        let _t = edge.target;
        if (_s === ed.target && _t === ed.source || _t === ed.source && _s === ed.target || _t === ed.target && _s === ed.source) {
            return true;
        }
    });
    if (previouslyConnected) {
        return g;
    }

    let edgeDescription = { ...ed, ...{ id: id } };
    let edgeData = { id: id, type: 'sink', linkFunctions: [] }
    return {
        ...g,
        edges: { ...g.edges, [id]: edgeDescription },
        edgesData: { ...g.edgesData, [id]: edgeData }
    }
}

function updateOutNodes(nodes, ed, id) {
    let outEdges = nodes[ed.source].outEdges.concat([id])
    let inEdges = nodes[ed.target].inEdges.concat([id])
    let targetNode = { ...nodes[ed.target], inEdges: inEdges };
    let sourceNode = { ...nodes[ed.source], outEdges: outEdges };
    return { ...nodes, [ed.target]: targetNode, [ed.source]: sourceNode };
}

function traverseCycles(_state, payload: any = {}) {
    let cycleCount = payload.cycles || 1;
    let state = { ..._state }

    for (let c = 0; c < cycleCount; c++) {
        let sources = getSources(ArrayById(state.nodesData));
        let newNodesDataArray = breadthTraverse(sources, state);
        let newNodesDataObject = newNodesDataArray.reduce((acc, item) => {
            return { ...acc, [item.id]: item };
        }, {});
        state = { ...state, nodesData: newNodesDataObject };
    }

    state = { ...state, nodesData: applyDisplayFunctions(state) };

    return state;
}

function breadthTraverse(current: Array<NodeData>, g, _linkedSources = []) {

    /* apply step function to nodes */
    
    let steppedSources = current.map((nodeData, i) => {
        return { ...nodeData, ...applyStepFunction(nodeData) };
    })

    let nestedTargets: Array<Array<NodeData>> = current.map(nodeData => { // n
        return getOutNodes(nodeData, g);
    });

    /* apply graph step function */


    /* apply link function forward for a single level */
    let {linkedTargets, linkedSources} = linkSources(steppedSources, nestedTargets, _linkedSources, g);

    if (Object.keys(linkedTargets).length === 0) {
        return ArrayById(linkedSources);
    } else {
        return ArrayById(linkedSources).concat(breadthTraverse(ArrayById(linkedTargets), g, _linkedSources.concat(ArrayById(linkedSources))));      // n
    }

}

function linkSources(steppedSources: Array<NodeData>, allTargets: Array<Array<NodeData>>, sourcesAlreadyLinked, g) {
    
    return steppedSources.reduce(function (acc, sourceData, i) {
        let outNodes: Array<NodeData> = allTargets[i];
        
        if (outNodes.length === 0 || sourcesAlreadyLinked.some(n => n.id === sourceData.id)) {
            return {
                linkedTargets: acc.linkedTargets,
                linkedSources: {...acc.linkedSources, [sourceData.id]: sourceData}
            };
        }
        else {
            /* apply link function when outNodes and not already stepped source
                the single function is applied to multiple target nodes  */
            let { linkedTargets, linkedSource } = linkSource(sourceData, outNodes, g);
            return {
                linkedTargets: {...acc.linkedTargets, ...linkedTargets},
                linkedSources: {...acc.linkedSources, ...linkedSource}
            };
        }
    }, { linkedTargets: {}, linkedSources: {} });
}

declare interface LinkedSource {
    linkedTargets: NodesData,
    linkedSource: NodesData
}

function linkSource(_source: NodeData, targets: Array<NodeData>, g: Graph) {

    return targets.reduce((acc: any, target, i) => {

        /* extract from NodesData type of acc to NodeData type */
        let source = acc.linkedSource[_source.id];
        //let target = _target[targets[i].id];
        
        let edge: EdgeData = getEdge(source, target, g);
        let {linkedSource, linkedTarget} = linkTarget(source, target, edge);

        return {linkedTargets: {...acc.linkedTargets, 
                                [linkedTarget.id]: linkedTarget},
                linkedSource: {[linkedSource.id]: linkedSource}}
    
    }, {linkedTargets: ArrayToObject(targets), linkedSource: {[_source.id]: _source} })
    
}

declare interface LinkPair {
    linkedSource: NodeData,
    linkedTarget: NodeData
}
function linkTarget (source: NodeData, target: NodeData, edge) : LinkPair {

    return edge.linkFunctions.reduce((acc, functionSettings) => {
            let fn = SimulationFunctions.linkFunctions[functionSettings.name];
    
            /* application */
            let singleResult;
            if (target.active) {
                /* apply if node is active */
                singleResult = fn(acc.linkedSource, target, ...functionSettings.arguments);
                return {
                    linkedSource: singleResult.source,
                    linkedTarget: singleResult.target
                };
            } else {
                return {
                    linkedSource: source,
                    linkedTarget: target
                }
            }
    
        }, { linkedSource: source, linkedTarget: target });
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

function applyDisplayFunctions(g) {
    let nodesArr = ArrayById(g.nodesData);

    /* apply for graph */
    let displayFns = g.data.displayFunctions.nodes;

    let update = displayFns.reduce((nodesArr, functionSettings) => {
        /* for each display function */
        let fn = SimulationFunctions.displayFunctions[functionSettings.name];

        /* reduce the nodesArray */
        let updatedNodesArr = nodesArr.reduce((acc, node) => {
            let nodeData = g.nodesData[node.id]
            let newDisplayData = fn(node, nodeData, ...functionSettings.arguments);
            return acc.concat([{ ...node, displayData: { ...newDisplayData } }]);
        }, []);

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
        return { ...acc, [n.id]: n };
    }, {});
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

export { graphReducer }

 /* pre-link functions */

    // let preLinkResult = edge.preLinkFunctions.reduce((acc, functionSettings) => {
    //     let fn = SimulationFunctions.preLinkFunctions[functionSettings.name];

    //     let singleResult = fn(acc.source, target, ...functionSettings.arguments);

    //     return {
    //         source: singleResult.source,
    //         target: singleResult.target
    //     };
    // }, { source: { ...source }, target: { ...target } });

    /* apply to value functions */