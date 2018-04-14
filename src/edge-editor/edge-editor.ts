import { inject, bindable, observable } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';
import { _ } from 'underscore';

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
            }
        })
    }

    buildEdgeModel(id) {
        
    }

    toggleActive(x) {
        this.store.actions.graph.toggleEdgeActivation(this.edgeData.id)
            .actions.graph.applyDisplayFunctions();
    }

    save() {

    }
       

}