

let stepFunctions = {

    add: {
        config: {
            name: 'add',
            arguments: {
                amount: 1,
            },
            dataTypes: ['money'],
        },
        fn: function ({graph, target, config}) {
            let args = config.arguments;
            target.value = target.value + args.amount.value;
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