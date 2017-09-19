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
                label: 'n'+i,
                x: Math.random(),
                y: Math.random(),
                size: Math.random(),
                color: 'gray'
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

        graph.nodes.push({
            data: {
                value: 10,
                stepFunction: ['equal']
            },
            id: 'n' + 1,

            // display data
            label: 'n'+1,
            x: Math.random(),
            y: Math.random(),
            size: 50,
            color: 'gray'
        });

        graph.nodes.push({
            data: {
                value: 0,
                stepFunction: null
            },
            id: 'n' + 2,
            label: 'n'+2,
            x: Math.random(),
            y: Math.random(),
            size: 50,
            color: 'gray'
        });

        graph.edges.push({
            data: {
                linkFunction: 'transfer'
            },
            id: 'en1n2',
            source: 'n1', 
            target: 'n2', 
            size: 50,
            color: 'black',
            type: 'arrow'
        });

        return graph;
        
    }

    generateRandomNode() {
        return {
            id: 'n' + (this.graph.nodes().length+1),
            label: 'n'+(this.graph.nodes().length+1),
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
        let outEdges = this.graph.outNeighboringEdges(n.id);
       
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
        
        // this.iterateAllNodes((node)=>{
            
        //     if(node.data.stepFunction) {
        //         this.nf.stepFunctions[node.data.stepFunction](step,node);
        //         node.size = node.data.value*10;                
        //     }
        // });
        let numberOfCycles = this.timeToCycles(step);
        // if(numberOfCycles = 0) {
        //     this.resetNodeValues();
        // }
        for(let c = 0; c<numberOfCycles; c++) {
            this.breadthTraverse(node => {
                
            });
        }
        
        console.log('nodes after traversal', this.graph.nodes()[0].data.value, this.graph.nodes()[1].data.value)
        
    }

    runLinkFunction(source, target) {
        let edge = this.graph.getEdgeById('e'+source.id+target.id);
        console.log('foudn edge', edge);
        this.nf.linkFunctions[edge.data.linkFunction](source, target, 1);
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
        var stack=[this.graph.nodes()[0]];
        while(stack.length>0) {
          let n = stack.pop();
          fn(n);
          let neighborsArray = this.graph.outNodes(n.id);
          neighborsArray.forEach(_n => {
             this.runLinkFunction(n, _n)
             stack.unshift(_n);
          });
        }
    }

    

}