import { _ } from 'underscore';
import { nodeTypes } from './node-types'

export class TemplateModel {
    
    base = {

        availableNodeTypes: nodeTypes,
    
    };

    computed = {}

    compute(dataModel) {
        this.computed = _.clone(this.base);
        // computed.availableSubjectTypes = computed.availableSubjectTypes.filter()
    }

};
