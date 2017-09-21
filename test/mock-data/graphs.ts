let simple = {
    displaySettings: {
        defaultEdgeColor: 'black',
        defaultNodeColor: 'gray',
        activeNodeColor: 'green',
        activeEdgeColor: 'green',
        defaultNodeSize: 50,
    },
    sigmaSettings: {
        doubleClickZoomingRatio: 1,
        maxNodeSize: 50,
        minNodeSize: 0,
        minEdgeSize: 5,
        maxEdgeSize: 5,
        minArrowSize: 25,
        enableEdgeHovering: true,
    },
    graph: {
        data: {
            nodesInitial: {
                displayFunctions: ['idByIndex', 'toggle', 'sizeByValue', 'labelById', 'randomPosition'],
            }
        },
        nodes: [
            {
                data: {
                    active: true,
                    value: 10,
                    stepFunctions: [],
                    displayFunctions: ['toggle', 'sizeByValue',],
                },
            },
            {
                data: {
                    active: false,
                    value: 0,
                    stepFunctions: [{ name: 'activate', argument: 5 }],
                    displayFunctions: ['toggle', 'sizeByValue'],
                }
            },
            {
                data: {
                    active: false,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: ['toggle', 'sizeByValue'],
                }
            }],

        edges: [
            {
                data: {
                    linkFunction: 'transfer',
                    stepFunctions: null,
                },
                source: 'n1',
                target: 'n2',
            },
            {
                data: {
                    linkFunction: 'transfer',
                    stepFunctions: null,
                },
                source: 'n2',
                target: 'n3',
            }
        ]
    }
}

export { simple };