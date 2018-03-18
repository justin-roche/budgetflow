let stepFunctions = {

    add: {

        name: 'add',
        arguments: {
            amount: 1,
        },
        // defaults: {
        //     amount: 1
        // },
        fn: function (state, nodeData, args) {
            return { value: nodeData.value + args.amount }
        },
        dataTypes: ['money']
        
    },

    interest: {

        name: 'interest',
        arguments: {
            rate: .05,
        },
        fn: function (state, nodeData, args) {
            return { value: nodeData.value + (nodeData.value * args.rate) }
        },
        dataTypes: ['money']
    },

}


export { stepFunctions };