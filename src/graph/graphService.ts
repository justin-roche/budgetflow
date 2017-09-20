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

    applySimulation(step) {

        let numberOfCycles = this.timeToCycles(step);
       
        for (let c = 0; c < numberOfCycles; c++) {
            this.breadthTraverse(node => {

            });
        }

        console.log('nodes after traversal', this.graph.nodes()[0].data.value, this.graph.nodes()[1].data.value, this.graph.nodes()[1].data.active)

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

    updateDisplayProperties(node) {
        node.size = 1/node.data.value;
        if(node.data.active) {
            node.color = 'black';
        } else {
            node.color = 'gray';
        }
    }

    iterateAllNodes(fn) {
        this.graph.nodes()
            .forEach(node => {
                fn(node);
            });
    }

    timeToCycles(step) {
        return step;
    }

    resetNodeValues() {
        this.graph.nodes()[0].data.value = 0;
    }

    breadthTraverse(fn) {
        let stack = [this.graph.nodes()[0]];
        while (stack.length > 0) {
            let n = stack.pop();
            fn(n);
            let neighborsArray = this.graph.outNodes(n.id);
            neighborsArray.forEach(_n => {
                this.runLinkFunction(n, _n);
                this.runStepFunction(_n);
                this.updateDisplayProperties(_n);
                if (_n.data.active) {
                    stack.unshift(_n);
                }
            });
        }
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