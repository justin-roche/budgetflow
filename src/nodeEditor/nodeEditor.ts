import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';
import { _ } from 'underscore';
import { stepFunctions } from 'parser/stepFunctions';
import { extend } from '../reducers/utilities';

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

        let node = graph.nodes[id];
        this.nodeData = graph.nodesData[id];
        this.form.name = this.nodeData.name;
        this.form.type = this.nodeData.type;
        this.form.stepFunctions = this.nodeData.stepFunctions.map(fn => {
            return {
                ...fn, ...{
                    _arguments: _.map(fn.arguments, (v, key) => {
                        return { name: key, value: v }
                    })
                }
            }
        });

        this.selectableStepFunctions = _.filter(stepFunctions, fn => {
            return fn.dataTypes.some(dt => {
                return dt === this.nodeData.dataType;
            })
        }).map(fn => {
            return {
                ...fn, ...{
                    _arguments: _.map(fn.arguments, (v, key) => {
                        return { name: key, value: fn.defaults[key] }
                    }),
                }
            }
        })
        console.log('ne form', this.form);

    }

    stepFunctionSelected(item) {
        
        this.newStepFunction = stepFunctions[item.name];
        let defaultedArguments = {};
        
        this.newStepFunction = {
            ... this.newStepFunction, ...{
                _arguments: _.map( this.newStepFunction.arguments, (v, key) => {
                    return { name: key, value:  this.newStepFunction.defaults[key] }
                }), // iterable arguments for template
            }
        };
        console.log('selected', this.newStepFunction)
    }

    submit() {
        if(this.tabMode === 'profile') {
            this.store.actions.graph.updateNodeData({ ...this.nodeData, ...this.form });
        }
        if(this.tabMode === 'functions') {
            if(this.newStepFunction) {
                this.form.stepFunctions = this.nodeData.stepFunctions.concat({...this.newStepFunction});
                this.store.actions.graph.updateNodeData({ ...this.nodeData, ...this.form });
                this.newStepFunction = null;
                
            }
        }
       
        this.store.actions.graph.applyDisplayFunctions();
    }

    save() {

    }

}