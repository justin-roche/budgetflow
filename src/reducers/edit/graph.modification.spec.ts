import { Store } from './../../services/reduxStore';
import { undoableGraphReducer, graphActions } from './../../reducers/graphReducer';
import { state } from './../../state/state'
import { createStore } from 'redux';
import { createTestStore } from 'services/test.utilities';
import { _ } from 'underscore';

fdescribe('graph modification', () => {

    let store;
    let s1: AppState;

    describe('edge addition and deletion', () => {
        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'twoNodes').pop());
            s1 = store.getPresentState();
        });

        it('deletes an edge', () => {
            expect(s1.graph.edgesData['e0']).toBeDefined();
            let s2 = store.actions.graph.deleteEdge('e0').getPresentState();
            expect(s2.graph.edgesData['e0']).toBeUndefined();
        });

        it('edge deletion deletes edge references', () => {
            expect(s1.graph.nodes['n0'].outEdges.length).toBe(1);
            expect(s1.graph.nodes['n1'].inEdges.length).toBe(1);
            let s2 = store.actions.graph.deleteEdge('e0').getPresentState();
            expect(!s2.graph.edges['e0']);
            expect(s2.graph.nodes['n0'].outEdges.length).toBe(0);
            expect(s2.graph.nodes['n1'].inEdges.length).toBe(0);
        });

        it('adds an edge', () => {
            expect(s1.graph.edgesData['e0']).toBeDefined();
            let s2 = store.actions.graph.deleteEdge('e0').getPresentState();
            expect(!s2.graph.edges['e0']);
            let s3 = store.actions.graph.addEdge('n0','n1').getPresentState();
            expect(s2.graph.edges['e0']);
        });

        it('edge addition affects inNodes and outNodes', () => {
            expect(s1.graph.edgesData['e0']).toBeDefined();
            let s2 = store.actions.graph.deleteEdge('e0').getPresentState().graph;
            expect(!s2.edges['e0']);
            expect(s2.nodes['n0'].outEdges.length).toBe(0);
            expect(s2.nodes['n1'].inEdges.length).toBe(0);
            let s3 = store.actions.graph.addEdge('n0','n1').getPresentState().graph;
            expect(s3.nodes['n0'].outEdges.length).toBe(1);
            expect(s3.nodes['n1'].inEdges.length).toBe(1);
        });

    });

    describe('node addition and deletion', () => {
        beforeEach(() => {
            store = createTestStore();
            store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'twoNodes').pop());
            s1 = store.getPresentState();
        });

        it('deletes a node', () => {
            expect(s1.graph.nodesData['n1']);
            let s2 = store.actions.graph.deleteNode('n1').getPresentState();
            expect(s2.graph.nodesData['n0']).toBeDefined();
            expect(s2.graph.nodesData['n1']).toBeUndefined();;
            expect(!s2.graph.nodes['n1']);
        });

        it('node deletion deletes associated edges', () => {
            expect(s1.graph.nodesData['n1']);
            expect(s1.graph.edges['e1']);
            let s2 = store.actions.graph.deleteNode('n1').getPresentState();
            expect(!s2.graph.edges['e1']);
            expect(!s2.graph.nodes['n1']);
        });

        it('node deletion deletes associated outEdges', () => {
            // expect(true).toBe(false)
            expect(s1.graph.nodes['n0'].outEdges[0]).toBe('e0');
            let s2 = store.actions.graph.deleteNode('n1').getPresentState();
            expect(s1.graph.nodes['n0'].outEdges.indexOf('e0') == -1);
        });

        it('node deletion deletes associated inEdges', () => {
            // expect(true).toBe(false)
            // expect(s1.graph.nodes['n0'].outEdges[0]).toBe('e0');
            // let s2 = store.actions.graph.deleteNode('n1').getPresentState();            
            // expect(s1.graph.nodes['n0'].outEdges.indexOf('e0') == -1);
        });

        it('adds new nodes', () => {
            expect(!s1.graph.nodesData['n2']);
            let s2 = store.actions.graph.deleteNode('n1').getPresentState();
            expect(s2.graph.nodesData['n2']);
        })
    })

   

});

