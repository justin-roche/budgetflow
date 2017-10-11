import { inject, bindable } from 'aurelia-framework';
import { Store } from './../services/reduxStore';


@inject(Store)
export class ConditionalEditor {

    @bindable nodeModel;
    @bindable conditionals = [];
    tests = [];
    
    inputConditional;

    words = {
        regions: ['Node', 'Global'],
        subjects: [{region: 'Node', subjects: ['Value', 'Information']}
                    ],
        verbs: ['>', '<', '='],
        objects: [],
    }

    constructor(private store: Store){
        this.conditionals = ['y']
        this.tests = ['a']
        console.log('nodemodel', this.nodeModel)
    }

    attached(){
        console.log(this.nodeModel)
    }

    addConditional() {
        let parsed = this.parseStatement(this.inputConditional);
       
        this.conditionals.push(this.inputConditional);
        console.log(this.conditionals)
        this.inputConditional = '';
    }

    parseStatement(statement) {
        let [subject, predicate, object] = statement.split(' ');
        

        let fn = { name: 'derive', phase: 'prelink', arguments: ['active', 'source ' + predicate + ' ' + object]};
        
        let inEdge = this.nodeModel.inEdges.filter(ed => ed.source === subject)[0];
        if(inEdge){
            this.store.dispatch({type: 'LINK_FUNCTION_ADD', payload: {id: inEdge.id, function: fn}});
        }
    }

    getConditionals() {
        return this.conditionals;
    }

    nodeModelChanged() {
        console.log('nm changed', this.nodeModel)
    }

    toggleActive(){

    }

    selectActivationSource() {

    }


}