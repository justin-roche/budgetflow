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
        store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'conditional').pop());
        s1 = store.getPresentState();
    });

    describe('conditions update', () => {
   
        it('conditions update does not mutate original state', ()=> {
            let original = JSON.stringify(s1);
            store.actions.graph.conditionsUpdate();
            expect(original === JSON.stringify(s1)).toBe(true);
        })

        it('individual links from nodes are activated when sufficient conditions are met', () => {
            s1.graph.edgesData.e2.active = false;
            s1.graph.conditions[0].expression = 'true';
            s1.graph.conditions[0].scope = 'sufficient';
            store.actions.graph.conditionsUpdate();
            let s2 = store.getPresentState();
            expect(s2.graph.edgesData.e2.active).toBe(true);
        })

        it('individual links from nodes are deactivated when necessary conditions are not met', () => {
            s1.graph.edgesData.e2.active = true;
            s1.graph.conditions[0].scope = 'necessary';
            s1.graph.conditions[0].expression = 'false';
            store.actions.graph.conditionsUpdate();
            let s2 = store.getPresentState();
            expect(s2.graph.edgesData.e2.active).toBe(false);
        })

        it('condition update has access to global state', () => {
            s1.graph.edgesData.e2.active = true;
            s1.graph.conditions[0].scope = 'necessary';
            s1.graph.conditions[0].expression = "state.simulation.time === 'a'";
            store.actions.graph.conditionsUpdate();
            let s2 = store.getPresentState();
            expect(s2.graph.edgesData.e2.active).toBe(false);
        })
    });


});