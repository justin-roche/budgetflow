import { ScenarioEditor } from './../editors/scenarioEditor';
import { SimulationFunctions } from './../simulator/simulationFunctions';
import { _ } from 'underscore';
import {graphReducer} from './graphReducer';
import {simulationReducer} from './simulationReducer';
import { uiReducer } from './uiReducer';

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

function rootReducer(state: AppState = defaultState, action) {

    return {
        ui: uiReducer(state.ui, action),
        graphs: graphsReducer(state.graphs, action),
        graph: graphReducer(state.graph, action),
        simulation: simulationReducer(state.simulation, action)
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