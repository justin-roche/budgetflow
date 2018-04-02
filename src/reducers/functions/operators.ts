let nodeOperators = {

    '+': function (arg1, arg2) {
        arg1.value = arg1.value + arg2;
    },
    '-': function (arg1, arg2) {
        arg1.value = arg1.value - arg2;
    },
    '*': function (arg1, arg2) {
        arg1.value = arg1.value * arg2;
    },
    '/': function (arg1, arg2) {
        arg1.value = arg1.value / arg2;
    },

}

let linkOperators = {
    'transfer': function (arg1, arg2, arg3) {
        arg1.value = arg1.value + arg2;
        arg3.value = arg3.value - arg2;
    },
    'sum': function(arg1, arg2, arg3) {
        arg1.value =arg1.value + arg2;
    }
    // '-': function (arg1, arg2) {
    //     arg1.value = arg1.value - arg2;
    //     arg3.value = arg3.value + arg2;
    // },
    // '*': function (arg1, arg2) {
    //     arg1.value = arg1.value * arg2;
    // },
    // '/': function (arg1, arg2) {
    //     arg1.value = arg1.value / arg2;
    // },
}

export { nodeOperators, linkOperators };