import { inject, bindable } from 'aurelia-framework';

@inject()
export class GraphsController {

    childSettings = [];

    constructor() {
        console.log('graphs controller')
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