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
            x: 1000,
            y: 1000
        },
    },
    nodesData: <NodesData>{
        'n0': <NodeData>{
            id: 'n0',
            name: null,
            source: true,
            dataType: 'money',
            active: true,
            value: 0,
            nodeFunctions: ['f1'],
            displayFunctions: [],
            displayData: { outlineColor: 'blue' },
        }
    },
    edgesIds: [],
    edges: {

    },
    edgesData: {

    },
    nodeFunctions: {
        'f1': {
            operator: {
                value: '+',
            },
            object: {
                value: 1,
            }
        }
    },
    conditions: [],
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