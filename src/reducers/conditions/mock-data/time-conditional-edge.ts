

import { conditionalGraph } from './value-conditional.mock-data';

let base = JSON.parse(JSON.stringify(conditionalGraph));
let extension = {
    id: 'g11',
    data: {
        id: 'g11',
        name: 'time-conditional-edge',
        displayFunctions: { nodes: [{ name: 'labelById' }, {name: 'inactivateByLinks'}] }
    },
    conditions: <ConditionsData> {
        'c0': {
            subject:{
                name: 'time',
                value: 'simulation.currentTime',
            },
            operator: {
                value: '>',
                name: '>'
            },
            object: {
                value: 2100000000,
                name: '2100000000'
            },
            effect: {
                value: 'activate',
                name: 'activate',
            }
        }
    },
    edgesData: {
        'e0': {
            id: 'e0',
            linkFunctions: ['f1'],
            active: true,
        },

        'e1': {
            id: 'e1',
            linkFunctions: ['f1'],
            conditionFunctions: ['c0'],
            active: false,
        },
    },

}

let timeEdgeConditional = Object.assign(base, extension);
export {timeEdgeConditional}