import { SimulationFunctions } from '../parser/simulationFunctions';

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
        case 'NODE_PROPERTY_SET': {
            return { ...state, ...nodePropertySet(state, action.payload.nodeData) }
        }
        case 'EDGE_UPDATE': {
            updateEdge(state, action.payload.edge, action.payload.edgeData);
            return { ...state };
        }
        case 'EDGE_ADD': {
            if (shareEdge(state, action.payload.description.source, action.payload.description.target)) {
                return state;
            } else {
                let {g, id} = addNewEdge(state, action.payload);
                let newNodesObj = updateOutNodes(state.nodes, action.payload, id)
                return { ...state, ...state, nodes: newNodesObj };
            }
        }
        case 'EDGE_LINK_FUNCTION_ADD': {
            return {...state, ...addLinkFunction(state, action.payload.edge, action.payload.function)}
        }
        case 'GRAPH_TRAVERSE_CYCLES': {
            return traverseCycles(state, action.payload);
            // return { ...state, ..._state };
        }
        case 'GRAPH_REVERSE_CYCLES': {
            // return reverseCycles(state, action.payload);
            // return { ...state, ..._state };
        }
        case 'DISPLAY_FUNCTIONS_APPLY': {
            return { ...state, nodesData: applyDisplayFunctions(state) }
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
    let nodeDescription: Node = { ...nd, ...{ id: id, outEdges: [], inEdges: [] } };
    let nodeData: NodeData = {
        active: true,
        id: id,
        type: 'sink',
        displayFunctions: [],
        stepFunctions: [],
        displayData: {},
        value: 0
    }
    return {
        ...g,
        nodes: { ...g.nodes, [id]: nodeDescription },
        nodesData: { ...g.nodesData, [id]: nodeData }
    }
}

function shareEdge(g, source, target) {
    let previouslyConnected = ArrayById(g.edges).some(edge => {
        let _s = source;
        let _t = target;
        if (_t === source && _s === target || _t === target && _s === source) {
            return true;
        }
    });
    if (previouslyConnected) {
        return true;
    }
}

function addNewEdge(g, edgeComposite) {
    let ed = edgeComposite.data;
    let edge = edgeComposite.description;

    let index = Object.keys(g.edges).length;
    let id = 'e' + index;

    let edgeDescription: Edge = { ...edge, id: id  };
    let edgeData: EdgeData = { id: id, linkFunctions: [] }
    edgeData = {...edgeData, ...ed};
    return {
        g: {
            ...g,
            edges: { ...g.edges, [id]: edgeDescription },
            edgesData: { ...g.edgesData, [id]: edgeData }
        },
        id: id
    };
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

function addLinkFunction(g, edge: Edge, linkFunction: FunctionItem) : AppState {
    let id = edge.id;
    let currentEdgeData = g.edgesData[id];
    let currentLinkFunctions = currentEdgeData.linkFunctions;
    let updatedEdgeData = {...currentEdgeData, linkFunctions: currentLinkFunctions.concat(linkFunction)}
    return {...g, edgesData: {...g.edgesData, [id]: updatedEdgeData}};
}

function updateOutNodes(nodes, ed, id) {
    let outEdges = nodes[ed.source].outEdges.concat([id])
    let inEdges = nodes[ed.target].inEdges.concat([id])
    let targetNode = { ...nodes[ed.target], inEdges: inEdges };
    let sourceNode = { ...nodes[ed.source], outEdges: outEdges };
    return { ...nodes, [ed.target]: targetNode, [ed.source]: sourceNode };
}

function nodePropertySet(g, nodeData: NodeData): Graph {
    let nd = g.nodesData[nodeData.id];
    nd = { ...nd, ...nodeData };
    let nodesData = { ...g.nodesData, [nd.id]: nd };
    console.log('new nodes data', nodesData);
    return { ...g, nodesData: nodesData };
}

/* TRAVERSAL */

function traverseCycles(_state, payload: Number = 0) {
    let cycleCount = payload;
    let state = { ..._state }
    let cache =  { ...state.cache };

    for (let c = 0; c < cycleCount; c++) {
        let sources = getSources(ArrayById(state.nodesData));
        let newNodesDataArray = breadthTraverse(sources, state);
        let newNodesDataObject = newNodesDataArray.reduce((acc, item) => {
            return { ...acc, [item.id]: item };
        }, {});
        state = { ...state, nodesData: newNodesDataObject };
        let name = String(c);
        cache[name] = state;
    }

    state = { ...state, nodesData: applyDisplayFunctions(state), cache: cache };

    return state;
}

// function reverseCycles(_state, backCycles: Number = 0) {
//     let state = { ..._state }
//     let currentCycle = Object.keys(state.cache).length - 1; 
//     let nextCycle = currentCycle + backCycles;
//     return { ...state, ...state.cache[String(nextCycle)]   };
// }

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
    let { linkedTargets, linkedSources } = linkSources(steppedSources, nestedTargets, _linkedSources, g);

    if (Object.keys(linkedTargets).length === 0) {
        return ArrayById(linkedSources);
    } else {
        return ArrayById(linkedSources).concat(breadthTraverse(ArrayById(linkedTargets), g, _linkedSources.concat(ArrayById(linkedSources))));      // n
    }

}

declare interface LinkedSources {
    linkedTargets: NodesData
    linkedSources: NodesData
}
function linkSources(steppedSources: Array<NodeData>, allTargets: Array<Array<NodeData>>, sourcesAlreadyLinked, g): LinkedSources {

    return steppedSources.reduce(function (acc, sourceData, i) {
        let outNodes: Array<NodeData> = allTargets[i];

        if (!sourceData.active || outNodes.length === 0 || sourcesAlreadyLinked.some(n => n.id === sourceData.id)) {
            return {
                linkedTargets: { ...acc.linkedTargets, ...ArrayToObject(outNodes) },
                linkedSources: { ...acc.linkedSources, [sourceData.id]: sourceData }
            };
        }
        else {
            /* apply link function when outNodes and not already stepped source
                the single function is applied to multiple target nodes  */
            let { linkedTargets, linkedSource } = linkSource(sourceData, outNodes, g);
            return {
                linkedTargets: { ...acc.linkedTargets, ...linkedTargets },
                linkedSources: { ...acc.linkedSources, ...linkedSource }
            };
        }
    }, { linkedTargets: {}, linkedSources: {} });
}

declare interface LinkedSource {
    linkedTargets: NodesData,
    linkedSource: NodesData
}

/* link from a single source to it's multiple targets */

function linkSource(_source: NodeData, targets: Array<NodeData>, g: Graph) {

    return targets.reduce((acc: any, target, i) => {

        /* extract from NodesData type of acc to NodeData type */
        let source = acc.linkedSource[_source.id];

        let edge: EdgeData = getEdge(source, target, g);
        let { linkedSource, linkedTarget } = linkTarget(source, target, edge);

        return {
            linkedTargets: {
                ...acc.linkedTargets,
                [linkedTarget.id]: linkedTarget
            },
            linkedSource: { [linkedSource.id]: linkedSource }
        }

    }, { linkedTargets: ArrayToObject(targets), linkedSource: { [_source.id]: _source } })

}

declare interface LinkPair {
    linkedSource: NodeData,
    linkedTarget: NodeData
}
function linkTarget(source: NodeData, target: NodeData, edge): LinkPair {

    return edge.linkFunctions.reduce((acc, functionSettings) => {
        let fn = SimulationFunctions.linkFunctions[functionSettings.name];

        /* application */
        let singleResult;
        if (target.active || functionSettings.phase === 'prelink') {
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