
declare interface AppState {
    ui: any;
    graphs: any;
    graph: {};
    simulation: {};
}

let defaultState = {
    ui: {},
    graphs: [],
    graph: {},
    simulation: {}
}

function rootReducer(state: AppState = defaultState, action) {

    return {
        ui: uiReducer(state.ui, action),
        graphs: graphsReducer(state.graphs, action),
        graph: graphReducer(state.graph, action),
        // sigma: sigmaReducer(state, action),
        // simulation: simulationReducer(state, action)
    }

}

function simulationReducer(state = {}, action) {
    switch (action.type) {
        
                case 'SIMULATION_SET': {
                    return (action.payload);
                }
                case 'SIMULATION_TIME_SET': {
                    return Object.assign(state, {time: action.payload});
                }
                default:
                    return state;
            }
}

function sigmaReducer(state = {}, action) {
    switch (action.type) {
        
                case 'SIGMA_SET': {
                    return (action.payload);
                }
                default:
                    return state;
            }
}

function graphsReducer(state = [], action) {
    switch (action.type) {

        case 'GRAPHS_SET': {
            console.log('graphs', state, action.payload)
            return [].concat(action.payload);
        }
        default:
            return state;
    }
}

function uiReducer(state = {}, action) {
    switch (action.type) {
        case 'UI_SET':
            return action.payload;
        case 'GRAPH_CONTAINER_SETTINGS_SET': {
            return Object.assign(state, { graphContainerSettings: action.payload });
        }
        case 'UI_SIMULATION_TIME_SET': {
            return {...state, simulation: { ...state['simulation'], time: action.payload }};
        }
        case 'SIGMA_SETTINGS_SET': {
            return Object.assign(state, { sigmaSettings: action.payload });
        }
        default:
            return state;
    }
}

function graphReducer(state = {}, action) {
    switch (action.type) {
        case 'GRAPH_SET': {
            return action.payload ;
        }
        default: 
            return state;
    }
    
}



export { rootReducer };