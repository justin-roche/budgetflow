import { ScenarioEditor } from './../editors/scenarioEditor';
import { SimulationFunctions } from './../parser/simulationFunctions';
import { _ } from 'underscore';
import {graphReducer} from './graphReducer';
import {simulationReducer} from './simulationReducer';
import { uiReducer } from './uiReducer';
import undoable, { distinctState } from 'redux-undo'

// declare interface AppState {
//     ui: any;
//     graphs: any;
//     graph: {};
//     simulation: {};
// }

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

let undoableGraphReducer = undoable(graphReducer);
let undoableUiReducer = undoable(uiReducer);
let undoableSimulationReducer = undoable(simulationReducer);
let undoableGraphsReducer = undoable(graphsReducer);

function rootReducer(state: AppState = defaultState, action) {

    
    return {
        ui: undoableUiReducer(state.ui, action),
        graphs: undoableGraphsReducer(state.graphs, action),
        graph: undoableGraphReducer(state.graph, action),
        simulation: undoableSimulationReducer(state.simulation, action)
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


function dataReducer(state = {}, action) {
    switch (action.type) {

    }
}





export { rootReducer };