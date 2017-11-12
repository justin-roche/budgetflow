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