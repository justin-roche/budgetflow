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
        // this.sigmaEvents = new BehaviorSubject({});
        // select('graph.data.name', { subscribe: true })(this, 'graphName');
        // select('graph')(this, 'graph');
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