// import { state } from '../../src/state'
// import { createStore } from 'redux';
// import { conditionsUpdate } from './../../src/reducers/graphFunctions/conditionsUpdate';
// import { conditionalGraph } from './../mock-data/conditional';

// describe('graph reducer', () => {

//     let s = state;

//     beforeEach(() => {
//         let g = state.graphs.filter(graph => graph.data.name === 'conditional')[0];
//         state.graph = conditionalGraph;
//         expect(g.nodesData['n0'].value).toBe(10);
//     })

//     it('individual links from nodes are activated when global activation conditions are met', () => {
//         expect(s.graph.nodesData.n2.active === false);
//         let s2 = conditionsUpdate(s);
//         expect(s2.graph.nodesData.n2.active === true);
//     })

// })