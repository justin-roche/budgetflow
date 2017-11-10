import { Store } from './../../src/services/reduxStore';
import { undoableGraphReducer, graphActions } from '../../src/reducers/graphReducer';
import { state } from '../../src/state'
import { createStore } from 'redux';
import { createTestStore } from './test.utilities';

describe('graph reducer', () => {
    
    let store;
    let s1 : AppState;
    
    beforeEach(() => {
        store = createTestStore();
        store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'tree').pop());
        s1 = store.getPresentState();
    });

    

});