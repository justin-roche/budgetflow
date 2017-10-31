import { Store } from './../services/reduxStore';
import { inject, bindable } from 'aurelia-framework';

@inject(Store)
export class NavBar {

    @bindable router;

    constructor(private store: Store) {
        
    }

    toggleScenarioEditor() {
        this.store.dispatch({ type: 'UI_SCENARIO_EDITOR_TOGGLE' });        
    }

    toggleNodeEditor() {
        this.store.dispatch({ type: 'UI_NODE_EDITOR_TOGGLE' });        
    }

}