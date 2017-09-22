import { GraphService } from './graphService';
import { GraphGenerator } from './graphGenerator';
import { inject, bindable } from 'aurelia-framework';
import {simple} from './../../test/mock-data/graphs';

@inject(GraphService)
export class GraphsController {

    childSettings = [];
    sigma = window['sigma'];

    constructor(private gs: GraphService) {

    }

    attached() {
        this.createGraphs();
    }

    createGraphs() {
        // let inst = this.gs.getSigmaInstance(simple);

        // this.childSettings.push(
        //     {
        //         sigmaInstance: inst,
        //         name: 'A',            }
        // );

        // console.log('child settings', this.childSettings);
    }

    

    
}