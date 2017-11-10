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
        this.store.select('ui.graphContainer.selectedEdgeId', {log: true, bind: [this, 'edgeId']})
        .subscribe(id => {
            if (id !== null) {
                let s = this.store.getPresentState();
                this.edgeData = {...s.graph.edgesData[id]};
                this.store.select(`graph.edgesData.${id}`, {log: true, bind: [this, 'edgeData']})
                this.store.select('graph.conditions').subscribe(conds => {
                    
                })
                
            
            }
        })
    }

    toggleActive(x) {
        this.store.actions.graph.toggleEdgeActivation(this.edgeData.id)
            .actions.graph.applyDisplayFunctions();
    }

}