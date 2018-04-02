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
        target.active = true;
    },
    'deactivate': function(target) {
        target.active = false;
    }
}

export { operators };