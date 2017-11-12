import { traverseGraph } from './graphFunctions/traverse';
import {
    addNewNode, addEdge, updateEdgeData, deleteNode,
    deleteEdge, toggleEdgeActivation,
    updateNodeData
} from './graphFunctions/graphManipulationFunctions';
import { resetTime, incrementCurrentTime, incrementTargetTime, decrementTargetTime, setTargetTime, simulate } from './graphFunctions/simulationFunctions'
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
            
            updateConditionExpression: function (condition) {
                store.dispatch({ type: 'GRAPH_SET', payload: updateConditionExpression(store.getPresentState().graph, condition) });
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
            updateNodeData: function (nd: NodeData) {
                store.dispatch({ type: 'GRAPH_NODE_DATA_UPDATE', payload: updateNodeData(store.getPresentState().graph, nd) });
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

            /* simulation functions */
            
            incrementTargetTime: function () {
                store.dispatch({ type: 'GRAPH_INCREMENT_TARGET_TIME', payload: incrementTargetTime(store.getPresentState().graph) });
            },
            resetTime: function (t) {
                store.dispatch({ type: 'GRAPH_RESET_TIME', payload: resetTime(store.getPresentState().graph) });
            },
            decrementTargetTime: function () {
                store.dispatch({ type: 'GRAPH_DECREMENT_TARGET_TIME', payload: decrementTargetTime(store.getPresentState().graph) });
            },
            incrementCurrentTime: function () {
                store.dispatch({ type: 'GRAPH_INCREMENT_CURRENT_TIME', payload: incrementCurrentTime(store.getPresentState().graph) });
            },

            setTargetTime: function (t) {
                store.dispatch({ type: 'GRAPH_SET_TARGET_TIME', payload: setTargetTime(store.getPresentState().graph, t) });
            },

            simulate: function (t) {
                store.dispatch({ type: 'SIMULATE', payload: simulate(store.getPresentState().graph)});
            },
            traverse: function (n?: Number) {
                store.dispatch({ type: 'TRAVERSE', payload: traverseGraph(store.getPresentState()) });
            },

            /* iterative updates */
            applyDisplayFunctions: function () {
                store.dispatch({ type: 'GRAPH_DISPLAY_FUNCTIONS_APPLY', payload: displayUpdate(store.getPresentState().graph) });
            },
            applyConditions: function (simulation) {
                store.dispatch({ type: 'GRAPH_CONDITIONS_APPLY', payload: applyEdgesConditions(store.getPresentState()) });
            },

            undo: function (c = 1) {
                
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
        case 'GRAPH_DISPLAY_FUNCTIONS_APPLY': {
            return action.payload;
        }
        case 'GRAPH_CONDITIONS_APPLY': {
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
        case 'EDGE_ADD': {
            return action.payload;
        }
        case 'EDGE_DATA_UPDATE': {
            return action.payload;
        }
        case 'GRAPH_NODE_DATA_UPDATE': {
            return action.payload;
        }

        /*simulation */
        case 'GRAPH_INCREMENT_TARGET_TIME': {
            return action.payload;
        }
        case 'GRAPH_RESET_TIME': {
            return action.payload;
        }
        case 'GRAPH_DECREMENT_TARGET_TIME': {
            return action.payload;
        }
        case 'GRAPH_INCREMENT_CURRENT_TIME': {
            return action.payload;
        }
        case 'GRAPH_SET_TARGET_TIME': {
            return action.payload;
        }
        case 'SIMULATE': {
            return action.payload;
        }

        default:
            return state;
    }

}

let undoableGraphReducer = undoable(graphReducer, {
    undoType: 'GRAPH_UNDO', 
    redoType: 'GRAPH_REDO', filter: function (x, prev, next) {
        return (next !== null && prev !== null) && next !== prev;
    },
    jumpToPastType: 'GRAPH_JUMP_TO_PAST'
});





export { graphReducer, graphActions, undoableGraphReducer }