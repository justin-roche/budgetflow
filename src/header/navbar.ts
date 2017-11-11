import { Store } from './../services/reduxStore';
import { inject, bindable } from 'aurelia-framework';
import { downloadText } from 'download.js';

@inject(Store)
export class NavBar {

    @bindable router;
    graph;

    constructor(private store: Store) {
        this.store.select('graph', {bind: [this,'graph']});
    }

    toggleScenarioEditor() {
        this.store.dispatch({ type: 'UI_SCENARIO_EDITOR_TOGGLE' });        
    }

    toggleNodeEditor() {
        this.store.dispatch({ type: 'UI_NODE_EDITOR_TOGGLE' });        
    }

    toggleEdgeEditor() {
        this.store.actions.ui.toggleEdgeEditor();
    }

    downloadGraph() {
        downloadText(this.graph.data.name + '.txt', JSON.stringify(this.graph))        
    }

    updateDisplay() {
        this.store.actions.graph.applyDisplayFunctions();
    }

    evaluateConditions() {
        this.store.actions.graph.conditionsApply();
    }

    test() {
        // this.store.actions.graph.traverse();
        //
        //this.store.actions.graph.deleteEdge('e0')
        
    }

}