import { Store } from './../../services/reduxStore';
import { inject, bindable } from 'aurelia-framework';
import { uiActions } from '../../reducers/ui/uiReducer';
import { _ } from 'underscore';

import $ from 'jquery'
import * as Rx from 'rxjs'; 
import { sm } from './state-model';
import {TemplateModel} from './template-model';

@inject(Store)
export class FunctionEditor {
    newFunction;
    edgeData = null;
    functions = [];
    availableFunctions = [];
    tm;
    
    constructor(private store: Store) {
        console.log('edge function editor')
       this.store.mapStateToMethods(this, sm);  
       this.tm = new TemplateModel();
    }

    selectedEdgeDataUpdated({edgeData, linkFunctions, state}) {
        console.log('ed', edgeData)
        this.edgeData = edgeData;
        this.functions = linkFunctions;
        this.tm.compute();
        this.availableFunctions = this.tm.computed.availableFunctions;
        console.warn('available functions', this.tm.computed.availableFunctions);
    }

    newFunctionSelected(item) {
        this.newFunction = item;
    }

    removeFunction(fn) {
        this.functions = this.functions.filter(f => f !== f);
    }

    submit() {
        this.functions.forEach(fn => {
            fn.object.value = Number(fn.object.value);
        })
        this.edgeData.linkFunctions = this.functions;
        console.log('sumitting edge data', JSON.stringify(this.edgeData))
        this.store.actions.graph.updateEdgeData(this.edgeData);
       // {"id":"1-2","active":true,"linkFunctions":[]}

    }

}