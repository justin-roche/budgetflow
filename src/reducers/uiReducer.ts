import { ScenarioEditor } from './../editors/scenarioEditor';
import { extend } from './utilities';

let uiActions = function (store) {
    return {
        name: 'ui',
        actions: {
            closeModal(settings) {
                switch (settings.id) {
                    case 'scenarioEditor': {
                        return store.dispatch({ type: 'UI_SCENARIO_EDITOR_TOGGLE' });
                    }
                    case 'nodeEditor': {
                        return store.dispatch({ type: 'UI_NODE_EDITOR_TOGGLE' });
                    }
                    case 'edgeEditor': {
                        return store.dispatch({ type: 'UI_EDGE_EDITOR_TOGGLE' });
                    }
                }
            },
            selectNode(id) {
                let state = store.getPresentState().ui;
                let s = {
                    ...state,
                    nodeEditor: { ...state.nodeEditor, ...{ show: !!id } },
                    graphContainer: { ...state.graphContainer, selectedNodeId: id }
                };
                return store.dispatch({ type: 'UI_SELECT_NODE', payload: s });
            },
            selectEdge(id) {
                let state = store.getPresentState().ui;
                let s = {
                    ...state,
                    edgeEditor: { ...state.edgeEditor, ...{ show: !!id } },                    
                    graphContainer: { ...state.graphContainer, selectedEdgeId: id }
                };
                return store.dispatch({ type: 'UI_SELECT_EDGE', payload: s });
            },
            toggleEdgeEditor() {
                return store.dispatch({ type: 'UI_EDGE_EDITOR_TOGGLE'});
            }
        }
    }

}


function uiReducer(state = null, action) {
    switch (action.type) {
        case 'UI_SET':
            return action.payload;
        case 'UI_SELECT_NODE': {
            return action.payload;
        }
        case 'UI_SELECT_EDGE': {
            return action.payload;
        }
        case 'NODE_EDITOR_MODEL_SET': {
            return { ...state, nodeEditor: { ...state.nodeEditor, nodeModel: action.payload } };
        }
        case 'UI_NODE_EDITOR_TOGGLE': {
            return extend(state).select('nodeEditor.modalSettings').data((obj: any) => {
                return { ...obj, show: !obj.show };
            });
        }
        case 'UI_CONDITIONAL_TABLE_TOGGLE': {
            return { ...state, conditionalTable: { ...state.conditionalTable, show: !state.conditionalTable.show } };
        }
        case 'UI_SCENARIO_EDITOR_TOGGLE': {
            return extend(state).select('scenarioEditor.modalSettings').data((obj: any) => {
                return { ...obj, show: !obj.show };
            });
        }
        case 'UI_EDGE_EDITOR_TOGGLE': {
            return extend(state).select('edgeEditor.modalSettings').data((obj: any) => {
                return { ...obj, show: !obj.show };
            });
        }
        default:
            return state;
    }
}

export { uiReducer, uiActions };