
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

let nodeFunctionTemplates = {
    ADD_ONE
}

let linkFunctionTemplates = {
    TRANSFER_ONE,
    SUM
}

export { nodeFunctionTemplates, linkFunctionTemplates };