let singleNode: Graph = {

    id: 'g1',
    data: {
        id: 'g1',
        name: '1 node',
        displayFunctions: { nodes: [{ name: 'labelByName', arguments: [] }] },
    },
    nodesIds: ['n0'],
    nodes: {
        'n0': {
            id: 'n0',
            outEdges: [],
            inEdges: [],

        },
    },
    nodesData: <NodesData>{
        'n0': <NodeData>{
            id: 'n0',
            name: null,
            type: 'source',
            dataType: 'money',
            active: true,
            value: 0,
            stepFunctions: ['f1'],
            displayFunctions: [],
            displayData: { outlineColor: 'blue' },
        }
    },
    edgesIds: [],
    edges: {

    },
    edgesData: {

    },
    functions: {
        'f1': {
                name: 'add',
                arguments: {amount: {value: 1}},
        }
    },
    conditions: [],
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

export { singleNode }