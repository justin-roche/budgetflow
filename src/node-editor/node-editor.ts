import { TemplateModel } from './template-model';
import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';
import { _ } from 'underscore';
import { extend } from '../reducers/utilities/utilities';
import { sm } from './state-model';
@inject(Store)
export class NodeEditor {
    collapsed = false;
    nodeId;
    nodeData;
    tm;
    selectedNodeType;
   
    functionEditorSettings;

    constructor(private store: Store) {
        this.tm = new TemplateModel();
        this.store.mapStateToMethods(this, sm);
    }

    selectedNodeUpdated({state, id, nodeData}) {
        if(nodeData) {
            this.nodeData = JSON.parse(JSON.stringify(nodeData));
        } else {
            this.nodeData = null;
        }
        this.tm.compute();
    }

    selectNodeType(type) {
        this.nodeData.type = type;
        this.nodeData.nodeFunctions = type.nodeFunctions;
        this.nodeData.source = type.source;
    }

    submit() {
        console.log('sending nd', this.nodeData)
        this.store.actions.graph.updateNodeData(this.nodeData);
        this.store.actions.graph.applyDisplayFunctions();
    }

    save() {

    }

}