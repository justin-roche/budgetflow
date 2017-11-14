import { Store } from './../services/reduxStore';
import { inject, bindable } from 'aurelia-framework';
import { uiActions } from '../reducers/uiReducer';
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

    // decorateCurrentFunctions() {
    //     this.currentFunctions = this.currentFunctions.map(fn => {
    //         return {
    //             ...fn, ...{
    //                 _arguments: _.map(fn.arguments, (v, key) => {
    //                     return { name: key, value: v }
    //                 })
    //             }
    //         }
    //     });
    // }

    // decorateSelectableFunctions() {
    //     this.selectableFunctions = this.selectableFunctions.map(fn => {
    //         return {
    //             ...fn, ...{
    //                 _arguments: _.map(fn.arguments, (v, key) => {
    //                     return { name: key, value: fn.defaults[key] }
    //                 }),
    //             }
    //         }
    //     })
    // }

    newFunctionSelected(item) {
        
        // this.newFunction = this.settings.selectableFunctions[item.name];
        // this.newFunction
        
        // this.newFunction = {
        //     ... this.newFunction, ...{
        //         arguments: _.map( this.newFunction.arguments, (v, key) => {
        //             return { name: key, value:  this.newFunction.defaults[key] }
        //         }), // iterable arguments for template
        //     }
        // };
        // console.log('selected', this.newFunction)
    }

}