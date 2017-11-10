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
            type: 'source',
            active: true,
            value: 0,
            stepFunctions: [
                {
                    name: 'increment',
                    arguments: [1]
                }
            ],
            displayFunctions: [],
            displayData: { outlineColor: 'blue' },
        }
    },
    edges: {

    },
    edgesData: {

    }
}

export { singleNode }