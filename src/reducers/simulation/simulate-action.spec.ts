import { Store } from './../../services/reduxStore';
import { undoableGraphReducer, graphActions } from './../../reducers/graphReducer';
import { state } from './../../state/state'
import { createStore } from 'redux';
import { createTestStore } from 'services/testUtilities';
import { _ } from 'underscore';
import * as Jasmine from 'jasmine';

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
            //     let fn = jest.spyOn(store.actions.graph, 'applyConditions');
            //     store.actions.graph.incrementTargetTime();
            //     store.actions.graph.simulate();
            //     expect(fn).toHaveBeenCalled();
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

describe('cycles', () => {

    // beforeEach(() => {
    //     g = state.graphs.filter(graph => graph.data.name === '1 node')[0];
    //     expect(g.nodesData['n0'].value).toBe(0);
    //     tree = state.graphs.filter(graph => graph.data.name === '1-2-3')[0];
    // });

    // it('does not mutate original state', ()=> {
    //     let originalg = JSON.stringify(g);
    //     let s2 = graphReducer(g, graphActions.graphTraverseCycles(100));
    //     let unmutatedG = JSON.stringify(g);            
    //     expect(originalg === unmutatedG).toBe(true);

    //     originalg = JSON.stringify(tree);
    //     s2 = graphReducer(g, graphActions.graphTraverseCycles(100));
    //     unmutatedG = JSON.stringify(tree);            
    //     expect(originalg === unmutatedG).toBe(true);
    // })

    // it('runs multiple cycles on 1 node with increment', () => {
    //     let s2 = graphReducer(g, graphActions.graphTraverseCycles(100));
    //     expect(s2.nodesData['n0'].value === 100).toBe(true);
    // });

    // it('runs multiple cycles on tree', () => {
    //     let s2 = graphReducer(tree, graphActions.graphTraverseCycles(100));
    //     expect(s2.nodesData['n0'].value).toBe(-550);
    //     expect(s2.nodesData['n2'].value).toBe(100);
    //     expect(s2.nodesData['n3'].value).toBe(100);
    //     expect(s2.nodesData['n5'].value).toBe(100);
    //     expect(s2.nodesData['n6'].value).toBe(100);
    // });

    // it('performance of cycles on single node', () => {
    //     let s2 = graphReducer(g, graphActions.graphTraverseCycles(100000));
    //     expect(s2.nodesData['n0'].value === 100000).toBe(true);
    // }, 1750)

    // it('performance on tree', () => {
    //     let s2 = graphReducer(tree, graphActions.graphTraverseCycles(100000));
    //      expect(s2.nodesData['n3'].value).toBe(100000);
    //      expect(s2.nodesData['n0'].value).toBe(-599950);
    // }, 13428);

// })