import { NodeFunctions } from './../../src/graph/stepFunctions';
import { GraphService } from './../../src/graph/graphService';
import { simple } from './../mock-data/graphs';

window['sigma'] = require('sigma');
// console.log(window['sigma'])
// require('sigma/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js');
// require('sigma/plugins/sigma.layout.forceAtlas2/worker.js')
// require('sigma/plugins/sigma.layout.forceAtlas2/supervisor.js')

describe('the Child Router module', () => {
    let gg, nf, gs, sigma;


    beforeAll(() => {
        nf = new NodeFunctions();
        gs = new GraphService(nf);
        sigma = window['sigma'];
    });

    it('applies methods to Sigma class', () => {
        //expect(sigma.classes.graph.breadthTraverse).toBeDefined();
    });

    it('creates new sigma instances', () => {
        let si = gs.getSigmaInstance(simple);
        expect(si).toBeDefined();
        expect(si.graph.nodes().length).toBe(3)
    });

});