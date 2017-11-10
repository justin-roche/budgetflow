import { traverseGraph } from './graphFunctions/traverse';
import { addNewNode, addNewEdge, updateEdge, deleteNode, 
    deleteEdge, nodePropertySet, addLinkFunction } from './graphFunctions/graphManipulationFunctions';
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
                 store.dispatch({ type: 'DISPLAY_UPDATE', payload: displayUpdate(store.getPresentState())}); 
            },
            conditionsUpdate: function (simulation) {
                 store.dispatch({ type: 'GRAPH_SET', payload: updateEdgesConditions(store.getPresentState()) });
            },
            traverse: function (n?: Number) {
                 store.dispatch({ type: 'TRAVERSE', payload: traverseGraph(store.getPresentState())});
            },
            deleteNode: function (id: String) {
                 store.dispatch({ type: 'DELETE_NODE', payload: id });
            },
            deleteEdge: function (eid: String) {
                store.dispatch({ type: 'DELETE_EDGE', payload: deleteEdge(store.getPresentState().graph, eid)});
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
        case 'DISPLAY_UPDATE': {
            return action.payload;
        }
        case 'TRAVERSE': {
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
        case 'DELETE_EDGE': {
            return { ...state, ...action.payload }
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