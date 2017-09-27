import { SimulationFunctions } from './../simulator/simulationFunctions';
import { _ } from 'underscore';

declare interface AppState {
    ui: any;
    graphs: any;
    graph: {};
    simulation: {};
}

declare interface Graph {
    nodes: any;
    edges: any;
}

let defaultState = {
    ui: null,
    graphs: null,
    graph: null,
    simulation: null
}

function rootReducer(state: AppState = defaultState, action) {

    return {
        ui: uiReducer(state.ui, action),
        graphs: graphsReducer(state.graphs, action),
        graph: graphReducer(state.graph, action),
        simulation: simulationReducer(state.simulation, action)
    }

}

function simulationReducer(state = null, action) {
    switch (action.type) {

        case 'SIMULATION_SET': {
            return (action.payload);
        }
        case 'STEP_INCREMENT': {
            return { ...state, step: (state.step === null ? 0 : state.step + 1) }
        }
        case 'SIMULATION_TIME_SET': {
            return Object.assign(state, { time: action.payload });
        }
        default:
            return state;
    }
}



function graphsReducer(state = null, action) {
    switch (action.type) {

        case 'GRAPHS_SET': {
            console.log('graphs', state, action.payload)
            return [].concat(action.payload);
        }
        default:
            return state;
    }
}

function uiReducer(state = null, action) {
    switch (action.type) {
        case 'UI_SET':
            return action.payload;
        case 'GRAPH_CONTAINER_SETTINGS_SET': {
            return Object.assign(state, { graphContainerSettings: action.payload });
        }
        case 'UI_SIMULATION_TIME_SET': {
            return { ...state, simulation: { ...state['simulation'], time: action.payload } };
        }
        case 'SIGMA_SETTINGS_SET': {
            return Object.assign(state, { sigmaSettings: action.payload });
        }
        default:
            return state;
    }
}



function graphReducer(state = null, action) {
    switch (action.type) {
        case 'GRAPH_SET': {
            return action.payload;
        }
        case 'NODES_SET': {
            return { ...state, nodes: action.payload };
        }
        case 'BREADTH_TRAVERSE': {
            let fn = function (nodeData) {
                return applyStepFunction(nodeData);
                // applyLinkFunction(nodeData);
            }
            let sources = getSources(ArrayById(state.nodesData));
            let newNodesDataArray = recurseNodes(sources, { step: applyStepFunction, link: applyLinkFunction }, state);
            let newNodesDataObject = newNodesDataArray.reduce((acc, item) => {
                return { ...acc, [item.id]: item };
            }, {});
            console.log('new nodes  data', newNodesDataObject);
            return { ...state, nodesData: newNodesDataObject };
        }
        default:
            return state;
    }

}

function dataReducer(state = {}, action) {
    switch (action.type) {

    }
}

function getSources(g) {
    return g.filter(n => n.type === 'source');
}

function ArrayById(o) {
    return Object.keys(o).map(k => o[k]);
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

function applyLinkFunction(targets, source, g, i) {
    if (i === null) {
        i = 0;
    }
    let edge = getEdge(source, targets[i], g);
    let target = targets[i];

    let Result = edge.linkFunctions.reduce((acc, functionSettings) => {
        let fn = SimulationFunctions.linkFunctions[functionSettings.name];
        let result = fn(acc.source, target, ...functionSettings.arguments);
        return { source: result.source, target: result.target };
    }, { source: { ...source }, target: { ...target } });

    let linkedSource = Result.source;
    let linkedTarget = Result.target;

    if (i === targets.length - 1) {
        return [[linkedTarget], [linkedSource]];
    } else {
        let [returnedLinkedTargets, returnedLinkedSource] = applyLinkFunction(targets, linkedSource, g, i + 1);
        return [[linkedTarget].concat(returnedLinkedTargets), returnedLinkedSource]      // n
    }
}

function getOutNodes(nodeData, g) {
    return g.nodes[nodeData.id].outEdges
        .map(edgeName => {
            return g.edges[edgeName]
        })
        .map(edge => {
            return g.nodes[edge.targetId]
        })
        .map(outNode => {
            return g.nodesData[outNode.id]
        });
}

function getEdge(source, target, g) {
    return g.nodes[source.id].outEdges.map(edge => g.edges[edge])
        .filter(g => g.targetId === target.id)
        .map(edgeDescription => g.edgesData[edgeDescription.id])
        .pop();
}

function recurseNodes(last, fns, g) {

    let nextNodesData = last.map(nodeData => { // n
        return getOutNodes(nodeData, g);
    });

    /* apply step function */
    let steppedSources = last.map((nodeData, i) => {
        return { ...nodeData, ...fns.step(nodeData, g) };
    })

    /* apply link function */
    let linkedTargets = [];
    let linkedSources = [];
    let x = steppedSources.reduce(function (acc, sourceNodeData, i) {
        let outNodes = nextNodesData[i];
        if (outNodes.length > 0) {
            let [_linkedTargets, _linkedSource] = applyLinkFunction(outNodes, sourceNodeData, g, null);
            return [acc[0].concat(_linkedTargets), acc[1].concat(_linkedSource)]
        } else {
            return [acc[0], acc[1].concat(sourceNodeData)];
        }

    }, [[], []]);
    linkedTargets = x[0];
    linkedSources = x[1];

    if (linkedTargets.length === 0) {
        return linkedSources;
    } else {
        return linkedSources.concat(recurseNodes(linkedTargets, fns, g));      // n
    }

}



export { rootReducer };