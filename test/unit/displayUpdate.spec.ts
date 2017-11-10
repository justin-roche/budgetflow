import { Store } from './../../src/services/reduxStore';
import { undoableGraphReducer, graphActions } from '../../src/reducers/graphReducer';
import { state } from '../../src/state'
import { createStore } from 'redux';
import { createTestStore } from './test.utilities';

describe('graph reducer', () => {

    let store;
    let s1: AppState;

    describe('runs update functions', () => {
        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'tree').pop());
            s1 = store.getPresentState();
        });

        it('labels by id', () => {
            expect(s1.graph.nodesData['n0'].displayData.label).toBeUndefined();
            let s2 = store.actions.graph.applyDisplayFunctions().getPresentState();
            expect(s2.graph.nodesData['n0'].displayData.label).toBe('n0:50');
        })

    });





});