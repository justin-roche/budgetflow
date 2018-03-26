import { Store } from './../services/reduxStore';
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

}