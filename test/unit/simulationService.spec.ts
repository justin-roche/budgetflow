import { Store } from './../../src/services/reduxStore';
import { undoableGraphReducer, graphActions } from '../../src/reducers/graphReducer';
import { state } from '../../src/state'
import { createStore } from 'redux';
import { createTestStore } from './test.utilities';
import * as Jasmine from 'jasmine';

import { _ } from 'underscore';

describe('simulation actions 2', () => {

    let store;
    let s1: Graph;

    beforeEach(() => {

    });

    describe('simulation service', () => {
        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === '1 node').pop());
            s1 = store.getPresentState().graph;
        });

        describe('traverses the graph',() => {

            it('updates values', ()=> {
                expect(s1.nodesData['n0'].value).toBe(0);
                store.actions.graph.incrementTargetTime();
                store.actions.graph.simulate();
                let s2 = store.getPresentState().graph;
                expect(s2.nodesData['n0'].value).toBe(1);
            })

            it('traverses mutliple cycles', ()=> {
                expect(s1.nodesData['n0'].value).toBe(0);
                store.actions.graph.setTargetTime(s1.simulation.currentTime+(s1.simulation.cycleTime*3));
                store.actions.graph.simulate();
                let s2 = store.getPresentState().graph;
                expect(s2.nodesData['n0'].value).toBe(3);
            })

            // it('traverses the graph', ()=> {
            //     spyOn(store.actions.graph, 'traverse');
            //     store.actions.simulation.incrementTargetTime();
            //     expect(store.actions.graph.traverse).toHaveBeenCalledTimes(1);
            // })

            // it('updates the simulation',()=>{
            //     spyOn(store.actions.simulation, 'updateCurrentTime');
            //     store.actions.simulation.incrementTargetTime().getPresentState();
            //     expect(store.actions.simulation.updateCurrentTime).toHaveBeenCalledTimes(1);
            // })

            // it('updates the graph display properties',()=>{
            //     let l1 = s1.nodesData['n0'].displayData.label;
            //     store.actions.graph.incrementTargetTime();
            //     store.actions.graph.simulate();
            //     let s2 = store.getPresentState().graph;
            //     let l2 = s1.nodesData['n0'].displayData.label;
            //     console.log('labels', l1, l2)
            //     expect(l2).toBeDefined();
            //     expect(l2 !== l1);
            // })

            // it('applies conditions',()=>{
            //     spyOn(store.actions.graph, 'applyConditions');
            //     store.actions.simulation.incrementTargetTime();
            //     expect(store.actions.graph.applyConditions).toHaveBeenCalledTimes(1);
            // })

        })

        describe('simulates multiple forward cycles',() => {
            // beforeEach(() => {
            //     store.actions.simulation.toggleOn();
            //     s1 = store.getPresentState();
            // });

            // it('calls traverse multiple times', () => {
            //     let x = spyOn(ss, 'simulate');
               
            //     store.actions.simulation.incrementTargetTime();
            //     store.actions.simulation.incrementTargetTime();
            //     expect(x).toHaveBeenCalledTimes(2);
            // })



        })

        describe('reverts a single cycle',() => {

            // it('reverts', ()=> {
            //     let x = spyOn(ss, 'simulateForward');
            //     let y = spyOn(ss, 'simulateBackward')
            //     store.actions.simulation.incrementTargetTime();
            //     store.actions.simulation.decrementTargetTime();
            //     expect(x).toHaveBeenCalledTimes(1);
            //     expect(y).toHaveBeenCalledTimes(1);
            // })
            
        })

        it('reverts multiple cycles',() => {
            
        })



    });

});