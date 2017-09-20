import { inject } from 'aurelia-framework';
import { NodeFunctions } from './stepFunctions';

@inject(NodeFunctions)
export class GraphService {

    graph;

    constructor(private nf: NodeFunctions) {

    }

    /* calculations */

    setStart() {
        console.log(this.graph.nodes());
    }

    timeToCycles(step) {
        return step;
    }

    applySimulation(step) {

        let numberOfCycles = this.timeToCycles(step);

        for (let c = 0; c < numberOfCycles; c++) {
            this.graph.breadthTraverse(this.simulateNode.bind(this));
        }

        console.log('nodes after traversal', this.graph.nodes()[0].data.value, this.graph.nodes()[1].data.value, this.graph.nodes()[1].data.active)

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
        this.nf.linkFunctions[edge.data.linkFunction](source, target, 1);
    }

    runStepFunction(target) {
        target.data.stepFunctions.forEach(fnObj => {
            this.nf.stepFunctions[fnObj.name](target, fnObj.argument);
        });
    }

    runDisplayUpdateFunction(target) {
        target.data.displayFunctions.forEach(fnName => {
            this.nf.displayFunctions[fnName](target);
        });
    }

    resetNodeValues() {
        this.graph.nodes()[0].data.value = 0;
    }

    iterateAllNodes(fn) {
        this.graph.nodes()
            .forEach(node => {
                fn(node);
            });
    }

    getAdjacentNodes(n) {
        let neighbors = this.graph.neighbors(n.id);
        let edges = this.graph.neighboringEdges(n.id);
        let outEdges = this.graph.outEdges(n.id);

        return {
            neighbors,
            edges,
            outEdges
        };

    }





}