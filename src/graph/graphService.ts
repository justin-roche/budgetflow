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
        this.sigma.classes.graph.addMethod('neighbors', function (nodeId) {
            var k,
                neighbors = {},
                index = this.allNeighborsIndex[nodeId] || {};

            for (k in index) {
                neighbors[k] = this.nodesIndex[k];
            }
            return neighbors;
        });

        this.sigma.classes.graph.addMethod('neighborsArray', function (nodeId) {
            var k,
                neighbors = [],
                index = this.allNeighborsIndex[nodeId] || {};

            for (k in index) {
                neighbors.push(this.nodesIndex[k]);
            }
            return neighbors;
        });

        this.sigma.classes.graph.addMethod('neighboringEdges', function (nodeId) {
            var k,
                edges = {},
                index = this.allNeighborsIndex[nodeId] || {};

            return index;
        });

        this.sigma.classes.graph.addMethod('outEdges', function (nodeId) {
            var k,
                outEdges = [],
                edgesObject = this.outNeighborsIndex[nodeId] || {};

            for (let nodeName in edgesObject) {
                for (let edgeName in edgesObject[nodeName]) {
                    outEdges.push(edgesObject[nodeName][edgeName]);
                }

            }
            return outEdges;
        });

        this.sigma.classes.graph.addMethod('getEdgeById', function (edgeId) {
            return this.edgesIndex[edgeId];
        });

        this.sigma.classes.graph.attach('addEdge', '', function(e){
            console.log('calling addEdge', arguments);
            let source = this.nodesIndex[e.source];
            let target = this.nodesIndex[e.target];
            
            source._outNodes? source._outNodes.push(target) : source._outNodes = [target];
            source._outEdges? source._outEdges.push(e) : source._outEdges = [e];
            
            target._inNodes? target._inNodes.push(source) : target._inNodes = [source];
            target._inEdges? target._inEdges.push(e) : target._inEdges = [e];
            
            
        });

        this.sigma.classes.graph.addMethod('outNodes', function (nodeId) {
            var k,
                edgesObject = this.outNeighborsIndex[nodeId] || {};
            let outNodes = [];

            /* todo: cache this on the node add */
            for (let nodeName in edgesObject) {
                outNodes.push(this.nodesIndex[nodeName]);
            }
            return outNodes;
        });

        this.sigma.classes.graph.addMethod('breadthTraverse', function (fn) {
            let stack = [this.nodes()[0]];
            while (stack.length > 0) {
                let n = stack.pop();
                let neighborsArray = this.outNodes(n.id);
                neighborsArray.forEach(_n => {
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
                graph: data.graph,
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