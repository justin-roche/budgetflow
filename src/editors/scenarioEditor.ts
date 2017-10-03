import { Store } from '../services/reduxStore';
import { ModalSettings } from './../common/modalWrapper';
import *  as Rx from 'rxjs';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(EventAggregator, Store)
export class ScenarioEditor {
  graphs;

  graphsChanged() {

  }

  modalSettings = new Rx.BehaviorSubject<ModalSettings>( 
    {title: 'Scenario Edit',
    id: 'scenario-edit',
    x: 0,
    y: 0,
    show: true
  });

  constructor(private ea: EventAggregator, private store: Store<any>) {
    this.$graphs = this.store.select('graphs');   
    this.$graphs.subscribe(d => {
        this.graphs = d;
    })
  }

  onStep() {
    this.store.dispatch({type: 'STEP_INCREMENT'});
  }

  saveGraph() {
    let g = this.store.getState().graph;
    console.log(JSON.stringify(g));
  }

  selectGraph(selectedGraph) {
    this.store.dispatch({type: 'GRAPH_SET', payload: selectedGraph});
  }

  selectSimulationTime(t) {
    this.store.dispatch({type: 'UI_SIMULATION_TIME_SET', payload: t});
  }

  attached() {
    
    $("#ex8").bootstrapSlider({
      tooltip: 'always'
    });

    $('#ex8').on('slideStop', (v) => {
      this.selectSimulationTime(Number(v.target.value));
    })
   
  }
  activate() {

  }
}