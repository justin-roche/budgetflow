let linkFunctions = {

    transfer: function(sourceNode, targetNode, amount) {
        return {source: {...sourceNode, value: sourceNode.value - amount},
                target: {...targetNode, value: targetNode.value + amount}};
    },

    /* a transducer does not subtract from the original node, only increases the target node, because it is a different type of information */
    transduce: function(sourceNode, targetNode, amount, integral) {
        return {source: sourceNode,
        target: {...targetNode, value: targetNode.value + (amount * integral || 1)}};
    },

    canActivate: function(g, edgeData, expression) {
        let testResult = eval(expression);
        return {...edgeData, active: testResult};
    }
}

export { linkFunctions }