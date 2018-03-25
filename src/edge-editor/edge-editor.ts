import { inject, bindable, observable } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';
import { _ } from 'underscore';
import { linkFunctions } from 'reducers/traversal/linkFunctions';

@inject(Store)
export class EdgeEditor {
   edgeId;
   @bindable edgeData = false;
   conditions;
   tabMode = 'profile';
   functionEditorSettings;
   selectableLinkFunctions;
   form = {}

    constructor(private store: Store) {
        this.store.select('ui.graphContainer.selectedEdgeId', {bind: [this, 'edgeId']})
        .subscribe(id => {
            console.log('edge id...', id)
            if (id !== null) {
                let s = this.store.getPresentState();
                // this.buildEdgeModel(id);
                this.edgeData = true;
                // this.edgeData = {...s.graph.edgesData[id]};
            } else {
                this.edgeData = false;
                //this.edgeData = null;
                alert('edge data null')
            }
        })
    }

    buildEdgeModel(id) {
        
        // this.conditions = s.graph.conditionsIds
        //     .map(id => s.graph.conditions[id])
        //     .filter(cond => cond.target === this.edgeData.id);

        // this.store.select(`graph.edgesData.${id}`, {bind: [this, 'edgeData']})
        // this.store.select('graph.conditions').subscribe(conds => {
            
        // })

        // this.selectableLinkFunctions = linkFunctions;
        
        // this.selectableLinkFunctions = _.filter(linkFunctions, fn => {
        //     // return fn.dataTypes.some(dt => {
        //     //     return dt === this.nodeData.dataType;
        //     // })
        //     return true;
        // })

        // this.functionEditorSettings = {
        //     currentFunctions: this.edgeData.linkFunctions.map(fn =>JSON.parse(JSON.stringify(fn))),
        //     selectableFunctions: this.selectableLinkFunctions,
        // }
    }  

    toggleActive(x) {
        this.store.actions.graph.toggleEdgeActivation(this.edgeData.id)
            .actions.graph.applyDisplayFunctions();
    }

    save() {
        // this.conditions.forEach(cond => {
        //     this.store.actions.graph.updateConditionExpression(cond);
        // })
        // this.store.actions.graph.applyConditions();
        // this.store.actions.graph.applyDisplayFunctions();

        if(this.tabMode === 'profile') {
            this.store.actions.graph.updateNodeData({ ...this.edgeData, ...this.form });
        }
        if(this.tabMode === 'functions') {
            this.form.linkFunctions = this.functionEditorSettings.currentFunctions;
            if(this.functionEditorSettings.newFunction) {
                this.form.linkFunctions = this.form.linkFunctions.concat({...this.functionEditorSettings.newFunction});
            }
            this.store.actions.graph.updateEdgeData({ ...this.edgeData, ...this.form }); 
        }
       
        this.store.actions.graph.applyDisplayFunctions();
    }

}