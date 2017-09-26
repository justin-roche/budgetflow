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
            let newNodesDataArray = recurseNodes(sources, fn, state);
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
        let updated = {...acc, ...newSlice};
        return updated;
    }, { ...nodeData });

    return update;
}

function applyLinkFunction() {

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

function recurseNodes(last, fn, g) {

    let nextNodesData = _.flatten(last.map( nodeData => { // n
        return getOutNodes(nodeData, g);
    }));

    let changed = last.map((nodeData, i) => {
        return { ...nodeData, ...fn(g.nodesData[nodeData.id]) };
    })

    if (nextNodesData.length === 0) {
        return changed;
    } else {
        return changed.concat(recurseNodes(nextNodesData, fn, g));      // n
    }

}



export { rootReducer };