import { graphReducer } from '../../src/reducers/graphReducer';
import { state } from '../mock-data/state'

fdescribe('graph reducer', () => {
    let g;

    describe('step function', () => {
        beforeEach(() => {
            g = state.graphs.filter(graph => graph.id === 'g1')[0];
            // console.log(g);
            expect(g.nodesData['n1'].value).toBe(0);
        });

        it('applies step function to a single node', () => {
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2);
            expect(s2.nodesData['n1'].value).toBe(1);
        });

        it('applies step function multiple times to a single node', () => {
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2.nodesData['n1'].value).toBe(1);
            s2 = graphReducer(s2, { type: 'BREADTH_TRAVERSE' });
            expect(s2.nodesData['n1'].value).toBe(2);
            s2 = graphReducer(s2, { type: 'BREADTH_TRAVERSE' });
            expect(s2.nodesData['n1'].value).toBe(3);
        });

        it('applies step function arguments', () => {
            let fd = g.nodesData['n1'].stepFunctions.filter(fd => fd.name === 'increment')[0];
            fd.arguments = [2];
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2.nodesData['n1'].value).toBe(2);
        });

        it('graph traverse on step function is pure on slice', () => {
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2 !== g);
            expect(s2.nodesData !== g.nodesData);
            expect(s2.nodesData['n1'] !== g.nodesData['n1']);

            expect(s2.edgesData === g.edgesData);
            expect(s2.nodes === g.nodes);
            expect(s2.edges === g.edges);
            expect(s2.data === g.data);
        });

    });

    describe('link function', () => {

        beforeAll(() => {
            g = state.graphs.filter(graph => graph.id === 'g2')[0];
            expect(g.nodesData['n1'].value).toBe(1);
        });

        it('graph traverse applies link function', () => {
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2.nodesData['n1'].value).toBe(0);
            expect(s2.nodesData['n2'].value).toBe(1);
        });

    });

    describe('three level tree', () => {

        beforeAll(() => {
            g = state.graphs.filter(graph => graph.id === 'g6')[0];
            expect(g.nodesData['n0'].value).toBe(50);
        });

        it('applies link function to all nodes',()=>{
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });            
            expect(s2.nodesData['n0'].value).toBe(44);
            expect(s2.nodesData['n1'].value).toBe(1);
            expect(s2.nodesData['n2'].value).toBe(1);
            expect(s2.nodesData['n3'].value).toBe(1);
            expect(s2.nodesData['n4'].value).toBe(1);
            expect(s2.nodesData['n5'].value).toBe(1);
            expect(s2.nodesData['n6'].value).toBe(1);
        });

        fit('applies step function to all nodes',()=>{
            g.nodesData = g.nodesData.map(nd => {
                return {...nd, stepFunctions: [{name: 'increment', arguments: [1]}]}
            })
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });            
            expect(s2.nodesData['n0'].value).toBe(45);
            expect(s2.nodesData['n1'].value).toBe(2);
            expect(s2.nodesData['n2'].value).toBe(2);
            expect(s2.nodesData['n3'].value).toBe(2);
            expect(s2.nodesData['n4'].value).toBe(2);
            expect(s2.nodesData['n5'].value).toBe(2);
            expect(s2.nodesData['n6'].value).toBe(2);
        });

        fit('tree traversal is pure',()=>{
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2 !== g);
            expect(s2.nodesData !== g.nodesData);
            expect(s2.nodesData['n1'] !== g.nodesData['n1']);

            expect(s2.edgesData === g.edgesData);
            expect(s2.nodes === g.nodes);
            expect(s2.edges === g.edges);
            expect(s2.data === g.data);
        });


    })


});