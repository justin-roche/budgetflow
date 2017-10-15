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

    $("#ex2").bootstrapSlider({
      tooltip: 'always'
    });

    $("#mainslider").addClass('main-slider');
  }

  showConditionalTable() {
    this.store.dispatch({type: 'UI_CONDITIONAL_TABLE_TOGGLE'});
  }

}