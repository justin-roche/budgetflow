let simple = {

    ui: {
        graphContainer: {
            defaultEdgeColor: 'black',
            defaultNodeColor: 'gray',
            activeNodeColor: 'green',
            activeEdgeColor: 'green',
            defaultNodeSize: 50,
        },
        sigma: {
            doubleClickZoomingRatio: 1,
            maxNodeSize: 50,
            minNodeSize: 10,
            minEdgeSize: 5,
            maxEdgeSize: 5,
            minArrowSize: 25,
            enableEdgeHovering: true,
        },
    },
    graphs: [{
        data: {
            name: 'linear 2x'
            // nodesInitial: {
            //     displayFunctions: ['toggle', 'sizeByValue', 'labelById'],
            // }
        },
        nodes: [
            {
                id: 'n1', x: Math.random(), y: Math.random(),
                data: {
                    active: true,
                    value: 10,
                    stepFunctions: [],
                    displayFunctions: ['toggle', 'sizeByValue',],
                },
            },
            {
                id: 'n2', x: Math.random(), y: Math.random(),
                data: {
                    active: false,
                    value: 0,
                    stepFunctions: [{ name: 'activate', argument: 5 }],
                    displayFunctions: ['toggle', 'sizeByValue'],
                }
            },
            ],

        edges: [
            {
                id: 'e1',
                data: {
                    linkFunction: 'transfer',
                    stepFunctions: null,
                },
                source: 'n1',
                target: 'n2',
                color: 'black',
                size: 50,
                type: 'arrow'
            },
        ]
    },
    {
        data: {
            name: 'linear 3x'
            // nodesInitial: {
            //     displayFunctions: ['toggle', 'sizeByValue', 'labelById'],
            // }
        },
        nodes: [
            {
                id: 'n1', x: Math.random(), y: Math.random(),
                data: {
                    active: true,
                    value: 10,
                    stepFunctions: [],
                    displayFunctions: ['toggle', 'sizeByValue',],
                },
            },
            {
                id: 'n2', x: Math.random(), y: Math.random(),
                data: {
                    active: false,
                    value: 0,
                    stepFunctions: [{ name: 'activate', argument: 5 }],
                    displayFunctions: ['toggle', 'sizeByValue'],
                }
            },
            {
                id: 'n3', x: Math.random(), y: Math.random(),
                data: {
                    active: false,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: ['toggle', 'sizeByValue'],
                }
            }],

        edges: [
            {
                id: 'e1',
                data: {
                    linkFunction: 'transfer',
                    stepFunctions: null,
                },
                source: 'n1',
                target: 'n2',
                color: 'black',
                size: 50,
                type: 'arrow'
            },
            {
                id: 'e2',
                data: {
                    linkFunction: 'transfer',
                    stepFunctions: null,
                },
                source: 'n2',
                target: 'n3',
                color: 'black',
                size: 50,
                type: 'arrow'
            }
        ]
    },
    ],
}

export { simple };