import { _ } from 'underscore';

export class TemplateModel {
    
    base = {

        availableNodeTypes: [
            {value: 'sum', name: 'sum' },
            {value: 'salary', name: 'salary'},
            {value: 'expense', name: 'expense'},
        ],
    
       
    };

    computed = {}

    compute(dataModel) {
        this.computed = _.clone(this.base);
        // computed.availableSubjectTypes = computed.availableSubjectTypes.filter()
    }

};
