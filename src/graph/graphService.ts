import { inject } from 'aurelia-framework';
import { NodeFunctions } from './stepFunctions';

@inject(NodeFunctions)
export class GraphService {

    graph;

    constructor(private nf: NodeFunctions) {

    }

    generateRandom(n) {

        let i;
        let s;
        let E = n;
        let graph = {
            nodes: [],
            edges: []
        };

        for (i = 0; i < n; i++)
            graph.nodes.push({
                id: 'n' + i,
                label: 'n' + i,
                x: Math.random(),
                y: Math.random(),
                size: Math.random(),
                color: 'black'
            });

        for (i = 0; i < E; i++)
            graph.edges.push({
                id: 'e' + i,
                source: 'n' + (Math.random() * n | 0), //source by id
                target: 'n' + (Math.random() * n | 0),
                size: 50,
                color: 'black',
                type: 'arrow'
            });

        return graph;
    }

    generateSimple() {
        let graph = {
            nodes: [],
            edges: []
        };

        graph.nodes = [
            {
                data: {
                    active: true,
                    value: 10,
                    stepFunctions: []
                },
            },
            {
                data: {
                    active: false,
                    value: 0,
                    stepFunctions: [{ name: 'activate', argument: 5 }]
                }
            },
            {
                data: {
                    active: false,
                    value: 0,
                    stepFunctions: []
                }
            }];

        graph.edges = [
            {
                data: {
                    linkFunction: 'transfer',
                    stepFunctions: null,
                },
                source: 'n1',
                target: 'n2',
            },
            {
                data: {
                    linkFunction: 'transfer',
                    stepFunctions: null,
                },
                source: 'n2',
                target: 'n3',
            }
        ];

        this.createDisplayProperties(graph);

        return graph;

    }

    createDisplayProperties(graph) {
        graph.nodes.forEach((node, i) => {
            node.id = 'n' + (i+1);
            node.label = node.id;
            if (node.data.active) {
                node.color = 'black';
            } else {
                node.color = 'gray';
            }
            node.x = Math.random(),
            node.y = Math.random(),
            node.size = node.value || 1;
        });

        graph.edges.forEach((edge, i) => {
            edge.id = 'e' + edge.source + edge.target;
            edge.color = 'black';
            edge.size = 50;
            edge.type = 'arrow'
        })
    }

    generateRandomNode() {
        return {
            id: 'n' + (this.graph.nodes().length + 1),
            label: 'n' + (this.graph.nodes().length + 1),
            x: Math.random(),
            y: Math.random(),
            size: Math.random(),
            color: '#666',
            data: {

            }
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
        var stack = [this.graph.nodes()[0]];
        while (stack.length > 0) {
            let n = stack.pop();
            fn(n);
            let neighborsArray = this.graph.outNodes(n.id);
            if(!neighborsArray) {
                debugger;
            }
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



}