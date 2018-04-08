
import { nodeFunctionTemplates, linkFunctionTemplates} from '../mock-data/mock-functions'

let nodeTypes = [
    {name: 'salary',
    nodeFunctions: [nodeFunctionTemplates.ADD_ONE],
    linkFunctions: [linkFunctionTemplates.TRANSFER_ONE],
    source: true,
    direction: 'source'
    },
    {name: 'sum',
    linkFunctions: [linkFunctionTemplates.SUM],
    nodeFunctions: [nodeFunctionTemplates.SET_ZERO],
    source: true,
    direction: 'source',
    value: 0
    }
]

export {nodeTypes};