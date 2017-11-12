import { Store } from './../../src/services/reduxStore';
import { undoableGraphReducer, graphActions } from '../../src/reducers/graphReducer';
import { state } from '../../src/state'
import { createStore } from 'redux';
import { createTestStore } from './test.utilities';

describe('graph simulation actions', () => {

    let store;
    let s1: Simulation;
    let cycleTime;

    describe('internal updates', () => {
        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'tree').pop());
            s1 = store.getPresentState().graph.simulation;
            cycleTime = s1.cycleTime;
        });

        // it('toggle on', () => {
        //     expect(s1.on).toBe(false)
        //     let s2 = store.actions.simulation.toggleOn().getPresentState().simulation;
        //     expect(s2.on).toBe(true);
        //     let s3 = store.actions.simulation.toggleOn().getPresentState().simulation;
        //     expect(s3.on).toBe(false)
        // })

        it('target time update', () => {
            let t0 = s1.targetTime;
            
            expect(t0).toBe(null);
            let t2 = s1.currentTime+cycleTime;
            let s2 = store.actions.graph.setTargetTime(t2).getPresentState().graph.simulation;
            expect(s2.forward).toBe(true);
            expect(s2.targetTime).toBe(t2);
            expect(s2.currentTime == s1.currentTime).toBe(true)
            expect(s2.remainingCycles).toBe(1);
        })

        it('increment target time', () => {
            let s2 = store.actions.graph.incrementTargetTime().getPresentState().graph.simulation;
            expect(s2.forward).toBe(true);
            expect(s2.targetTime - s2.currentTime).toBe(s2.cycleTime);
            expect(s2.currentTime == s1.currentTime).toBe(true)
            expect(s2.remainingCycles).toBe(1);
        })

        it('reset current time', () => {
            store.actions.graph.incrementTargetTime()
            let s2 = store.actions.graph.resetTime().getPresentState().graph.simulation;
            expect(s2.currentTime - s1.currentTime === s1.cycleTime).toBe(true);
            expect(s2.remainingCycles).toBe(null);
            expect(s2.forward).toBe(null);
            expect(s2.targetTime).toBe(null);
        })

    });

});