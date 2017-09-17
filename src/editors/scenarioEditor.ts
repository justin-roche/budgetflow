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
   
  }
  activate() {

  }
}