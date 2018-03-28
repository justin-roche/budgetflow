
import { conditionalGraph } from '../reducers/conditions/mock-data/value-conditional.mock-data';
import { timeConditional } from '../reducers/conditions/mock-data/time-conditional.mock-data';
import { timeEdgeConditional } from '../reducers/conditions/mock-data/time-conditional-edge';
import { singleNode } from '../reducers/traversal/mock-data/single-node.mock-data';
import { cycle } from '../reducers/traversal/mock-data/cycle.mock-data';

import { twoNodes } from '../reducers/traversal/mock-data/two-nodes.mock-data';
import { tree } from '../reducers/simulation/tree';

let state = {

    ui: {
        graphContainer: {
            show: true,
            defaultEdgeColor: 'black',
            defaultNodeColor: 'gray',
            activeNodeColor: 'green',
            activeEdgeColor: 'green',
            defaultNodeSize: 50,
            selectedNodeId: null,
            selectedEdgeId: null,
        },
        nodeEditor: {

            modalSettings: {
                title: 'Node Edit',
                id: 'nodeEditor',
                x: 0,
                y: 0,
                show: false,
            },
            nodeModel: {



            },

        },
        scenarioEditor: {

            modalSettings: {
                title: 'Scenario Edit',
                id: 'scenarioEditor',
                x: 0,
                y: 0,
                show: false,
            }
        },
        edgeEditor: {
            modalSettings: {
                title: 'Link Edit',
                id: 'edgeEditor',
                x: 0,
                y: 0,
                show: false,
            }
        },
        conditionalTable: {
            show: false,
        },
        interactivity: {
            selectedNode: null,
            selectedEdge: null,
        },
        timeSlider: {
            range: {
                min: 2000000000 * 1000,
                max: 2100000000 * 1000
            },
            start: [2000000000 * 1000],
            pips: {
                mode: 'positions',
                values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                density: 4
            },

            step: 1000 * 60 * 60 * 24 * 7,
        }
    },
    graph: null,
    graphs: <Array<Graph>>[
        conditionalGraph, 
        timeConditional, 
        timeEdgeConditional, 
        singleNode, 
        twoNodes, 
        tree,
        cycle
    ],
}

export { state };