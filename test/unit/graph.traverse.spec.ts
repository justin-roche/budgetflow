import { Store } from './../../src/services/reduxStore';
import { undoableGraphReducer, graphActions } from '../../src/reducers/graphReducer';
import { state } from '../../src/state'
import { createStore } from 'redux';
import { createTestStore } from './test.utilities';
import { _ } from 'underscore';

describe('graph reducer', () => {

    let store;
    let s1: AppState;

    beforeEach(() => {

    });

    describe('step function', () => {
        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === '1 node').pop());
            s1 = store.getPresentState();
        });

        it('sanity', () => {
            expect(true).toBe(true);
        })

        it('graph traversal does not mutate original state', () => {
            let original = JSON.stringify(s1);
            store.actions.graph.conditionsUpdate();
            expect(original === JSON.stringify(s1)).toBe(true);
        })

        it('applies step function to a single node', () => {
            s1.graph.nodesData['n0'].value = 0;
            store.actions.graph.traverse();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(1);
        });

        it('applies step function multiple times to a single node', () => {
            store.actions.graph.traverse();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(1);
            store.actions.graph.traverse();
            s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(2);
            store.actions.graph.traverse();
            s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(3);
        });

        it('applies step function arguments', () => {
            let fd = s1.graph.nodesData['n0'].stepFunctions.filter(fd => fd.name === 'increment')[0];
            fd.arguments = [2];
            store.actions.graph.traverse();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(2);
        });

        it('graph traverse creates new objects along slice', () => {

            store.actions.graph.traverse();
            let s2 = store.getPresentState();
            expect(s2.graph.nodes === s1.graph.nodes);
            expect(s2.graph.edges === s1.graph.edges);
            expect(s2.graph.data === s1.graph.data);

            expect(s2 !== s1);
            expect(s2.graph.nodesData !== s1.graph.nodesData);
            expect(s2.graph.edgesData !== s1.graph.edgesData);
            expect(s2.graph.nodesData['n0'] !== s1.graph.nodesData['n0']);

        });

    });

    describe('link function', () => {

        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'twoNodes').pop());
            s1 = store.getPresentState();
        });

        it('does not mutate original state', () => {
            let original = JSON.stringify(s1);
            store.actions.graph.traverse();
            expect(original === JSON.stringify(s1)).toBe(true);
        })

        it('graph traverse applies link function', () => {
            store.actions.graph.traverse();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(9);
            expect(s2.graph.nodesData['n1'].value).toBe(1);
        });

    });

    describe('three level tree', () => {

        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'tree').pop());
            s1 = store.getPresentState();
        });

        //     it('does not mutate original state', ()=> {
        //         let originalg = JSON.stringify(g);
        //         let s2 = graphReducer(g, graphActions.graphTraverseCycles());
        //         let unmutatedG = JSON.stringify(g);            
        //         expect(originalg === unmutatedG).toBe(true);
        //     })

        it('applies link function to all active links', () => {
            store.actions.graph.traverse();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(44);
            expect(s2.graph.nodesData['n1'].value).toBe(1);
            expect(s2.graph.nodesData['n2'].value).toBe(1);
            expect(s2.graph.nodesData['n3'].value).toBe(1);
            expect(s2.graph.nodesData['n4'].value).toBe(1);
            expect(s2.graph.nodesData['n5'].value).toBe(1);
            expect(s2.graph.nodesData['n6'].value).toBe(1);
        });

        it('applies step function to all nodes', () => {
            _.each(s1.graph.nodesData, function (nodeData) {
                nodeData.stepFunctions = [{ name: 'increment', arguments: [1] }]
            });
            store.actions.graph.traverse();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(45);
            expect(s2.graph.nodesData['n1'].value).toBe(2);
            expect(s2.graph.nodesData['n2'].value).toBe(2);
            expect(s2.graph.nodesData['n3'].value).toBe(2);
            expect(s2.graph.nodesData['n4'].value).toBe(2);
            expect(s2.graph.nodesData['n5'].value).toBe(2);
            expect(s2.graph.nodesData['n6'].value).toBe(2);
        });

        it('creates new objects along slice', () => {
            store.actions.graph.traverse();
            let s2 = store.getPresentState();

            expect(s2.graph.nodes === s1.graph.nodes);
            expect(s2.graph.edges === s1.graph.edges);
            expect(s2.graph.data === s1.graph.data);

            expect(s2 !== s1);
            expect(s2.graph.nodesData !== s1.graph.nodesData);
            expect(s2.graph.edgesData !== s1.graph.edgesData);
            expect(s2.graph.nodesData['n0'] !== s1.graph.nodesData['n0']);
        });

    })

    describe('conditional behavior', () => {
        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'conditional').pop());
            s1 = store.getPresentState();
        });

        describe('inactive links', () => {

            it('does not apply on inactive links', () => {
                let v = s1.graph.nodesData['n2'].value;
                store.actions.graph.traverse();
                let s2 = store.getPresentState();
                expect(s2.graph.nodesData['n2'].value).toBe(v);
            });





        });

        // describe('cycles', () => {

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

    });


});

 // })

   //DISPLAY UPDATE


// it('marks nodes with no active links as inactive', ()=>{
            //     let s2 = graphReducer(g, graphActions.graphTraverseCycles());
            //     expect(s2.nodesData['n2'].displayData.active).toBe(false);
            // });








    //     describe('self activation conditions',() => {

    //         it('individual links from nodes are activated when self activation conditions are met', () => {

    //         })

    //         it('links to nodes are activated when self activation conditions are met', () => {

    //         })

    //         it('individual links to nodes are activated when self activation conditions are met', () => {

    //         })

    //     });

    //     describe('conditional behavior affecting distant nodes', ()=> {

    //     })



    // })

    // describe('function limits prevent output', () => {


    //     it('links do not run if limit condition is met', ()=> {

    //     })
    // })



    // describe('multiple source scenarios', ()=> {
    //     beforeEach(() => {
    //         g = state.graphs.filter(graph => graph.data.name === '2 sources 1 sink')[0];
    //     });

    //     it('runs a link function on both sources', ()=>{
    //         let s2 = graphReducer(g, graphActions.graphTraverseCycles(10));
    //         expect(s2.nodesData['n0'].value).toBe(0);
    //         expect(s2.nodesData['n2'].value).toBe(0);
    //         expect(s2.nodesData['n1'].value).toBe(20);
    //     });
    // })

