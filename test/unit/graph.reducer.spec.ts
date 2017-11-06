import { graphReducer, graphActions } from '../../src/reducers/graphReducer';
import { state } from '../../src/state'

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
            let s2 = graphReducer(g, graphActions.graphTraverseCycles());
            let unmutatedG = JSON.stringify(g);            
            expect(originalg === unmutatedG).toBe(true);
        })

        it('applies step function to a single node', () => {
            let s2 = graphReducer(g, graphActions.graphTraverseCycles());
            expect(s2);
            expect(s2.nodesData['n0'].value).toBe(1);
        });

        it('applies step function multiple times to a single node', () => {
            let s2 = graphReducer(g, graphActions.graphTraverseCycles());
            expect(s2.nodesData['n0'].value).toBe(1);
            s2 = graphReducer(s2, graphActions.graphTraverseCycles());
            expect(s2.nodesData['n0'].value).toBe(2);
            s2 = graphReducer(s2, graphActions.graphTraverseCycles());
            expect(s2.nodesData['n0'].value).toBe(3);
        });

        it('applies step function arguments', () => {
            let fd = g.nodesData['n0'].stepFunctions.filter(fd => fd.name === 'increment')[0];
            fd.arguments = [2];
            let s2 = graphReducer(g, graphActions.graphTraverseCycles());
            expect(s2.nodesData['n0'].value).toBe(2);

            fd.arguments = [1]; // reset
        });

        it('graph traverse creates new objects along slice', () => {
            
            let s2 = graphReducer(g, graphActions.graphTraverseCycles());
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
            let s2 = graphReducer(g, graphActions.graphTraverseCycles());
            let unmutatedG = JSON.stringify(g);            
            expect(originalg === unmutatedG).toBe(true);
        })

        it('graph traverse applies link function', () => {
            let s2 = graphReducer(g, graphActions.graphTraverseCycles());
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
            let s2 = graphReducer(g, graphActions.graphTraverseCycles());
            let unmutatedG = JSON.stringify(g);            
            expect(originalg === unmutatedG).toBe(true);
        })

        it('applies link function to all active nodes',()=>{
            let s2 = graphReducer(g, graphActions.graphTraverseCycles());            
            expect(s2.nodesData['n0'].value).toBe(44);
            expect(s2.nodesData['n1'].value).toBe(1);
            expect(s2.nodesData['n2'].value).toBe(1);
            expect(s2.nodesData['n3'].value).toBe(1);
            expect(s2.nodesData['n4'].value).toBe(1);
            expect(s2.nodesData['n5'].value).toBe(1);
            expect(s2.nodesData['n6'].value).toBe(1);
        });

        it('applies step function to all nodes',()=>{
            let ond = JSON.stringify(g.nodesData);
            for(let nd in g.nodesData) {
                g.nodesData[nd] = {...g.nodesData[nd], stepFunctions: [{name: 'increment', arguments: [1]}]}
            }
            let s2 = graphReducer(g, graphActions.graphTraverseCycles());            
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
            let s2 = graphReducer(g, graphActions.graphTraverseCycles());
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

        describe('inactive links', ()=>{

            it('does not apply on inactive links', ()=>{
                let v = g.nodesData['n2'].value;
                let s2 = graphReducer(g, graphActions.graphTraverseCycles());
                expect(s2.nodesData['n2'].value).toBe(v);
            });

            it('marks nodes with no active links as inactive', ()=>{
                let s2 = graphReducer(g, graphActions.graphTraverseCycles());
                expect(s2.nodesData['n2'].displayData.active).toBe(false);
            });

        });

        describe('pretraversal responds to global activation conditions',() => {
    
            it('individual links from nodes are activated when global activation conditions are met', () => {
                expect(g.nodesData.n2.active === false);
                let s2 = graphReducer(g, graphActions.preTraverse(state.simulation));
                expect(g.nodesData.n2.active === true);
            })

        });

        describe('self activation conditions',() => {
    
            it('individual links from nodes are activated when self activation conditions are met', () => {
    
            })
    
            it('links to nodes are activated when self activation conditions are met', () => {
                
            })
    
            it('individual links to nodes are activated when self activation conditions are met', () => {
                
            })

        });

        describe('conditional behavior affecting distant nodes', ()=> {

        })

        
        
    })

    describe('function limits prevent output', () => {
        
        
        it('links do not run if limit condition is met', ()=> {

        })
    })

    describe('cycles', () => {

        beforeEach(() => {
            g = state.graphs.filter(graph => graph.data.name === '1 node')[0];
            expect(g.nodesData['n0'].value).toBe(0);
            tree = state.graphs.filter(graph => graph.data.name === '1-2-3')[0];
        });

        it('does not mutate original state', ()=> {
            let originalg = JSON.stringify(g);
            let s2 = graphReducer(g, graphActions.graphTraverseCycles(100));
            let unmutatedG = JSON.stringify(g);            
            expect(originalg === unmutatedG).toBe(true);

            originalg = JSON.stringify(tree);
            s2 = graphReducer(g, graphActions.graphTraverseCycles(100));
            unmutatedG = JSON.stringify(tree);            
            expect(originalg === unmutatedG).toBe(true);
        })

        it('runs multiple cycles on 1 node with increment', () => {
            let s2 = graphReducer(g, graphActions.graphTraverseCycles(100));
            expect(s2.nodesData['n0'].value === 100).toBe(true);
        });

        it('runs multiple cycles on tree', () => {
            let s2 = graphReducer(tree, graphActions.graphTraverseCycles(100));
            expect(s2.nodesData['n0'].value).toBe(-550);
            expect(s2.nodesData['n2'].value).toBe(100);
            expect(s2.nodesData['n3'].value).toBe(100);
            expect(s2.nodesData['n5'].value).toBe(100);
            expect(s2.nodesData['n6'].value).toBe(100);
        });

        it('performance of cycles on single node', () => {
            let s2 = graphReducer(g, graphActions.graphTraverseCycles(100000));
            expect(s2.nodesData['n0'].value === 100000).toBe(true);
        }, 1750)

        it('performance on tree', () => {
            let s2 = graphReducer(tree, graphActions.graphTraverseCycles(100000));
             expect(s2.nodesData['n3'].value).toBe(100000);
             expect(s2.nodesData['n0'].value).toBe(-599950);
        }, 13428);

    });

    describe('multiple source scenarios', ()=> {
        beforeEach(() => {
            g = state.graphs.filter(graph => graph.data.name === '2 sources 1 sink')[0];
        });

        it('runs a link function on both sources', ()=>{
            let s2 = graphReducer(g, graphActions.graphTraverseCycles(10));
            expect(s2.nodesData['n0'].value).toBe(0);
            expect(s2.nodesData['n2'].value).toBe(0);
            expect(s2.nodesData['n1'].value).toBe(20);
        });
    })

    describe('node addition and deletion', () => {
        beforeEach(() => {
            g = state.graphs.filter(graph => graph.data.name === '2 nodes')[0];
        });

        it('deletes a node', ()=>{
            expect(g.nodesData['n1']);
            let s2 = graphReducer(g, graphActions.deleteNode('n1'));
            expect(!s2.nodesData['n1']);
            expect(!s2.nodes['n1']);
        });

        it('node deletion deletes associated edges', ()=>{
            expect(g.nodesData['n1']);
            expect(g.edges['e1']);
            let s2 = graphReducer(g, graphActions.deleteNode('n1'));
            expect(!s2.edges['e1']);
            expect(!s2.nodes['n1']);
        });

        it('adds new nodes', () => {
            expect(!g.nodesData['n2']);
            let s2 = graphReducer(g, graphActions.addNode());
            expect(s2.nodesData['n2']);
        })
    })


});