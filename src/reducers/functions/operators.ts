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
    '=': function(target, arg2) {
        target.value = arg2;
    }
}

let linkOperators = {
    'transfer': function (target, amt, source) {
        target.value = target.value + amt;
        source.value = source.value - amt;
    },
    'sum': function(target, arg2, source) {
        target.value =target.value + source.value;
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