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
    graph;
    tm;
    selectedNodeType;
   
    constructor(private store: Store) {
        this.tm = new TemplateModel();
        this.store.mapStateToMethods(this, sm);
    }

    selectedNodeUpdated({state, id, nodeData}) {
        if(nodeData) {
            console.log('selected node', nodeData)
            this.nodeData = JSON.parse(JSON.stringify(nodeData));
            this.selectedNodeType = this.nodeData.type;
            this.graph = state.graph;
        } else {
            this.nodeData = null;  
        }
        this.tm.compute();
    }

    selectedNodeDataUpdated({nodeData}) {
        console.warn('nd updated', nodeData);
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

    groupMatcher(a, b) {
        debugger;
        return a === b;
    }

    updateNodeGroups(i) {
        console.log('change', i)
    }

    save() {

    }

}