import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store, select } from 'aurelia-redux-plugin';
import { SimulationFunctions } from './simulationFunctions';

@inject(Store, EventAggregator, SimulationFunctions)
export class Simulator {
    _graph;
    graph;
    sigma = window['sigma'];
    
    constructor(private store: (Store<any>), private ea: EventAggregator, private sf: SimulationFunctions) {
            select('graph')(this, '_graph');
        this.graph =  new this.sigma();
        this.addEaListeners();        
    }

    addEaListeners() {
        this.ea.subscribe('simulate', ()=>{
            this.applySimulation(10);
        })
    }

    applySimulation(time) {
        this.graph.read(this._graph);
        // let numberOfCycles = this.convertTimeToCycles(time);
        // for (let c = 0; c < numberOfCycles; c++) {
        //     this.graph.breadthTraverse(this.simulateNode.bind(this));
        // }
        console.log('nodes after traversal', this.graph.nodes()[0].data.value, this.graph.nodes()[1].data.value, this.graph.nodes()[1].data.active)
    }

    setStart() {
        console.log(this.graph.nodes());
    }

    convertTimeToCycles(step) {
        return step;
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
        let edge = this.graph.getEdgeById('e' + source.id + target.id);
        this.sf.linkFunctions[edge.data.linkFunction](source, target, 1);
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
    }

    resetNodeValues() {
        this.graph.nodes()[0].data.value = 0;
    }

    getAdjacentNodes(n) {


    }
}