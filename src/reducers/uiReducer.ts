function uiReducer(state = null, action) {
    switch (action.type) {
        case 'UI_SET':
            return action.payload;
        case 'SELECT_NODE': {
            console.log('reducing')
            return {...state, graphContainer: {...state.graphContainer, selectedNodeId: action.payload}};
        }
        case 'NODE_EDITOR_MODEL_SET': {
            return {...state, nodeEditor: {...state.nodeEditor, nodeModel: action.payload} };
        }
        case 'UI_NODE_EDITOR_TOGGLE': {
            return {...state, nodeEditor: {...state.nodeEditor, show: !state.nodeEditor.show} };
        }
        case 'UI_CONDITIONAL_TABLE_TOGGLE': {
            return {...state, conditionalTable: {...state.conditionalTable, show: !state.conditionalTable.show} };
        }
        case 'UI_SCENARIO_EDITOR_TOGGLE': {
            return {...state, scenarioEditor: {...state.scenarioEditor, show: !state.scenarioEditor.show} };
        }
        default:
            return state;
    }
}

export { uiReducer };