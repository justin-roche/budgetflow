let stepFunctions = {

    add: {
        config: {
            name: 'add',
            arguments: {
                amount: 1,
            },
            dataTypes: ['money'],
        },
        fn: function (arg: FunctionArgs) {
            let graph = arg.graph;
            let nodeData = arg.target;
            let args = arg.config.arguments;
            console.warn('args', args)
            return { value: nodeData.value + args.amount.value }
        },
    },

    interest: {
        config: {
            name: 'interest',
            arguments: {
                rate: .05,
            },
            dataTypes: ['money'],
        },
        fn: function (state, nodeData, args) {
            return { value: nodeData.value + (nodeData.value * args.rate) }
        },
    },

}


export { stepFunctions };