import { Store } from './../../src/services/reduxStore';
import { undoableGraphReducer, graphActions } from '../../src/reducers/graphReducer';
import { state } from '../../src/state'
import { createStore } from 'redux';
import { createTestStore } from './test.utilities';
import { SimulationService } from './../../src/services/simulationService';
import * as Jasmine from 'jasmine';

import { _ } from 'underscore';

describe('simulation service', () => {

    let store;
    let s1: AppState;
    let ss: SimulationService;

    beforeEach(() => {

    });

    describe('simulation service', () => {
        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === '1 node').pop());
            store.actions.simulation.toggleOn();
            s1 = store.getPresentState();
            ss = new SimulationService(store);
        });

        it('exists',() => {
            expect(ss).toBeDefined();
        })

        describe('simulates a single forward cycle',() => {

            it('simulates when targetTime changes and simulation is on', ()=> {
                spyOn(ss, 'simulateForward');
                spyOn(ss, 'simulateBackward');
                store.actions.simulation.incrementTargetTime();
                expect(ss.simulateForward).toHaveBeenCalledTimes(1);
                expect(ss.simulateBackward).toHaveBeenCalledTimes(0);
            })

            it('traverses the graph', ()=> {
                spyOn(store.actions.graph, 'traverse');
                store.actions.simulation.incrementTargetTime();
                expect(store.actions.graph.traverse).toHaveBeenCalledTimes(1);
            })

            it('updates the simulation',()=>{
                spyOn(store.actions.simulation, 'updateCurrentTime');
                store.actions.simulation.incrementTargetTime().getPresentState();
                expect(store.actions.simulation.updateCurrentTime).toHaveBeenCalledTimes(1);
            })

            it('updates the graph display properties',()=>{
                spyOn(store.actions.graph, 'applyDisplayFunctions');
                store.actions.simulation.incrementTargetTime();
                expect(store.actions.graph.applyDisplayFunctions).toHaveBeenCalledTimes(1);
            })

            it('applies conditions',()=>{
                spyOn(store.actions.graph, 'applyConditions');
                store.actions.simulation.incrementTargetTime();
                expect(store.actions.graph.applyConditions).toHaveBeenCalledTimes(1);
            })

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

            it('reverts', ()=> {
                let x = spyOn(ss, 'simulateForward');
                let y = spyOn(ss, 'simulateBackward')
                store.actions.simulation.incrementTargetTime();
                store.actions.simulation.decrementTargetTime();
                expect(x).toHaveBeenCalledTimes(1);
                expect(y).toHaveBeenCalledTimes(1);
            })
            
        })

        it('reverts multiple cycles',() => {
            
        })



    });

});