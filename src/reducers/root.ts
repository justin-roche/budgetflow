import { ScenarioEditor } from './../editors/scenarioEditor';
import { _ } from 'underscore';
import {undoableGraphReducer} from './graphReducer';
import {simulationReducer} from './simulationReducer';

import { uiReducer } from './uiReducer';
import undoable, { distinctState } from 'redux-undo'


let defaultState = {
    ui: null,
    graphs: null,
    graph: null,
    simulation: null,
}


let undoableUiReducer = undoable(uiReducer);

let undoableSimulationReducer = undoable(simulationReducer);
let undoableGraphsReducer = undoable(graphsReducer);
let undoableCombinedReducer = undoable(combinedReducer)

function rootReducer(s: AppState = defaultState, action) {

    
    //let s = undoableCombinedReducer(s, action);

    return {...s, ...{
        ui: undoableUiReducer(s.ui, action),
        graphs: undoableGraphsReducer(s.graphs, action),
        graph: undoableGraphReducer(s.graph, action),
        simulation: undoableSimulationReducer(s.simulation, action)
    }}

}

function combinedReducer(state, action) {
    switch (action.type) {
        
                case 'SET_STATE': {
                    return {...action.payload};
                }
                default:
                    return state;
            }
   
}

function graphsReducer(state = null, action) {
    switch (action.type) {

        case 'GRAPHS_SET': {
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