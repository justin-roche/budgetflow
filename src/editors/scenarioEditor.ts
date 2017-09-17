import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class ScenarioEditor {
  constructor(private ea: EventAggregator) {
  }
  attached() {

  }
  activate(person) {

  }
}