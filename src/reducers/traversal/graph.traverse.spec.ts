import { Store } from './../../services/reduxStore';
import { undoableGraphReducer, graphActions } from './../../reducers/graphReducer';
import { state } from './../../state/state'
import { createStore } from 'redux';
import { createTestStore } from 'services/testUtilities';
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
            store.actions.graph.incrementTargetTime();
        });

        it('sanity', () => {
            expect(true).toBe(true);
        })

        it('graph traversal does not mutate original state', () => {
            let original = JSON.stringify(s1);
            store.actions.graph.simulate();
            expect(original === JSON.stringify(s1)).toBe(true);
        })

        it('applies step function to a single node', () => {
            s1.graph.nodesData['n0'].value = 0;
            store.actions.graph.simulate();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(1);
        });

        it('applies step function multiple times to a single node', () => {
            store.actions.graph.simulate();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(1);
            store.actions.graph.incrementTargetTime();
            store.actions.graph.simulate();
            s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(2);
            store.actions.graph.incrementTargetTime();
            store.actions.graph.simulate();
            s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(3);
        });

        it('applies node function arguments', () => {
            //let fd = s1.graph.nodesData['n0'].nodeFunctions.filter(fd => fd.name === 'add')[0];
            s1.graph.nodeFunctions.f1 = { object: { value: 2 }, operator: {value: '+'} };
            store.actions.graph.simulate();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(2);
        });

        it('graph traverse creates new objects along slice', () => {

            store.actions.graph.simulate();
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
            store.actions.graph.incrementTargetTime();
        });

        it('does not mutate original state', () => {
            let original = JSON.stringify(s1);
            store.actions.graph.simulate();
            expect(original === JSON.stringify(s1)).toBe(true);
        })

        it('graph traverse applies link function', () => {
            let s1 = store.getPresentState();
            store.actions.graph.simulate();
            let s2 = store.getPresentState();

            expect(s2.graph.nodesData['n0'].value).toBe(9);
            expect(s2.graph.nodesData['n1'].value).toBe(1);
        });

    });

    describe('inactive node behavior', () => {

        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === '1 node').pop());
            s1 = store.getPresentState();
            s1.graph.nodesData.n0.active = false;
            store.actions.graph.incrementTargetTime();
        })

        it('does not apply step function on inactive nodes', () => {
            let v = s1.graph.nodesData['n0'].value;
            store.actions.graph.simulate();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(v);
        });

    });

    describe('inactive node behavior', () => {

        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'twoNodes').pop());
            s1 = store.getPresentState();

            expect(s1.graph.edgesData.e0.active).toBe(true);
            s1.graph.nodesData.n1.active = false;
            store.actions.graph.incrementTargetTime();
        })

        it('does not apply link function on inactive nodes', () => {
            let v = s1.graph.nodesData['n0'].value;
            store.actions.graph.simulate();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n0'].value).toBe(v);
        });

    });

    describe('inactive link behavior', () => {

        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'conditional').pop());
            s1 = store.getPresentState();
            store.actions.graph.incrementTargetTime();
        });

        it('does not apply on inactive links', () => {
            let v = s1.graph.nodesData['n2'].value;
            s1.graph.edgesData.e1.active = false;
            store.actions.graph.simulate();
            let s2 = store.getPresentState();
            expect(s2.graph.nodesData['n2'].value).toBe(v);
        });

    });

    describe('three level tree', () => {

        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'tree').pop());
            s1 = store.getPresentState();
            store.actions.graph.incrementTargetTime();
        });

        it('does not mutate original state', () => {
            let _s = store.getPresentState()
            let _sString = JSON.stringify(_s);
            store.actions.graph.simulate();        
            expect(_sString === JSON.stringify(_s)).toBe(true);
        })

        it('applies link function to all active links', () => {
            store.actions.graph.simulate();
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
                nodeData.nodeFunctions = ['f3'];
                //nodeData.linkFunctions = ['f1'];
                // 
            });
            s1.graph.nodeFunctions = Object.assign(s1.graph.nodeFunctions,
                { 'f3': { operator: {value: '+'}, object: { value: 1 } } });
            store.actions.graph.simulate();
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
            store.actions.graph.simulate();
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

    describe('handles cycles', () => {

        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'cycle').pop());
            s1 = store.getPresentState();
            store.actions.graph.incrementTargetTime();
        });

        it('does not traverse the same node twice', () => {
            
        });

    });

});



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

