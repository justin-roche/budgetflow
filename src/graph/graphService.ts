import { inject } from 'aurelia-framework';
import { NodeFunctions } from './stepFunctions';

@inject(NodeFunctions)
export class GraphService {

    graph;
    sigma = window['sigma'];

    constructor(private nf: NodeFunctions) {
        this.addSigmaClassMethods();
    }

    addSigmaClassMethods() {
    
        /* not serializable */
        this.sigma.classes.graph.attach('addEdge', '', function(e){
            let source = this.nodesIndex[e.source];
            let target = this.nodesIndex[e.target];
            
            source._outNodes? source._outNodes.push(target) : source._outNodes = [target];
            source._outEdges? source._outEdges.push(e) : source._outEdges = [e];
            
            target._inNodes? target._inNodes.push(source) : target._inNodes = [source];
            target._inEdges? target._inEdges.push(e) : target._inEdges = [e];
        });

        this.sigma.classes.graph.addMethod('breadthTraverse', function (fn) {
            let stack = [this.nodes()[0]];
            while (stack.length > 0) {
                let n = stack.pop();
                n._outNodes.forEach(_n => {
                    if (fn(n, _n)) stack.unshift(_n);
                });
            }
        });

        this.sigma.classes.graph.addMethod('iterationTraverse', function (fn) {
            this.nodes()
                .forEach(node => {
                    fn(node);
                });
        })

    }

    getSigmaInstance(data) {
            let instance = new this.sigma({
                graph: data,
            });
            return instance;
    }

    /* simulation */

    setStart() {
        console.log(this.graph.nodes());
    }

    convertTimeToCycles(step) {
        return step;
    }

    initialize(graph) { // initialize description-dependent derived properties
        graph.iterationTraverse((node) => {
            this.runDisplayUpdateFunction(node);
            return true;
        });
        console.log('nodes after initialization', graph.nodes());
    }

    applySimulation(time) {
        let numberOfCycles = this.convertTimeToCycles(time);
        for (let c = 0; c < numberOfCycles; c++) {
            this.graph.breadthTraverse(this.simulateNode.bind(this));
        }
        // console.log('nodes after traversal', this.graph.nodes()[0].data.value, this.graph.nodes()[1].data.value, this.graph.nodes()[1].data.active)
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

    getAdjacentNodes(n) {
        

    }

}