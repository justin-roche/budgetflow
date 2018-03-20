import { Store } from './../../src/services/reduxStore';
import { undoableGraphReducer, graphActions } from '../../src/reducers/graphReducer';
import { state } from '../../src/state'
import { createStore } from 'redux';
import { createTestStore } from './test.utilities';

describe('conditions application', () => {
    
    let store;
    let s1 : AppState;
    
    beforeEach(() => {
        store = createTestStore();
        store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'conditional').pop());
        s1 = store.getPresentState();
        store.actions.graph.incrementTargetTime(); 
    });

    describe('conditions update', () => {
   
        it('conditions update does not mutate original state', ()=> {
            let original = JSON.stringify(s1);
            store.actions.graph.simulate();
            expect(original === JSON.stringify(s1)).toBe(true);
        })

        it('individual links from nodes are activated when sufficient conditions are met', () => {
            s1.graph.edgesData.e1.active = false;
            store.actions.graph.simulate();            
            let s2 = store.getPresentState();
            expect(s2.graph.edgesData.e1.active).toBe(true);
        })

        // it('individual links from nodes are deactivated when necessary conditions are not met', () => {
        //     s1.graph.edgesData.e1.active = true;
        //     s1.graph.conditions['c0'].scope = 'necessary';
        //     s1.graph.conditions['c0'].expression = 'false';
        //     store.actions.graph.simulate();            
        //     let s2 = store.getPresentState();
        //     expect(s2.graph.edgesData.e1.active).toBe(false);
        // })

        // it('tests global time conditions', () => {
        //     s1.graph.edgesData.e1.active = true;
        //     s1.graph.conditions['c0'].scope = 'necessary';
        //     s1.graph.conditions['c0'].expression = "state.simulation.time === 'a'";
        //     store.actions.graph.simulate();            
        //     let s2 = store.getPresentState();
        //     expect(s2.graph.edgesData.e1.active).toBe(false);
        // })
    });


});