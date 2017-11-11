import { ArrayById, ArrayToObject } from '../utilities';

import { linkFunctions } from '../../parser/linkFunctions';
import { _ } from 'underscore';
import { extend } from './../utilities';

function updateAllConditions(state, conditions) {

}

function applyEdgesConditions(state: AppState) {
    state = Object.freeze(state)
    let acc = { conditions: { ...state.graph.conditions }, edgesData: { ...state.graph.edgesData } };

    let { edgesData, conditions } = ArrayById(state.graph.edgesData).reduce((acc, ed) => {
        let { conditions, edgeData } = applyEdgeConditions(state, {...ed});

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

function applyEdgeConditions(state: AppState, edgeData) {
    let conditionsIds = selectEdgeConditions(state, edgeData);
    if (conditionsIds.length === 0) {
        return { edgeData: edgeData, conditions: conditionsIds.map(id => state.graph.conditions[id]) };
    }
    return applyConditions(state, conditionsIds, edgeData);
}

function applyConditions(state, conditionIds, edgeData) {
    let updatedConds = conditionIds.map(condId => {
        let cond = state.graph.conditions[condId];
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

    updatedConds = ArrayToObject(updatedConds);
    return { edgeData: edgeData, conditions: updatedConds };
}

function selectEdgeConditions(state, edgeData) {
    let conditionsIds = state.graph.conditionsIds.filter(condId => state.graph.conditions[condId].target === edgeData.id);
    return conditionsIds;
}

function updateConditionExpression(state: Graph, condition) {
    return extend(state).select(`conditions.${condition.id}`).data((obj: any) => {
        return { ...obj, expression: condition.expression };
    });
}

export { applyEdgesConditions, updateConditionExpression };