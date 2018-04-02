import { ArrayById, ArrayToObject, extend } from '../utilities/utilities';

import { _ } from 'underscore';
import { evaluateCondition} from './conditionEvaluation';

function updateAllConditions(state, conditions) {

}

/* apply edge conditions once per cycle */
function applyEdgesConditions(state: Graph) : Graph {
    let graph = JSON.parse(JSON.stringify(state))


    /* reduce state and edges data for all edges */
    ArrayById(state.edgesData)
    .forEach((ed) => {
        let configs: Array<Condition> = getEdgeConditions(state, ed);
        if(configs.length > 0) {
            applyEdgeConditions(state, ed, configs);
        }
    });
  
    return graph;
}


function getEdgeConditions(state: Graph, edgeData) : Array<Condition>{
    if(!edgeData.conditionFunctions) {
        return [];
    }
    return edgeData.conditionFunctions.map(id => state.conditions[id]);
}

function applyEdgeConditions(graph: Graph, target, conditionConfigs) {

    conditionConfigs.forEach(config => {
        evaluateCondition({graph, target, config});
    });
    
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