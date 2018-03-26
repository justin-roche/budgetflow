import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery'
import { Store } from '../services/reduxStore';

@inject(Store)
export class Footer {

  conditionalTable;

  constructor(private store: Store) {
    this.store.select('ui.conditionalTable').subscribe(d => {
      if (d !== null) {
        this.conditionalTable = d;
      }
    })
  }

  attached() {

  }
  toggleConditionalTable() {
    this.store.dispatch({ type: 'UI_CONDITIONAL_TABLE_TOGGLE' });
  }

  forward() {
    /* increase the simulation target time by one cycle */
    this.store.actions.graph.incrementTargetTime()

    /* iterate through all remaining cycles (1) */
    this.store.actions.graph.simulate();
  }

  backward() {
    this.store.actions.graph.decrementTargetTime()
  }



}