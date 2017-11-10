
import {conditionalGraph} from './mock-data/conditional';
import {singleNode} from './mock-data/singleNode';
import {twoNodes} from './mock-data/twoNodes';
import {tree} from './mock-data/tree';

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
    },
    simulation: <Simulation>{
        on: false,
        cycleTime: 24 * 60 * 60 * 1000,
        beginRangeTime: new Date().getTime(),
        endRangeTime: new Date('2019').getTime(),
        currentTime: new Date().getTime(),
        targetTime: null,
        remainingCycles: 0,
        cache: {},
    },
    graph: null,
    graphs: <Array<Graph>>[
        conditionalGraph, singleNode, twoNodes, tree
    ],
}

export { state };