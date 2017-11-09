import { EdgeEditor } from './../../editors/edgeEditor';
import { ArrayById, ArrayToObject } from '../utilities';

import { linkFunctions } from '../../parser/linkFunctions';
import { _ } from 'underscore';

/* PRE-TRAVERSAL */


function updateAllConditions(state, conditions) {

}

function updateEdgesConditions(state) {
    let acc = { conditions: { ...state.graph.conditions }, edgesData: { ...state.graph.edgesData } };

    let { edgesData, conditions } = ArrayById(state.graph.edgesData).reduce((acc, ed) => {
        let { conditions, edgeData } = updateEdgeConditions(state, ed);

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

    if (updatedConds.some(cond => cond.value === true && cond.scope === 'sufficient')) {
        edgeData.active = true;
    }
    if (updatedConds.filter(cond => cond.scope === 'necessary')
        .every(cond => cond.value === true)) {
        edgeData.active = true;
    } else {
        edgeData.active = false;
    }

    return { edgeData: edgeData, conditions: updatedConds };
}

function selectEdgeConditions(state, edgeData) {
    let conditions = state.graph.conditions.filter(cond => cond.target === edgeData.id);
    return conditions;
    // if(conditions.length === 0) {
    //     return [];
    // }

    // let partitioned = _.partition(conditions, (cond => cond.phase === phase));
    // let inPhase = partitioned[0];
    // let outPhase = partitioned[1];
    // return inPhase;
}

export { updateEdgesConditions };