import { _ } from 'underscore';
import { linkFunctionTemplates} from '../../mock-data/mock-functions';

let TRANSFER_ONE = {
    operator: { value: 'transfer' },
    object: { value: 1 },
    name: 'transfer'
}

let SUM = {
    name: 'sum',
    operator: {value: 'sum'},
    object: {}
}

export class TemplateModel {
    
    base = {

        availableFunctions: [TRANSFER_ONE, SUM]
    
    };

    computed = {}

    compute(dataModel) {
        this.computed = _.clone(this.base);
        // computed.availableSubjectTypes = computed.availableSubjectTypes.filter()
    }

};

