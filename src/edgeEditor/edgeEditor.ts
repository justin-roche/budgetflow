import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';

@inject(Store)
export class EdgeEditor {
   edgeId;
   edgeData;

    constructor(private store: Store) {
        this.store.select('ui.graphContainer.selectedEdgeId', {log: true, bind: [this, 'edgeId']}).subscribe(id => {
            if (id !== null) {
                let g = this.store.getPresentState().graph;
                if(g) {
                    this.edgeData = {...g.edgesData[id]};
                }
            }
        })
    }

    toggleActive(x) {
        console.log('active?', this.edgeData)
    }

}