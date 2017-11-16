let linkFunctions = {

    transfer: {
        name: 'transfer',
        arguments: {
            amount: 1,
        },
        fn: function(sourceNode, targetNode, args) {
            return {source: {...sourceNode, value: sourceNode.value - args.amount},
                    target: {...targetNode, value: targetNode.value + args.amount}};
        },
        dataTypes: ['money'],
    },

    /* a transducer does not subtract from the original node, only increases the target node, because it is a different type of information */
    transduce: {
        name: 'transduce',
        arguments: {
            dataType: 1,
            ratio: 1,
        },
        fn: function(sourceNode, targetNode, amount, integral) {
            return {source: sourceNode,
            target: {...targetNode, value: targetNode.value + (amount * integral || 1)}};
        },
        dataTypes: [],
    }
    
}

export { linkFunctions }