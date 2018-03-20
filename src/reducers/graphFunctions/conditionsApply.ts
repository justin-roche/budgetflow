import { EdgeEditor } from './../../edgeEditor/edgeEditor';
import { ArrayById, ArrayToObject } from '../utilities';

import { conditionFunctions } from '../../functions/conditionFunctions';
import { _ } from 'underscore';
import { extend } from './../utilities';

function updateAllConditions(state, conditions) {

}

/* apply edge conditions once per cycle */
function applyEdgesConditions(state: Graph) : Graph {
    state = Object.freeze(state);

    let acc = { conditions: { ...state.conditions }, edgesData: { ...state.edgesData } };

    /* reduce state and edges data for all edges */
    let { edgesData, conditions } = ArrayById(state.edgesData)
    .reduce((acc, ed) => {
        let edgeData = {...ed};
        let configs: Array<FunctionConfig> = getEdgeConditions(state, {...ed});
        if(configs.length > 0) {
            edgeData = applyEdgeConditions(state, ed, configs);
        }
        let edgesData = { ...acc.edgesData, [edgeData.id]: edgeData };
        return { ...acc, edgesData: edgesData };
    }, acc);

    return { ...state, edgesData: edgesData };
}

// declare interface update_edge_conditions {
//     edgesData: EdgesData,
//     conditions: Array<Condition>
// }

function getEdgeConditions(state: Graph, edgeData) : Array<FunctionConfig>{
    if(!edgeData.conditionFunctions) {
        return [];
    }
    return edgeData.conditionFunctions.map(id => state.conditions[id]);
}

function applyEdgeConditions(_graph: Graph, edgeData, conditionConfigs) : EdgeData {
    let acc = {...edgeData};

    acc = conditionConfigs.reduce((acc, config) => {
        let fn = conditionFunctions[config.name].fn;
        let {graph, target } = fn({graph: _graph, target: edgeData, config });
        return {...acc, ...target};
    },acc);
    
    return acc;
}

// function composeConditions() {
//     let necessary = updatedConds.filter(cond => cond.scope = "necessary");
//     let sufficient = updatedConds.filter(cond => cond.scope = "sufficient");

//     if (sufficient.some(cond => cond.value === true)) {
//         edgeData.active = true;
//     }
//     if (necessary.some(cond => cond.value === false)) {
//         edgeData.active = false;
//     } 

//     updatedConds = ArrayToObject(updatedConds);
// }



export { applyEdgesConditions };