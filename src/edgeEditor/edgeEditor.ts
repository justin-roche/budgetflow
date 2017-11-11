import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';

@inject(Store)
export class EdgeEditor {
   edgeId;
   edgeData;
   conditions;

    constructor(private store: Store) {
        this.store.select('ui.graphContainer.selectedEdgeId', {bind: [this, 'edgeId']})
        .subscribe(id => {
            if (id !== null) {
                let s = this.store.getPresentState();
                this.edgeData = {...s.graph.edgesData[id]};
                this.conditions = s.graph.conditionsIds
                    .map(id => s.graph.conditions[id])
                    .filter(cond => cond.target === this.edgeData.id);
                this.store.select(`graph.edgesData.${id}`, {bind: [this, 'edgeData']})
                this.store.select('graph.conditions').subscribe(conds => {
                    
                })
                
            
            }
        })
    }

    toggleActive(x) {
        this.store.actions.graph.toggleEdgeActivation(this.edgeData.id)
            .actions.graph.applyDisplayFunctions();
    }

    save() {
        console.log(this.conditions);
        this.conditions.forEach(cond => {
            this.store.actions.graph.updateConditionExpression(cond);
        })
        this.store.actions.graph.applyConditions();
        this.store.actions.graph.applyDisplayFunctions();
    }

}