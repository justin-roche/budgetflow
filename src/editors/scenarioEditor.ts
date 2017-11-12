import { Store } from '../services/reduxStore';
import *  as Rx from 'rxjs';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(EventAggregator, Store)
export class ScenarioEditor {
  graphs;

  graphsChanged() {

  }


  constructor(private ea: EventAggregator, private store: Store) {
    this.$graphs = this.store.select('graphs');
    this.$graphs.subscribe(d => {
      this.graphs = d;
    })
  }

  /* GRAPHS */

  saveGraph() {
    let g = this.store.getState().graph;
    console.log(JSON.stringify(g));
  }

  selectGraph(selectedGraph) {
    this.store.actions.graph.setGraph(selectedGraph)
    .actions.graph.applyDisplayFunctions()
    .actions.ui.selectNode(null);
  
  }

  /* SIMULATION */

  attached() {

  }

}