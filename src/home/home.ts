import { Store } from './../services/reduxStore';
import { inject } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';

@inject(Store)
export class Home {
    private showScenarioEditor;
    private showNodeEditor;

    constructor(private store: Store) {
        this.store.select('ui.scenarioEditor.show',{bind:[this,'showScenarioEditor']});
        this.store.select('ui.nodeEditor.show',{bind:[this,'showNodeEditor']});
    }

}