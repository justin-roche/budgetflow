import { ConditionalTable } from './../editors/conditionalTable';
import { SimulationFunctions } from './../simulator/simulationFunctions';
import { _ } from 'underscore';
import {graphReducer} from './graphReducer';

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
        case 'REMAINING_CYCLES_SET': {
            return { ...state, remainingCycles: action.payload }
        }
        case 'SIMULATION_TIME_SET': {
            return {...state,  time: action.payload };
        }
        case 'SIMULATION_ON': {
            return {...state, simulating: true};
        }
        case 'SIMULATION_OFF': {
            return {...state, simulating: false};
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
        case 'SELECT_NODE': {
            console.log('reducing')
            return {...state, graphContainer: {...state.graphContainer, selectedNodeId: action.payload}};
        }
        case 'UI_SIMULATION_TIME_SET': {
            return { ...state, simulation: { ...state['simulation'], time: action.payload } };
        }
        case 'NODE_EDITOR_MODEL_SET': {
            return {...state, nodeEditor: {...state.nodeEditor, nodeModel: action.payload} };
        }
        case 'UI_CONDITIONAL_TABLE_TOGGLE': {
            return {...state, conditionalTable: {...state.conditionalTable, show: !state.conditionalTable.show} };
        }
        default:
            return state;
    }
}





function dataReducer(state = {}, action) {
    switch (action.type) {

    }
}





export { rootReducer };