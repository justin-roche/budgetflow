

import { conditionalGraph } from './value-conditional.mock-data';

let base = JSON.parse(JSON.stringify(conditionalGraph));
let extension = {
    id: 'g10',
    data: {
        id: 'g10',
        name: 'time-conditional',
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
                value: 2000000000,
                name: '2000000000'
            },
            effect: {
                value: 'activate',
                name: 'activate',
            }
        }
    },

}

let timeConditional = Object.assign(base, extension);
export {timeConditional}