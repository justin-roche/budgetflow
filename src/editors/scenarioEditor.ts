import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(EventAggregator)
export class ScenarioEditor {
  constructor(private ea: EventAggregator) {
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