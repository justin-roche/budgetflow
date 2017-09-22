
declare interface AppState {
    ui: any;
    graphs: any;
    graph: {};
}

let defaultState = {
    ui: {},
    graphs: [],
    graph: {},
}

function rootReducer(state: AppState = defaultState, action) {

    return {
        ui: uiReducer(state.ui, action),
        graphs: graphsReducer(state.graphs, action),
        graph: graphReducer(state.graph, action),
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
        case 'GRAPH_CONTAINER_SETTINGS_SET': {
            return Object.assign(state, { graphContainerSettings: action.payload });
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
            console.log('reducing graph', action)
            return action.payload ;
        }
        default: 
            return state;
    }
    
}



export { rootReducer };