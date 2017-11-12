let tree = {

    id: 'g7',
    data: <GraphData> {
        id: 'g7',
        name: 'tree',
        displayFunctions: { nodes: [{ name: 'labelById', arguments: []}] }
    },
    nodes: <Nodes> {
        'n0': {
            id: 'n0',
            x: 300,
            y: 50,
            //shape: 'square',
            outEdges: ['e0', 'e00'],
            inEdges: [],
        },
        'n1': {
            id: 'n1',
            x: 200,
            y: 100,
            inEdges: ['e0'],
            outEdges: ['e1', 'e2'],
        },
        'n2': {
            id: 'n2',
            x: 100,
            y: 200,
            inEdges: ['e1'],
            outEdges: [],
        },
        'n3': {
            id: 'n3',
            x: 300,
            y: 200,
            inEdges: ['e2'],
            outEdges: [],
        },
        'n4': {
            id: 'n4',
            x: 500,
            y: 100,
            inEdges: ['e00'],
            outEdges: ['e3', 'e4'],
        },
        'n5': {
            id: 'n5',
            x: 400,
            y: 200,
            outEdges: [],
            inEdges: ['e3'],
        },
        'n6': {
            id: 'n6',
            x: 600,
            y: 200,
            outEdges: [],
            inEdges: ['e4'],
        },
    },
    nodesData: {
        'n0':  <NodeData> {
            id: 'n0',
            name: null,
            type: 'source',
            active: true,
            value: 50,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {},
        },
        'n1':  <NodeData> {
            id: 'n1',
            name: null,
            type: 'sink',
            active: true,
            value: 0,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {},
        },
        'n2':  <NodeData> {
            id: 'n2',
            name: null,
            type: 'sink',
            active: true,
            value: 0,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {},
        },
        'n3':  <NodeData> {
            type: 'sink',
            name: null,
            id: 'n3',
            active: true,
            value: 0,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {},
        },
        'n4':  <NodeData> {
            type: 'sink',
            name: null,
            id: 'n4',
            active: true,
            value: 0,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {},
        },
        'n5':  <NodeData> {
            id: 'n5',
            name: null,
            type: 'sink',
            active: true,
            value: 0,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {},
        },
        'n6': <NodeData> {
            type: 'sink',
            name: null,
            id: 'n6',
            active: true,
            value: 0,
            stepFunctions: [],
            displayFunctions: [],
            displayData: {},
        },
    },
    edges: <Edges> {
        'e0': {
            id: 'e0',
            source: 'n0',
            target: 'n1',
            color: 'black',
            size: 50,
            type: 'arrow'
        },
        'e00': {
            id: 'e00',
            source: 'n0',
            target: 'n4',
            color: 'black',
            size: 50,
            type: 'arrow'
        },
        'e1': {
            id: 'e1',
            source: 'n1',
            target: 'n2',
            color: 'black',
            size: 50,
            type: 'arrow'
        },
        'e2': {
            id: 'e2',
            source: 'n1',
            target: 'n3',
            color: 'black',
            size: 50,
            type: 'arrow'
        },
        'e3': {
            id: 'e3',
            source: 'n4',
            target: 'n5',
            color: 'black',
            size: 50,
            type: 'arrow'
        },
        'e4': {
            id: 'e4',
            source: 'n4',
            target: 'n6',
            color: 'black',
            size: 50,
            type: 'arrow'
        },
    },
    edgesData: <EdgesData> {
        'e0': {
            active: true,
            id: 'e0',
            preLinkFunctions: [],
            linkFunctions: [{ name: 'transfer', arguments: [3] }],
        },
        'e00': {
            active: true,
            id: 'e00',
            preLinkFunctions: [],
            linkFunctions: [{ name: 'transfer', arguments: [3] }],
        },
        'e1': {
            id: 'e1',
            active: true,
            preLinkFunctions: [],
            linkFunctions: [{ name: 'transfer', arguments: [1] }],
        },
        'e2': {
            id: 'e2',
            active: true,
            preLinkFunctions: [],
            linkFunctions: [{ name: 'transfer', arguments: [1] }],
        },
        'e3': {
            id: 'e3',
            active: true,
            preLinkFunctions: [],
            linkFunctions: [{ name: 'transfer', arguments: [1] }],
        },
        'e4': {
            id: 'e4',
            active: true,
            preLinkFunctions: [],
            linkFunctions: [{ name: 'transfer', arguments: [1] }],
        },
    }
}

export { tree };