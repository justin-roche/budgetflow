import { Simulator } from './../simulator/simulator';
import { Store } from './../services/reduxStore';
import { inject } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';

@inject(Store, Simulator)
export class Home {
    private showScenarioEditor;
    private showNodeEditor;

    constructor(private store: Store, private sim: Simulator) {
        this.store.select('ui.scenarioEditor.show').subscribe(d => {
            this.showScenarioEditor = d;
        });
        this.store.select('ui.nodeEditor.show').subscribe(d => {
            this.showNodeEditor = d;
        });
    }

}