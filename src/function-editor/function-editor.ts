import { Store } from './../services/reduxStore';
import { inject, bindable } from 'aurelia-framework';
import { uiActions } from '../reducers/ui/uiReducer';
import { _ } from 'underscore';

import $ from 'jquery'
import * as Rx from 'rxjs'; 
import { sm } from './state-model';

@inject(Store)
export class FunctionEditor {
    newFunction;
    nodeData = null;
    nodeFunctions = null;
    // currentFunctions
    // newFunction;
    // selectableFunctions;
    

    constructor(private store: Store) {
        this.store.mapStateToMethods(this, sm);
    }

    selectedNodeDataUpdated({nodeData, nodeFunctions, state}) {
        this.nodeData = nodeData;
        this.nodeFunctions = nodeFunctions;
    }

    newFunctionSelected(item) {

    }

    submit() {
        this.nodeFunctions.forEach(fn => {
            debugger;
            fn.object.value = Number(fn.object.value);
        })
        this.store.actions.graph.updateNodeFunctions(this.nodeFunctions);
    }

}