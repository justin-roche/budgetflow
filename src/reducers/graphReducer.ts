import { traverseGraph } from './graphFunctions/traverse';
import {
    addNewNode, addEdge, updateEdgeData, deleteNode,
    deleteEdge, nodePropertySet, addLinkFunction, toggleEdgeActivation
} from './graphFunctions/graphManipulationFunctions';
import { displayUpdate } from './graphFunctions/displayUpdate'
import { applyEdgesConditions, updateConditionExpression } from './graphFunctions/conditionsApply';
import undoable, { distinctState } from 'redux-undo'

declare interface GraphActions {
    applyDisplayFunctions: Function,
    applyConditions: Function,
    traverse: Function,
    deleteNode: Function,
    addNode: Function,
    setGraph: Function,
}

let graphActions = function (store) {

    return {
        name: 'graph',
        actions: {
            applyDisplayFunctions: function () {
                store.dispatch({ type: 'DISPLAY_UPDATE', payload: displayUpdate(store.getPresentState()) });
            },
            applyConditions: function (simulation) {
                store.dispatch({ type: 'GRAPH_SET', payload: applyEdgesConditions(store.getPresentState()) });
            },
            updateConditionExpression: function (condition) {
                store.dispatch({ type: 'GRAPH_SET', payload: updateConditionExpression(store.getPresentState().graph, condition) });
            },
            traverse: function (n?: Number) {
                store.dispatch({ type: 'TRAVERSE', payload: traverseGraph(store.getPresentState()) });
            },
            deleteNode: function (id: String) {
                store.dispatch({ type: 'DELETE_NODE', payload: id });
            },
            deleteEdge: function (eid: String) {
                store.dispatch({ type: 'DELETE_EDGE', payload: deleteEdge(store.getPresentState().graph, eid) });
            },
            addEdge: function (source, target) {
                store.dispatch({ type: 'EDGE_ADD', payload: addEdge(store.getPresentState().graph, source, target) });
            },
            updateEdgeData: function (ed: EdgeData) {
                store.dispatch({ type: 'EDGE_DATA_UPDATE', payload: updateEdgeData(store.getPresentState().graph, ed) });
            },
            toggleEdgeActivation: function (id: String) {
                store.dispatch({ type: 'EDGE_DATA_UPDATE', payload: toggleEdgeActivation(store.getPresentState().graph, id) });
            },
            setGraph: function (g) {
                store.dispatch({ type: 'GRAPH_SET', payload: g });
            },
            addNode: function () {
                store.dispatch({ type: 'ADD_NODE' });
            },
            undo: function () {
                store.dispatch({ type: 'GRAPH_UNDO' });
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
            return action.payload;
        }
        case 'EDGE_DATA_UPDATE': {
            return action.payload;
        }
        case 'EDGE_LINK_FUNCTION_ADD': {
            return { ...state, ...addLinkFunction(state, action.payload.edge, action.payload.function) }
        }

        default:
            return state;
    }

}

let undoableGraphReducer = undoable(graphReducer, {
    undoType: 'GRAPH_UNDO', redoType: 'GRAPH_REDO', filter: function (x, prev, next) {
        return (next !== null && prev !== null) && next !== prev;
    }
});





export { graphReducer, graphActions, undoableGraphReducer }