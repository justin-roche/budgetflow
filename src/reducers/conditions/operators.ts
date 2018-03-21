let operators = {

    '>': function (arg1, arg2) {
        return arg1 > arg2;
    },
    '<': function (arg1, arg2) {
        return arg1 < arg2;
    },
    '>=': function (arg1, arg2) {
        return arg1 >= arg2;
    },
    '<=': function (arg1, arg2) {
        return arg1 <= arg2;
    },

    'activate': function(target) {
        return Object.assign(target, {active: true});
    },
    'deactivate': function(target) {
        return Object.assign({}, target, {active: false});
    }
}

export { operators };