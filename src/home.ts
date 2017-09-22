import { inject } from 'aurelia-framework';
import { GraphService } from './graph/graphService';
import $ from 'jquery'
import * as Rx from 'rxjs';
import { Store, select } from 'aurelia-redux-plugin';
import {simple } from '../test/mock-data/graphs';

@inject(GraphService, Store)
export class Home {

    constructor(private gs: GraphService, private store: Store) {
        this.hydrateInitial();
    }

    attached() {

        
    }

    hydrateInitial() {
        this.store.dispatch({type: 'GRAPHS_SET', payload: simple.graphs});
        this.store.dispatch({type: 'GRAPH_CONTAINER_SETTINGS_SET', payload: simple.ui.graphContainer});
        this.store.dispatch({type: 'SIGMA_SETTINGS_SET', payload: simple.ui.sigma});
    }
    
}