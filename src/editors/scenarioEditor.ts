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

  simulationTimeSet(t) {
    this.store.dispatch({ type: 'SIMULATION_TIME_SET', payload: t });
  }

  simulationCyclesSet(c) {
    this.store.dispatch({ type: 'REMAINING_CYCLES_SET', payload: c });
  }

  simulate() {
    this.store.dispatch({ type: 'SIMULATION_ON' });
  }

  attached() {

    // $("#ex8").bootstrapSlider({
    //   tooltip: 'always'
    // });

    // $('#ex8').on('slideStop', (v) => {
    //   console.log(v.target.value)
    //   this.simulationCyclesSet(Number(v.target.value));
    // })

  }

}