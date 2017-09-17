import { ModalSettings } from './../common/modalWrapper';
import *  as Rx from 'rxjs';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(EventAggregator)
export class ScenarioEditor {

  modalSettings = new Rx.BehaviorSubject<ModalSettings>( 
    {title: 'Scenario Edit',
    id: 'scenario-edit',
    x: 0,
    y: 0,
    show: true
  });

  constructor(private ea: EventAggregator) {
    
  }

  attached() {
    //this.modalSettings.next(Object.assign(this.modalSettings.getValue(), {show: true}));
    
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