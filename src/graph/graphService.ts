import { inject } from 'aurelia-framework';

@inject()
export class GraphService {

    graph;
    sigma = window['sigma'];

    constructor() {
        this.addSigmaClassMethods();
    }

    createSigmaInstance(data) {
        let instance = new this.sigma({
            graph: data,
        });
        return instance;
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

    

    initialize(graph) { // initialize description-dependent derived properties
        graph.iterationTraverse((node) => {
            // this.runDisplayUpdateFunction(node);
            return true;
        });
        console.log('nodes after initialization', graph.nodes());
    }
    
        /* simulation */


   

}