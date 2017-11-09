
import { Store } from './../../src/services/reduxStore';
import { graphActions } from '../../src/reducers/graphReducer';
import { state } from '../../src/state'
import { createStore } from 'redux';
import { rootReducer } from '../../src/reducers/root';

function createTestStore() {
    let store = new Store();
    store.provideStore(createStore(rootReducer));
    store.provideActions([graphActions]);
    store.dispatch({type: 'GRAPHS_SET', payload: state.graphs});
    store.dispatch({type: 'GRAPH_SET', payload: state.graph});
    store.dispatch({type: 'UI_SET', payload: state.ui});
    store.dispatch({type: 'SIMULATION_SET', payload: state.simulation});
    return store;
}

function makeUndoableState(s) {
    for (let prop in s) {
        let c = s[prop];
        delete s[prop];
        s[prop] = {present: c, past: [], future: []};        
    }
    return s;
}

export { createTestStore }
