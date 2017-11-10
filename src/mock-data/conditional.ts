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
            expression: 'true',
            value: false,
            scope: 'sufficient'
        }
        
    }
    
}

export { conditionalGraph }