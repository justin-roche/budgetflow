let singleNode = {

    id: 'g1',
    data: {
        id: 'g1',
        name: '1 node',
        displayFunctions: { nodes: [{ name: 'labelById', arguments: [] }] },
    },
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
            active: true,
            value: 0,
            stepFunctions: [
                {
                    name: 'add',
                    arguments: {amount: 1},
                }
            ],
            displayFunctions: [],
            displayData: { outlineColor: 'blue' },
        }
    },
    edges: {

    },
    edgesData: {

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

export { singleNode }