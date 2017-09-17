import { inject } from 'aurelia-framework';
import { NodeFunctions } from './stepFunctions';

@inject(NodeFunctions)
export class GraphService {

    graph;

    constructor(private nf: NodeFunctions) {

    }

    stepFunctions = {
        increment: function(value, node) {
            return value+1;
        },
        equal: function(value, node) {
            return value;
        }
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
                value: 0,
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
            id: 'e1',
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
            id: 'n' + this.graph.nodes().length,
            label: 'n'+this.graph.nodes().length,
            x: Math.random(),
            y: Math.random(),
            size: Math.random(),
            color: '#666'
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

    applyStep(step) {
        this.traverseOnce((node)=>{
            if(node.data.stepFunction) {
                node.data.value = this.nf.stepFunctions[node.data.stepFunction](step,node);
                node.size = node.data.value*10;
            }
        });
        console.log(this.graph.nodes());
    }

    traverseOnce(fn) {
        this.graph.nodes()
        .forEach(node => {
            fn(node);
        });
    }

    

}