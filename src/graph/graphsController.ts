import { GraphGenerator } from './graphGenerator';
import { inject, bindable } from 'aurelia-framework';


declare var sigma;

@inject(GraphGenerator)
export class GraphsController {

    childSettings = [];

    public displaySettings = {
        defaultEdgeColor: 'black',
        defaultNodeColor: 'gray',
        activeNodeColor: 'green',
        activeEdgeColor: 'green',
        defaultNodeSize: 50,
    }

    public sigmaSettings = {
        doubleClickZoomingRatio: 1,
        maxNodeSize: 50,
        minNodeSize: 1,
        minEdgeSize: 5,
        maxEdgeSize: 5,
        minArrowSize: 25,
        enableEdgeHovering: true,
    };

    constructor(private gg: GraphGenerator) {

    }

    attached() {
        this.addSigmaClassMethods();
        this.createGraphs();
    }

    createGraphs() {
        let g: any = this.gg.generateSimple();

        this.childSettings.push(
            {
                displaySettings: this.displaySettings,
                sigmaSettings: this.sigmaSettings,
                sigmaInstance: null,
                name: 'A',
                graph: g,
            }
        );

        this.childSettings.push(
            {
                displaySettings: this.displaySettings,
                sigmaSettings: this.sigmaSettings,
                sigmaInstance: null,
                graph: g,
                name: 'B'
            }
        );

        console.log('child settings', this.childSettings);
    }

    addSigmaClassMethods() {
        sigma.classes.graph.addMethod('neighbors', function (nodeId) {
            var k,
                neighbors = {},
                index = this.allNeighborsIndex[nodeId] || {};

            for (k in index) {
                neighbors[k] = this.nodesIndex[k];
            }
            return neighbors;
        });

        sigma.classes.graph.addMethod('neighborsArray', function (nodeId) {
            var k,
                neighbors = [],
                index = this.allNeighborsIndex[nodeId] || {};

            for (k in index) {
                neighbors.push(this.nodesIndex[k]);
            }
            return neighbors;
        });

        sigma.classes.graph.addMethod('neighboringEdges', function (nodeId) {
            var k,
                edges = {},
                index = this.allNeighborsIndex[nodeId] || {};

            return index;
        });

        sigma.classes.graph.addMethod('outEdges', function (nodeId) {
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

        sigma.classes.graph.addMethod('getEdgeById', function (edgeId) {
            return this.edgesIndex[edgeId];
        });

        sigma.classes.graph.addMethod('outNodes', function (nodeId) {
            var k,
                edgesObject = this.outNeighborsIndex[nodeId] || {};
            let outNodes = [];

            for (let nodeName in edgesObject) {
                outNodes.push(this.nodesIndex[nodeName]);
            }
            return outNodes;
        });

        sigma.classes.graph.addMethod('breadthTraverse', function(fn) {
            let stack = [this.nodes()[0]];
            while (stack.length > 0) {
                let n = stack.pop();
                let neighborsArray = this.outNodes(n.id);
                neighborsArray.forEach(_n => {
                    if (fn(n, _n)) stack.unshift(_n);
                });
            }
        });
        
    }
}