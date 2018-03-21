let conditionSettings = {
    availableSubjectTypes: [
        { value: 'node', name: 'node' },
        { value: 'simulation', name: 'simulation' }
    ],
    operators: ['>', '<', '=', '<=', '>='],
    availableObjectTypes: [
        { value: 'node', name: 'node' },
        { value: 'simulation', name: 'simulation' }
    ],

    /* the path for the subject property */
    subjectProperties: {
        node: [{ value: 'value', name: 'value' }],
        simulation: [{ value: 'currentTime', name: 'time' }],
    },
    objectProperties: [],
    dataTypes: [],

    /* effects always apply to link that has the condition */
    effectTypes: ['activate', 'deactivate'],
};

export { conditionSettings };