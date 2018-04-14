import { Store } from './../../services/reduxStore';
import { inject, bindable } from 'aurelia-framework';
import { uiActions } from '../../reducers/ui/uiReducer';
import { _ } from 'underscore';

import $ from 'jquery'
import * as Rx from 'rxjs'; 
import { sm } from './state-model';

@inject(Store)
export class FunctionEditor {
    newFunction;
    nodeData = null;
    functions = null;
    // currentFunctions
    // newFunction;
    // selectableFunctions;
    
    constructor(private store: Store) {
        this.store.mapStateToMethods(this, sm);
    }

    selectedNodeDataUpdated({nodeData, nodeFunctions, state}) {
        this.nodeData = nodeData;
        this.functions = nodeFunctions;
    }

    newFunctionSelected(item) {

    }

    removeFunction(fn) {
        this.functions = this.functions.filter(f => f !== f);
    }

    submit() {
        this.functions.forEach(fn => {
            fn.object.value = Number(fn.object.value);
        })
        this.nodeData.nodeFunctions = this.functions;
        this.store.actions.graph.updateNodeData(this.nodeData);

    }

}