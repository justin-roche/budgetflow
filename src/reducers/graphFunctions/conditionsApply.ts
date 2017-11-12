import { ArrayById, ArrayToObject } from '../utilities';

import { linkFunctions } from '../../parser/linkFunctions';
import { _ } from 'underscore';
import { extend } from './../utilities';

function updateAllConditions(state, conditions) {

}

function applyEdgesConditions(state: Graph) {
    state = Object.freeze(state)
    let acc = { conditions: { ...state.conditions }, edgesData: { ...state.edgesData } };

    let { edgesData, conditions } = ArrayById(state.edgesData).reduce((acc, ed) => {
        let { conditions, edgeData } = applyEdgeConditions(state, {...ed});

        let c = { ...acc.conditions, ...conditions };
        let e = { ...acc.edgesData, [edgeData.id]: edgeData };
        return { ...acc, conditions: c, edgesData: e };
    }, acc);

    return { ...state, conditions: conditions, edgesData: edgesData };
}

declare interface update_edge_conditions {
    edgesData: EdgesData,
    conditions: Array<Condition>
}

function applyEdgeConditions(state: Graph, edgeData) {
    let conditionsIds = selectEdgeConditions(state, edgeData);
    if (conditionsIds.length === 0) {
        return { edgeData: edgeData, conditions: conditionsIds.map(id => state.conditions[id]) };
    }
    return applyConditions(state, conditionsIds, edgeData);
}

function applyConditions(state: Graph, conditionIds, edgeData) {
    let updatedConds = conditionIds.map(condId => {
        let cond = state.conditions[condId];
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

function selectEdgeConditions(state: Graph, edgeData) {
    let conditionsIds = state.conditionsIds.filter(condId => state.conditions[condId].target === edgeData.id);
    return conditionsIds;
}

function updateConditionExpression(state: Graph, condition) {
    return extend(state).select(`conditions.${condition.id}`).data((obj: any) => {
        return { ...obj, expression: condition.expression };
    });
}

export { applyEdgesConditions, updateConditionExpression };