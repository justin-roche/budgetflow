import { traverseGraph } from './graphFunctions/traverse';
import { addNewNode, addNewEdge, updateEdge, deleteNode, nodePropertySet, addLinkFunction } from './graphFunctions/graphManipulationFunctions';
import { displayUpdate } from './graphFunctions/displayUpdate'
import { updateEdgesConditions } from './graphFunctions/conditionsUpdate';
import undoable, { distinctState } from 'redux-undo'

declare interface GraphActions {
    applyDisplayFunctions: Function,
    conditionsUpdate: Function,
    traverse: Function,
    deleteNode: Function,
    addNode: Function,
    setGraph: Function,
}

let graphActions = function (store) {

    return {
        name: 'graph',
        actions: {
            applyDisplayFunctions: function() {
                 store.dispatch({ type: 'GRAPH_SET', payload: displayUpdate(store.getPresentState())}); 
            },
            conditionsUpdate: function (simulation) {
                 store.dispatch({ type: 'GRAPH_SET', payload: x });
            },
            traverse: function (n?: Number) {
                 store.dispatch({ type: 'GRAPH_SET', payload: traverseGraph(store.getPresentState())});
            },
            deleteNode: function (id: String) {
                 store.dispatch({ type: 'DELETE_NODE', payload: id });
                // return store;
            },
            setGraph: function(g) {
                 store.dispatch({ type: 'GRAPH_SET', payload: g});                                
            },
            addNode: function () {
                store.dispatch({ type: 'ADD_NODE' });
               // return store;
            }
        }
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
        case 'ADD_NODE': {
            return { ...state, ...addNewNode(state, action.payload) };
        }
        case 'DELETE_NODE': {
            return { ...state, ...deleteNode(state, action.payload) }
        }
        case 'NODE_PROPERTY_SET': {
            return { ...state, ...nodePropertySet(state, action.payload.nodeData) }
        }
        case 'EDGE_ADD': {
            return { ...state, ...addNewEdge(state, action.payload) };
        }
        case 'EDGE_UPDATE': {
            updateEdge(state, action.payload.edge, action.payload.edgeData);
            return { ...state };
        }
        case 'EDGE_LINK_FUNCTION_ADD': {
            return { ...state, ...addLinkFunction(state, action.payload.edge, action.payload.function) }
        }

        default:
            return state;
    }

}

let undoableGraphReducer = undoable(graphReducer, {undoType: 'GRAPH_UNDO', redoType: 'GRAPH_REDO', filter: function(x, prev, next){
    return (next !== null && prev !== null) && next !== prev;
}});





export { graphReducer, graphActions, undoableGraphReducer }

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