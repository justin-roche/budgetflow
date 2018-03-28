let linkFunctions = {

    transfer: {
        config: {
            name: 'transfer',
            arguments: {
                amount: 1,
            },
            dataTypes: ['money'],
        },
        fn: function (arg: FunctionArgs) {
            let sourceNode: any = arg.source;
            let targetNode: any = arg.target;
            let args: ArgumentData = arg.config.arguments;
            console.warn('args', JSON.stringify(args));
            targetNode.value = targetNode.value + args['amount'].value
            sourceNode.value = sourceNode.value - args['amount'].value
            return {
                source: sourceNode,
                target: targetNode
            };
        },
    },

    /* a transducer does not subtract from the original node, only increases the target node, because it is a different type of information */
    transduce: {
        config: {
            name: 'transduce',
            arguments: {
                dataType: 1,
                ratio: 1,
            },
            dataTypes: [],
        },
        fn: function (sourceNode, targetNode, amount, integral) {
            targetNode.value = targetNode.value + (amount * integral || 1)
            return {
                source: sourceNode,
                target: targetNode
            };
        },

    }

}

export { linkFunctions }