import { select } from 'aurelia-redux-plugin';
import { inject } from 'aurelia-framework';

@inject()
export class GraphService {

    graph;
    sigma = window['sigma'];

    constructor() {
        console.log('constructing graph service')        
        this.addSigmaClassMethods();
    }

    createSigmaInstance(data) {
        let instance = new this.sigma();
        return instance;
    }

    addSigmaClassMethods() {
    
        /* not serializable */
        this.sigma.classes.graph.attach('addEdge', '', function(e){
            let source = this.nodesIndex[e.source];
            let target = this.nodesIndex[e.target];
            
            source._outNodes.push(target)
            source._outEdges.push(e) 
            
            target._inNodes.push(source) 
            target._inEdges.push(e)
        });

        this.sigma.classes.graph.attach('addNode', '', function(e){
            e._outNodes = [];
            e._inNodes = [];
            e._outEdges = [];
            e._inEdges = [];
        });

        this.sigma.classes.graph.addMethod('breadthTraverse', function (stepFn, edgeFn) {
            let stack = [this.nodes()[0]];
            while (stack.length > 0) {
                let n = stack.pop();
                if(stepFn(n)){
                    n._outNodes.forEach(_n => {
                        if (edgeFn(n, _n)) stack.unshift(_n);
                    });
                }
            }
        });

        this.sigma.classes.graph.addMethod('iterationTraverse', function (fn) {
            this.nodes()
                .forEach(node => {
                    fn(node);
                });
        })

    }

    
   
   

}