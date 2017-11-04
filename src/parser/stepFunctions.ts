let stepFunctions = {
    
    increment: function (nodeData, argument) {
        return { value: nodeData.value + argument }
    },
    
    equal: function (value, node) {
        return value;
    },
    
}


export { stepFunctions };