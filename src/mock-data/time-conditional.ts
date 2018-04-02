let conditionalGraph: Graph = {
    id: 'g3',
    data: {
        id: 'g3',
        name: 'conditional',
        displayFunctions: { nodes: [{ name: 'labelById' }, {name: 'inactivateByLinks'}] }
    },
    nodesIds: ['n0','n1','n2'],
    nodes: {
        'n0': {
            id: 'n0',
            outEdges: ['e0'],
            inEdges: [],
        },
        'n1': {
            id: 'n1',
            outEdges: ['e1'],
            inEdges: ['e0']
        },
        'n2': {
            id: 'n2',
            outEdges: [],
            inEdges: ['e1']
        }
    },
    nodesData: {
        'n0': {
            id: 'n0',
            source: true,
            //active: true,
            value: 10,
            nodeFunctions: [],
            displayFunctions: [],
            displayData: {}
        },
        'n1': {
            id: 'n1',
            source: false,
            //active: true,
            value: 0,
            nodeFunctions: [],
            displayFunctions: [],
            displayData: {}
        },
        'n2': {
            id: 'n2',
            source: false,
            //active: true,
            value: 0,
            nodeFunctions: [],
            displayFunctions: [],
            displayData: {},
        }
    },
    edgesIds: ['e0','e1'],
    edges: {
        'e0': {
            id: 'e0',
            source: 'n0',
            target: 'n1',
        },
        'e1': {
            id: 'e1',
            source: 'n1',
            target: 'n2',
        }
    },
    edgesData: {
        'e0': {
            id: 'e0',
            linkFunctions: [{ name: 'transfer', arguments: [1] }],
            active: true,
        },

        'e1': {
            id: 'e1',
            linkFunctions: [{ name: 'transfer', arguments: [1] }],
            active: false,
        },
    },
    conditionsIds: ['c0'],
    conditions: {
        'c0': {
            id: 'c0',
            type: 'edge',
            target: 'e1',
            phase: 'simulation',
            expression: 'state.simulation.currentTime > ',
            value: false,
            scope: 'sufficient'
        }
        
    },
    simulation: <Simulation>{
        on: false,
        cycleTime: 24 * 60 * 60 * 1000, //cycle time is one day
        beginRangeTime: new Date().getTime(),
        endRangeTime: new Date('2019').getTime(),
        currentTime: new Date().getTime(),
        targetTime: null,
        remainingCycles: 0,
        forward: null,
    },
    
}

export { conditionalGraph }