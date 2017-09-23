import { SimulationFunctions } from './simulationFunctions';
import { GraphService } from '../services/graphService';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store, select } from 'aurelia-redux-plugin';

@inject(EventAggregator, GraphService, Store, SimulationFunctions)
export class Simulator {
    // @select('graph', {subscribe: true})

    sigma = window['sigma'];

    dragging = false;
    containerRef;

    sigmaInstance;

    sigmaSettings;
    settings;

    graph;
    simulation;

    g;

    constructor(private ea: EventAggregator, private gs: GraphService, private store: Store<any>, private sf: SimulationFunctions) {
        select('graph', { subscribe: true })(this, 'graph');
        select('ui.simulation.time', { subscribe: true })(this, 'simulationTime');
        this.sigmaInstance = new this.sigma();
    }

    graphChanged(current, last) {
        if (!last || current.data.name !== last.data.name) {
            this.import();
            this.initialize();
        }
    }

    import() {
        this.sigmaInstance.graph.clear();
        if (this.graph.nodes) {
            this.graph.nodes.forEach(node => {
                this.sigmaInstance.graph.addNode(node);
            });
        }
        if (this.graph.edges) {
            this.graph.edges.forEach(edge => {
                this.sigmaInstance.graph.addEdge(edge);
            })
        }
    console.log('imported', this.sigmaInstance.graph.nodes())
}

initialize() { // initialize description-dependent derived properties
    this.sigmaInstance.graph.iterationTraverse((node) => {
        this.runDisplayUpdateFunction(node);
        return true;
    });
    console.log('sim export: initial')
    this.export();
}

    export() {
    let renderSlice = { nodes: this.sigmaInstance.graph.nodes(), edges: this.sigmaInstance.graph.edges() }
    let payload = Object.assign({}, this.graph, renderSlice);
    this.store.dispatch({ type: 'GRAPH_SET', payload: payload });
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
    this.export();
}

// setStart() {
//     console.log(this.graph.nodes());
// }

convertTimeToCycles(time) {
    return time;
}

simulateNode(source, target) {
    console.log('outEdges', source._outEdges)
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