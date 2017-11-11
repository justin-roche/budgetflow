import { inject, bindable } from 'aurelia-framework';
import { Store } from './../services/reduxStore';


@inject(Store)
export class ConditionalEditor {

    conditionals = [];
    tests = [];
    inputConditional: String = 'n1 > 10'

    constructor(private store: Store) {
        

    }

    addConditional() {
        let parsed = this.parseStatement(this.inputConditional);
        this.conditionals.push(this.inputConditional);
        console.log(this.conditionals)
        this.inputConditional = '';
    }

    parseStatement(statement) {
        // let [subject, predicate, object] = statement.split(' ');
        // let fn = { name: 'derive', phase: 'prelink', arguments: ['active', 'source.value ' + predicate + ' ' + object] };

        // let inEdge = this.nodeModel.inEdges.filter(ed => ed.source === subject)[0];
        // let inEdgeData = this.nodeModel.inEdgesData.filter(ed => ed.id === inEdge.id)[0];

        // if (inEdge) {
        //     inEdgeData = {...inEdgeData, linkFunctions: {...inEdgeData.linkFunctions, }}
        //     this.store.dispatch({ type: 'EDGE_LINK_FUNCTION_ADD', payload: { edge: inEdge, function: fn } });
        // } else {
        //     let edge = { source: subject, target: this.nodeModel.node.id };
        //     let edgeData = { linkFunctions: [fn] };
        //     this.store.dispatch({ type: 'EDGE_ADD', payload: { description: edge, data: edgeData } });
        // }
    }

    getConditionals() {
        return this.conditionals;
    }

    nodeModelChanged() {
        console.log('nm changed', this.nodeModel)
    }

    selectActivationSource() {

    }


}