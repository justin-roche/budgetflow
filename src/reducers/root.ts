import { ScenarioEditor } from './../editors/scenarioEditor';
import { _ } from 'underscore';
import {undoableGraphReducer} from './graphReducer';
import {simulationReducer, undoableSimulationReducer} from './simulationReducer';

import { uiReducer } from './uiReducer';
import undoable, { distinctState } from 'redux-undo'


let defaultState = {
    ui: null,
    graphs: null,
    graph: null,
}


let undoableUiReducer = undoable(uiReducer);

let undoableGraphsReducer = undoable(graphsReducer);
//let undoableCombinedReducer = undoable(combinedReducer)

function rootReducer(s: AppState = defaultState, action) {

    
    //let s = undoableCombinedReducer(s, action);

    return {...s, ...{
        ui: undoableUiReducer(s.ui, action),
        graphs: undoableGraphsReducer(s.graphs, action),
        graph: undoableGraphReducer(s.graph, action),
       // simulation: undoableSimulationReducer(s.simulation, action)
    }}

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

export { rootReducer };