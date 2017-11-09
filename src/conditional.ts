let conditionalGraph: Graph = {
    id: 'g3',
    data: {
        id: 'g3',
        name: 'conditional',
        displayFunctions: { nodes: [{ name: 'labelById' }, {name: 'inactivateByLinks'}] }
    },
    nodes: {
        'n0': {
            id: 'n0',
            outEdges: ['e1'],
            inEdges: [],
        },
        'n1': {
            id: 'n1',
            outEdges: ['e2'],
            inEdges: ['e1']
        },
        'n2': {
            id: 'n2',
            outEdges: [],
            inEdges: ['e2']
        }
    },
    nodesData: {
        'n0': {
            id: 'n0',
            type: 'source',
            //active: true,
            value: 10,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {}
        },
        'n1': {
            id: 'n1',
            type: 'sink',
            //active: true,
            value: 0,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {}
        },
        'n2': {
            id: 'n2',
            type: 'sink',
            //active: true,
            value: 0,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {},
        }
    },
   
    edges: {
        'e1': {
            id: 'e1',
            source: 'n0',
            target: 'n1',
        },
        'e2': {
            id: 'e2',
            source: 'n1',
            target: 'n2',
        }
    },
    edgesData: {
        'e1': {
            id: 'e1',
            linkFunctions: [{ name: 'transfer', arguments: [1] }],
            active: true,
        },

        'e2': {
            id: 'e2',
            linkFunctions: [{ name: 'transfer', arguments: [1] }],
            active: false,
        },
    },
    conditions: [{
        id: 'c0',
        type: 'edge',
        target: 'e2',
        phase: 'simulation',
        expression: 'state.simulation.currentTime > 0',
        value: false,
        scope: 'sufficient'
    }]
    
}

export { conditionalGraph }