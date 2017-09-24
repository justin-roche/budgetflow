import { SimulationFunctions } from './simulationFunctions';
import { GraphService } from './../services/graphService';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store, select } from 'aurelia-redux-plugin';

@inject(Store, SimulationFunctions, GraphService)
export class Simulator {
    // @select('graph', {subscribe: true})

    // sigma = window['sigma'];

    dragging = false;
    containerRef;

    sigmaInstance;

    sigmaSettings;
    settings;

    graph;
    simulation;

    g;

    constructor(private store: Store<any>, private sf: SimulationFunctions, private gs: GraphService) {
        // // select('ui.simulation.time', { subscribe: true })(this, 'simulationTime');
        // this.sigmaInstance = gs.sigmaInstance;
        // console.log('created sim with instance', this.sigmaInstance)
        // gs.sigmaEvents.subscribe(e => {
        //     if(e.type === 'initialize') {
        //         this.initialize();
        //     }
        // })
    }

    initialize() { // initialize description-dependent derived properties
        this.sigmaInstance.graph.iterationTraverse((node) => {
            this.runDisplayUpdateFunction(node);
            return true;
        });
        console.log('sim export: initial')
    }

    simulationTimeChanged(current, last) {
        if (current && current !== last) {
            console.log('sim time changed', current, last)
            this.applySimulation(current);
        }
    }

    applySimulation(time) {
        let numberOfCycles = this.convertTimeToCycles(time);
        for (let c = 0; c < numberOfCycles; c++) {
            this.sigmaInstance.graph.breadthTraverse(this.simulateNode.bind(this)); //;
        }
        this.graph.data.currentStep = numberOfCycles;
        // console.log('sim export: simulated')
    }

    // setStart() {
    //     console.log(this.graph.nodes());
    // }

    convertTimeToCycles(time) {
        return time;
    }

    simulateNode(source, target) {
        this.runLinkFunction(source, target);
        this.runStepFunction(target);
        this.runDisplayUpdateFunction(target);
        if (target.data.active) {
            return true;
        }
    }

    runLinkFunction(source, target) {
        // let edge = this.sigmaInstance.graph.getEdgeById('e' + source.id + target.id);
        // this.sf.linkFunctions[edge.data.linkFunction](source, target, 1);
    }

    runStepFunction(target) {
        target.data.stepFunctions.forEach(fnObj => {
            this.sf.stepFunctions[fnObj.name](target, fnObj.argument);
        });
    }

    runDisplayUpdateFunction(target) {
        target.data.displayFunctions.forEach(fnName => {
            this.sf.displayFunctions[fnName](target);
        });

        this.graph.data.displayFunctions.nodes.forEach(fnName => {
            this.sf.displayFunctions[fnName](target);
        });
    }

    // resetNodeValues() {
    //     this.graph.nodes()[0].data.value = 0;
    // }

    // getAdjacentNodes(n) {


    // }
}