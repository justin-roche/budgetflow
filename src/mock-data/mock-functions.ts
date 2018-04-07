
let ADD_ONE = {
    name: 'salary',
    operator: {
        value: '+',
    },
    object: {
        value: 1,
    }
}

let TRANSFER_ONE = {
    operator: { value: 'transfer' },
    object: { value: 1 },
}

let SUM = {
    operator: {value: 'sum'},
    object: {}
}

let SET_ZERO = {
    operator: {value: '='},
    object: {value: 0}
}

let nodeFunctionTemplates = {
    ADD_ONE,
    SET_ZERO
}

let linkFunctionTemplates = {
    TRANSFER_ONE,
    SUM
}

export { nodeFunctionTemplates, linkFunctionTemplates };