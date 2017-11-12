let stepFunctions = {

    add: {

        name: 'add',
        arguments: {
            amount: null,
        },
        fn: function (state, nodeData, args) {
            return { value: nodeData.value + args.amount }
        },
    },

    interest: {

        name: 'interest',
        arguments: {
            rate: null,
            frequency: null,
        },
        fn: function (args, nodeData) {
            return { value: nodeData.value + nodeData.value * args.rate }
        },
    },

}


export { stepFunctions };