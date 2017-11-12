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
    this.store.actions.simulation.incrementTargetTime()
    
  }

  backward() { 
    this.store.actions.simulation.decrementTargetTime()
  }

  

}