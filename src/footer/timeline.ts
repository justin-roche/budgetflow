import { Store } from './../services/reduxStore';
import { ModalSettings } from './../common/modalWrapper';
import *  as Rx from 'rxjs';
import { inject } from 'aurelia-framework';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import $ from 'jquery';
import * as moment from 'moment';

@inject(Store)
export class Timeline {

    data = {selectedDate: '?'};

    constructor(private store: Store) {

    }

    toggleConditionalTable() {
        this.store.dispatch({ type: 'UI_CONDITIONAL_TABLE_TOGGLE' });
    }


}