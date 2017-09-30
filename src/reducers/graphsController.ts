import { inject, bindable } from 'aurelia-framework';

@inject()
export class GraphsController {

    childSettings = [];

    constructor() {

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