import { SigmaDecorator } from './sigmaDecorator';
import { inject } from 'aurelia-framework';
import { Store, select } from 'aurelia-redux-plugin';
import { Observable, BehaviorSubject } from 'rxjs'

@inject(Store, SigmaDecorator)
export class GraphService {

    graph;
    graphName;
    sigma;
    public sigmaInstance;
    public sigmaEvents: BehaviorSubject<any>;

    constructor(private store: Store<any>, private sd: SigmaDecorator) {
        console.log('constructing graph service')

        
        this.sigma = window['sigma'];
        this.addSigmaClassMethods();
        this.sigmaEvents = new BehaviorSubject({});
        select('graph.data.name', { subscribe: true })(this, 'graphName');
        select('graph')(this, 'graph');
    }

    addSigmaClassMethods() {

        this.sigma.classes.graph.attach('addNode', '', function (e) {
            e._outNodes = [];
            e._inNodes = [];
            e._outEdges = [];
            e._inEdges = [];
        });

        this.sigma.classes.graph.attach('addEdge', '', function (e) {
            let source = this.nodesIndex[e.source];
            let target = this.nodesIndex[e.target];

            source._outNodes.push(target)
            source._outEdges.push(e)

            target._inNodes.push(source)
            target._inEdges.push(e)
        });

        this.sigma.classes.graph.addMethod('breadthTraverse', function (stepFn, edgeFn) {
            let stack = [this.nodes()[0]];
            while (stack.length > 0) {
                let n = stack.pop();
                if (stepFn(n)) {
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

        console.warn('added sigma methods')

    }

    graphNameChanged(current, last) {
        this.getGraphFromRedux();
    }

    getGraphFromRedux() {
        this.sigmaInstance = new this.sigma();
        this.sigmaEvents.next({ type: 'initialize' });
        // this.sigmaEvents.next({type: 'render'});
    }

    saveGraphToRedux() {
        let renderSlice = { nodes: this.sigmaInstance.graph.nodes(), edges: this.sigmaInstance.graph.edges() }
        let payload = Object.assign({}, this.graph, renderSlice);
        this.store.dispatch({ type: 'GRAPH_SET', payload: payload });
    }

    graphChanged(current, last) {

    }







}