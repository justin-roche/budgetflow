import { _ } from 'underscore';

export class TemplateModel {
    
    base = {

        availableEffects: [
            {value: 'activate', name: 'activate' },
            {value: 'deactivate', name: 'deactivate'}
        ],
    
        availableSubjectTypes: [
            { value: 'node', name: 'node' },
            { value: 'simulation', name: 'simulation' }
        ],
    
        availableOperators: [
            '>', 
            '<', 
            '=', 
            '<=', 
            '>='
        ],
    
        availableObjectTypes: [
            { value: 'node', name: 'node' },
            { value: 'simulation', name: 'simulation' }
        ],
    
        /* the path for the subject property */
        availableSubjectProperties: {
            node: [
                {value: 'value',name: 'value'}
            ],
            simulation: [
                { value: 'currentTime', name: 'time' }
            ],
        },
        objectProperties: [],
        dataTypes: [],
    
        /* effects always apply to link that has the condition */
    };

    computed = {}

    compute(dataModel) {
        this.computed = _.clone(this.base);
        // computed.availableSubjectTypes = computed.availableSubjectTypes.filter()
    }

};
