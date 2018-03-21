import { ArrayById, ArrayToObject, extend } from '../utilities/utilities';

import { conditionFunctions } from '../../functions/conditionFunctions';
import { _ } from 'underscore';
import { evaluateCondition} from './conditionEvaluation';

function updateAllConditions(state, conditions) {

}

/* apply edge conditions once per cycle */
function applyEdgesConditions(state: Graph) : Graph {
    state = Object.freeze(state);

    let acc = { conditions: { ...state.conditions }, edgesData: { ...state.edgesData } };

    /* reduce state and edges data for all edges */
    let { edgesData, conditions } = ArrayById(state.edgesData)
    .reduce((acc, _ed) => {
        let original = JSON.stringify(_ed);
        let edgeData = {..._ed};
        let configs: Array<FunctionConfig> = getEdgeConditions(state, {...edgeData});

        if(configs.length > 0) {
            edgeData = applyEdgeConditions(state, edgeData, configs);
        }
        if(original !== JSON.stringify(_ed)) {
            console.warn('EDGE DATA MUTATED')
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
        let {graph, target } = evaluateCondition({graph: _graph, target: edgeData, config, source: {} });
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