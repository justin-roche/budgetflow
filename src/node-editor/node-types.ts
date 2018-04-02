
import { nodeFunctionTemplates, linkFunctionTemplates} from '../mock-data/mock-functions'

let nodeTypes = [
    {name: 'salary',
    nodeFunctions: [nodeFunctionTemplates.ADD_ONE],
    linkFunctions: [linkFunctionTemplates.TRANSFER_ONE],
    source: true,
    direction: 'out'
    },
    {name: 'sum',
    linkFunctions: [linkFunctionTemplates.SUM],
    source: false,
    direction: 'in',
    nodeFunctions: [],
    }
]

export {nodeTypes};