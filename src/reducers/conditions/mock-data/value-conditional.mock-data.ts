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
            active: true,
            value: 10,
            nodeFunctions: [],
            displayFunctions: [],
            displayData: {}
        },
        'n1': {
            id: 'n1',
            ype: 'sink',
            active: true,
            value: 0,
            nodeFunctions: [],
            displayFunctions: [],
            displayData: {}
        },
        'n2': {
            id: 'n2',
            source: false,
            active: true,
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
            linkFunctions: ['f1'],
            active: true,
        },

        'e1': {
            id: 'e1',
            linkFunctions: ['f1'],
            conditionFunctions: ['c0'],
            active: true,
        },
    },
    nodeFunctions: {

    },
    linkFunctions: {
        'f1': {
             operator: {value: 'transfer'},
             object: {value: 1}, 
        }
    },
    conditions: <ConditionsData> {
        'c0': {
            subject:{
                value: 'nodesData.n1.value',
                name: 'n1'
            },
            operator: {
                value: '>',
                name: '>'
            },
            object: {
                value: 0,
                name: '0',
            },
            effect: {
                value: 'activate',
                name: 'activate',
            }
        }
        
    },
    simulation: <Simulation> {
        on: false,
        cycleTime: 24 * 60 * 60 * 1000, //cycle time is one day
        beginRangeTime: 2000000000,
        endRangeTime: 2100000000,
        currentTime: 2000000000,
        targetTime: null,
        remainingCycles: 0,
        forward: null,
    }  
    
}

export { conditionalGraph }