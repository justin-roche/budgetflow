import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';
import { _ } from 'underscore';
import { stepFunctions } from 'functions/stepFunctions';
import { extend } from '../reducers/utilities/utilities';

@inject(Store)
export class NodeEditor {
    collapsed = false;
    nodeId;
    testId = 'x'
    form: any = {};
    nodeData;
    tabMode = 'profile';
    newStepFunction;
    selectableStepFunctions = [];
    mode = null;
    functionEditorSettings;

    constructor(private store: Store) {
        this.store.select('ui.graphContainer.selectedNodeId', { state: true, bind: [this, 'nodeId'] })
            .subscribe(id => {
                if (id !== null) this.update(id);
            })
        this.store.select('graph.id')
            .subscribe(id => {
                this.form = {};
                this.selectableStepFunctions = [];
            })
    }

    refresh() {
        console.log('new node');
    }

    toggled(s) {
        console.log('toggled', s)
    }

    selectActivationSource(c) {
        console.log(c)
    }

    update(id) {
        this.buildNodeModel(id);
    }

    buildNodeModel(id) {
        let graph = this.store.getPresentState().graph;

        this.nodeData = graph.nodesData[id];
        this.form.name = this.nodeData.name;
        this.form.type = this.nodeData.type;
        
        this.selectableStepFunctions = _.filter(stepFunctions, fn => {
            return fn.dataTypes.some(dt => {
                return dt === this.nodeData.dataType;
            })
        })

        this.functionEditorSettings = {
            currentFunctions: this.nodeData.stepFunctions.map(fn =>JSON.parse(JSON.stringify(fn))),
            selectableFunctions: this.selectableStepFunctions
        }

    }

    

    submit() {
        if(this.tabMode === 'profile') {
            this.store.actions.graph.updateNodeData({ ...this.nodeData, ...this.form });
        }
        if(this.tabMode === 'functions') {
            if(this.functionEditorSettings.newFunction) {
                this.form.stepFunctions = this.nodeData.stepFunctions.concat({...this.functionEditorSettings.newFunction});
                
                this.store.actions.graph.updateNodeData({ ...this.nodeData, ...this.form });
                this.newStepFunction = null;
                
            }
        }
       
        this.store.actions.graph.applyDisplayFunctions();
    }

    save() {

    }

}