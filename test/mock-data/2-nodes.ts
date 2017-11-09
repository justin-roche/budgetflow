let twoNodes = {
    id: 'g2',
    data: <GraphData>{
        id: 'g2',
        name: '2 nodes',
        displayFunctions: {
            nodes: [{ name: 'labelById', arguments: [] }],
        }
    },
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
            id: 'n0',
            active: true,
            value: 10,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {}
        },
        'n1': {
            type: 'sink',
            id: 'n1',
            active: true,
            value: 0,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {}
        }
    },
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
    }
}

export { twoNodes };