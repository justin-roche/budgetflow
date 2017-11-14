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

  forward() { 
    this.store.actions.graph.incrementTargetTime()
    this.store.actions.graph.simulate();
  }

  backward() { 
    this.store.actions.graph.decrementTargetTime()
  }

  

}