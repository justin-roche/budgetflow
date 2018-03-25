import { Store } from './../services/reduxStore';
import { inject, bindable } from 'aurelia-framework';
import { uiActions } from '../reducers/ui/uiReducer';
import { _ } from 'underscore';

import $ from 'jquery'
import * as Rx from 'rxjs'; 

export class FunctionEditor {
    @bindable settings;
    newFunction;
    // currentFunctions
    // newFunction;
    // selectableFunctions;
    

    constructor() {

    }


    newFunctionSelected(item) {
        this.settings.newFunction = item;
       
    }

}