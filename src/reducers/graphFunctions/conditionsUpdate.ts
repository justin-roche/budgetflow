import { ArrayById, ArrayToObject } from '../utilities';

import { linkFunctions } from '../../parser/linkFunctions';
import { _ } from 'underscore';

/* PRE-TRAVERSAL */


function updateAllConditions(state, conditions) {

}

function updateEdgesConditions(state) {
    state = Object.freeze(state)
    let acc = { conditions: { ...state.graph.conditions }, edgesData: { ...state.graph.edgesData } };

    let { edgesData, conditions } = ArrayById(state.graph.edgesData).reduce((acc, ed) => {
        let { conditions, edgeData } = updateEdgeConditions(state, {...ed});

        let c = { ...acc.conditions, ...conditions };
        let e = { ...acc.edgesData, [edgeData.id]: edgeData };
        return { ...acc, conditions: c, edgesData: e };
    }, acc);

    return { ...state.graph, conditions: conditions, edgesData: edgesData };
}

declare interface update_edge_conditions {
    edgesData: EdgesData,
    conditions: Array<Condition>
}

function updateEdgeConditions(state: AppState, edgeData) {
    let conditions = selectEdgeConditions(state, edgeData);
    if (conditions.length === 0) {
        return { edgeData: edgeData, conditions: conditions };
    }
    return updateConditions(state, conditions, edgeData);
}

function updateConditions(state, edgeConditions, edgeData) {
    let updatedConds = edgeConditions.map(cond => {
        return { ...cond, value: linkFunctions.evaluateEdgeCondition(state, edgeData, cond.expression) };
    })

    let necessary = updatedConds.filter(cond => cond.scope = "necessary");
    let sufficient = updatedConds.filter(cond => cond.scope = "sufficient");

    if (sufficient.some(cond => cond.value === true)) {
        edgeData.active = true;
    }
    if (necessary.some(cond => cond.value === false)) {
        edgeData.active = false;
    } 

    return { edgeData: edgeData, conditions: updatedConds };
}

function selectEdgeConditions(state, edgeData) {
    let conditions = state.graph.conditions.filter(cond => cond.target === edgeData.id);
    return conditions;
}

export { updateEdgesConditions };