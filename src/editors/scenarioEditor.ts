import { select, Store } from 'aurelia-redux-plugin';
import { ModalSettings } from './../common/modalWrapper';
import *  as Rx from 'rxjs';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(EventAggregator, Store)
export class ScenarioEditor {
  @select('graphs', {subscribe: true})
  graphs;

  graphsChanged() {
    console.log('graphs changed');
  }

  modalSettings = new Rx.BehaviorSubject<ModalSettings>( 
    {title: 'Scenario Edit',
    id: 'scenario-edit',
    x: 0,
    y: 0,
    show: true
  });

  constructor(private ea: EventAggregator, private store: Store<any>) {

  }

  selectGraph(selectedGraph) {
    this.store.dispatch({type: 'GRAPH_SET', payload: selectedGraph});
  }

  attached() {
    
    $("#ex8").bootstrapSlider({
      tooltip: 'always'
    });

    $('#ex8').on('slideStop', (v) => {
      this.ea.publish('graph.step', Number(v.target.value));
    })
   
  }
  activate() {

  }
}