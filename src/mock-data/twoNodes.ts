let twoNodes: Graph = {
    id: 'g2',
    data: <GraphData>{
        id: 'g2',
        name: 'twoNodes',
        displayFunctions: {
            nodes: [{ name: 'labelByName', arguments: [] }],
        }
    },
    nodesIds: ['n0','n1'],
    nodes: {
        'n0': {
            id: 'n0',
            outEdges: ['e0'],
            inEdges: [],
        },
        'n1': {
            id: 'n1',
            inEdges: ['e0'],
            outEdges: [],
        },
    },
    nodesData: <NodesData>{
        'n0': {
            type: 'source',
            dataType: 'money',
            name: null,
            id: 'n0',
            active: true,
            value: 10,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {}
        },
        'n1': {
            type: 'sink',
            dataType: 'money',
            id: 'n1',
            name: null,
            active: true,
            value: 0,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {}
        }
    },
    edgesIds: ['e0'],
    edges: <Edges>{
        'e0': {
            id: 'e0',
            active: true,
            source: 'n0',
            target: 'n1',
            type: 'arrow'
        },
    },
    edgesData: <EdgesData>{
        'e0': {
            id: 'e0',
            active: true,
            preLinkFunctions: [],
            linkFunctions: [{ name: 'transfer', arguments: [1] }],
            stepFunctions: null,
            conditions: [],
        },
    },
    conditions: {

    },
    conditionsIds: [],
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

export { twoNodes };