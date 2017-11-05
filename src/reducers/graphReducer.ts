import { traverseCycles, applyDisplayFunctions } from './traversalFunctions';
import {addNewNode, addNewEdge, updateEdge, deleteNode, nodePropertySet, addLinkFunction} from './graphManipulationFunctions';

let actions = {


    graphTraverseCycles: function(n?: Number){
        return {type: 'GRAPH_TRAVERSE_CYCLES', payload: (n || 1)};
    },

    deleteNode: function(id: String) {
        return {type: 'DELETE_NODE', payload: id};
    },

    addNode: function() {
        return {type: 'ADD_NODE'}
    }

}

  
function graphReducer(state = null, action, globalState) {
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
           return { ...state, ...addNewEdge(state, action.payload)};
        }
        case 'EDGE_UPDATE': {
            updateEdge(state, action.payload.edge, action.payload.edgeData);
            return { ...state };
        }
        case 'EDGE_LINK_FUNCTION_ADD': {
            return {...state, ...addLinkFunction(state, action.payload.edge, action.payload.function)}
        }
        case 'DISPLAY_FUNCTIONS_APPLY': {
            return { ...state, nodesData: applyDisplayFunctions(state) }
        }
        case 'GRAPH_TRAVERSE_CYCLES': {
            return traverseCycles(state, action.payload, globalState);
        }
        
        default:
            return state;
    }

}





export { graphReducer, actions }

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