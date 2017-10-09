import { graphReducer } from '../../src/reducers/graphReducer';
import { state } from '../mock-data/state'

describe('graph reducer', () => {
    let g;
    let tree;

    describe('step function', () => {
        beforeEach(() => {
            g = state.graphs.filter(graph => graph.data.name === '1 node')[0];
            // console.log(g);
            expect(g.nodesData['n0'].value).toBe(0);
        });

        it('graph traversal does not mutate original state', ()=> {
            let originalg = JSON.stringify(g);
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            let unmutatedG = JSON.stringify(g);            
            expect(originalg === unmutatedG).toBe(true);
        })

        it('applies step function to a single node', () => {
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2);
            expect(s2.nodesData['n0'].value).toBe(1);
        });

        it('applies step function multiple times to a single node', () => {
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2.nodesData['n0'].value).toBe(1);
            s2 = graphReducer(s2, { type: 'BREADTH_TRAVERSE' });
            expect(s2.nodesData['n0'].value).toBe(2);
            s2 = graphReducer(s2, { type: 'BREADTH_TRAVERSE' });
            expect(s2.nodesData['n0'].value).toBe(3);
        });

        it('applies step function arguments', () => {
            let fd = g.nodesData['n0'].stepFunctions.filter(fd => fd.name === 'increment')[0];
            fd.arguments = [2];
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2.nodesData['n0'].value).toBe(2);

            fd.arguments = [1]; // reset
        });

        it('graph traverse creates new objects along slice', () => {
            
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2.edgesData === g.edgesData);
            expect(s2.nodes === g.nodes);
            expect(s2.edges === g.edges);
            expect(s2.data === g.data);
            
            expect(s2 !== g);
            expect(s2.nodesData !== g.nodesData);
            expect(s2.nodesData['n0'] !== g.nodesData['n0']);
   
        });

       

    });

    describe('link function', () => {

        beforeAll(() => {
            g = state.graphs.filter(graph => graph.data.name === '2 nodes')[0];
            // console.log(g)
            expect(g.nodesData['n0'].value).toBe(10);
        });

        it('does not mutate original state', ()=> {
            let originalg = JSON.stringify(g);
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            let unmutatedG = JSON.stringify(g);            
            expect(originalg === unmutatedG).toBe(true);
        })

        it('graph traverse applies link function', () => {
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2.nodesData['n0'].value).toBe(9);
            expect(s2.nodesData['n1'].value).toBe(1);
        });

    });

    describe('three level tree', () => {

        beforeAll(() => {
            g = state.graphs.filter(graph => graph.data.name === '1-2-3')[0];
            expect(g.nodesData['n0'].value).toBe(50);
        });

        it('does not mutate original state', ()=> {
            let originalg = JSON.stringify(g);
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            let unmutatedG = JSON.stringify(g);            
            expect(originalg === unmutatedG).toBe(true);
        })

        it('applies link function to all active nodes',()=>{
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });            
            expect(s2.nodesData['n0'].value).toBe(44);
            expect(s2.nodesData['n1'].value).toBe(1);
            expect(s2.nodesData['n2'].value).toBe(1);
            expect(s2.nodesData['n3'].value).toBe(1);
            expect(s2.nodesData['n4'].value).toBe(1);
            expect(s2.nodesData['n5'].value).toBe(1);
            expect(s2.nodesData['n6'].value).toBe(1);
        });

        it('does not apply link function toward inactive nodes',()=>{
            let original = JSON.stringify(g);
            g.nodesData['n1'].active = false;
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });            
            expect(s2.nodesData['n0'].value).toBe(47);
            expect(s2.nodesData['n1'].value).toBe(0);
            g.nodesData['n1'].active = true;
            expect(original === JSON.stringify(g)).toBe(true);
        });

        it('does not apply link function from inactive nodes',()=>{
            let original = JSON.stringify(g);

            g.nodesData['n1'].active = false;
            g.nodesData['n2'].active = false;
            g.nodesData['n3'].active = false;
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });     

            expect(s2.nodesData['n0'].value).toBe(47);
            expect(s2.nodesData['n3'].value).toBe(0);
            expect(s2.nodesData['n2'].value).toBe(0);

            g.nodesData['n1'].active = true;
            g.nodesData['n2'].active = true;
            g.nodesData['n3'].active = true;
            
            g = JSON.parse(original);
        });

        it('applies step function to all nodes',()=>{
            let ond = JSON.stringify(g.nodesData);
            for(let nd in g.nodesData) {
                g.nodesData[nd] = {...g.nodesData[nd], stepFunctions: [{name: 'increment', arguments: [1]}]}
            }
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });            
            expect(s2.nodesData['n0'].value).toBe(45);
            expect(s2.nodesData['n1'].value).toBe(2);
            expect(s2.nodesData['n2'].value).toBe(2);
            expect(s2.nodesData['n3'].value).toBe(2);
            expect(s2.nodesData['n4'].value).toBe(2);
            expect(s2.nodesData['n5'].value).toBe(2);
            expect(s2.nodesData['n6'].value).toBe(2);

            g.nodesData = JSON.parse(ond); // reset
        });

        it('creates new objects along slice',()=>{
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

    describe('conditional behavior', () => {
        beforeEach(() => {
            g = state.graphs.filter(graph => graph.data.name === 'conditional')[0];
            expect(g.nodesData['n0'].value).toBe(10);
        });

        it('nodes are activated with activation conditions',()=>{
            expect(g.nodesData.n2.active === false);
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s2.nodesData.active === false);
            let s3 = graphReducer(g, { type: 'BREADTH_TRAVERSE' });
            expect(s3.nodesData.active === true);
        });
        
    })

    describe('cycles', () => {

        beforeEach(() => {
            g = state.graphs.filter(graph => graph.data.name === '1 node')[0];
            expect(g.nodesData['n0'].value).toBe(0);
            tree = state.graphs.filter(graph => graph.data.name === '1-2-3')[0];
        });

        it('does not mutate original state', ()=> {
            let originalg = JSON.stringify(g);
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE', payload: {cycles: 100} });
            let unmutatedG = JSON.stringify(g);            
            expect(originalg === unmutatedG).toBe(true);

            originalg = JSON.stringify(tree);
            s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE', payload: {cycles: 100} });
            unmutatedG = JSON.stringify(tree);            
            expect(originalg === unmutatedG).toBe(true);
        })

        it('runs multiple cycles on 1 node with increment', () => {
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE', payload: {cycles: 100} });
            console.log(s2.nodesData['n0'].value);
            expect(s2.nodesData['n0'].value === 100).toBe(true);
        });

        it('runs multiple cycles on tree', () => {
            let s2 = graphReducer(tree, { type: 'BREADTH_TRAVERSE', payload: {cycles: 100} });
            console.log(s2.nodesData['n0'].value)
            expect(s2.nodesData['n0'].value).toBe(-550);
            expect(s2.nodesData['n2'].value).toBe(100);
            expect(s2.nodesData['n3'].value).toBe(100);
            expect(s2.nodesData['n5'].value).toBe(100);
            expect(s2.nodesData['n6'].value).toBe(100);
        });

        it('performance of cycles on single node', () => {
            let s2 = graphReducer(g, { type: 'BREADTH_TRAVERSE', payload: {cycles: 100000} });
            console.log(s2.nodesData['n0'].value);
            expect(s2.nodesData['n0'].value === 100000).toBe(true);
        }, 1750)

        it('performance on tree', () => {
            let s2 = graphReducer(tree, { type: 'BREADTH_TRAVERSE', payload: {cycles: 100000} });
             expect(s2.nodesData['n3'].value).toBe(100000);
             expect(s2.nodesData['n0'].value).toBe(-599950);
        }, 13428);

    });


});