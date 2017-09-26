let state = {

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
            minNodeSize: 0,
            minEdgeSize: 5,
            maxEdgeSize: 5,
            minArrowSize: 25,
            enableEdgeHovering: true,
        },
        interactivity: {
            selectedNode: null,
            selectedEdge: null,
        },
    },
    simulation: {
        time: null,
        step: null,
    },
    graph: null,
    graphs: [
        {
            data: {
                currentStep: 0,
                name: '1 node',
                displayFunctions: { nodes: ['labelById', 'sizeByValue'] }
            },
            nodes: {
                'n1': {
                    id: 'n1',
                    x: 100,
                    y: 100,
                    outEdges: [],
                    inEdges: [],
                },
            },
            nodesData: {
                'n1': {
                    active: true,
                    value: 10,
                    stepFunctions: [
                        {
                            name: 'increment',
                            arguments: 5
                        }
                    ],

                    displayFunctions: ['toggle'],
                }
            },
            edges: {

            },
            edgesData: {

            }
        },










        {
            data: {
                currentStep: 0,
                name: 'linear 2x',
                displayFunctions: { nodes: ['labelById', 'sizeByValue'] }
                // nodesInitial: {
                //     displayFunctions: ['toggle', 'sizeByValue', 'labelById'],
                // }
            },
            nodes: {
                'n1': {
                    id: 'n1',
                    x: Math.random(),
                    y: Math.random(),
                    outEdges: ['e1'],
                    inEdges: [],
                },
                'n2': {
                    id: 'n2',
                    x: Math.random(),
                    y: Math.random(),
                    inEdges: ['e1'],
                    outEdges: [],
                },
            },
            nodesData: {
                'n1': {
                    id: 'n1',
                    active: true,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: ['toggle'],
                },
                'n2': {
                    id: 'n2',
                    active: false,
                    value: 1,
                    stepFunctions: [{ name: 'activate', argument: 5 }],
                    displayFunctions: ['toggle'],
                }
            },
            edges: {
                'e1': {
                    id: 'e1',
                    sourceId: 'n1',
                    targetId: 'n2',
                    color: 'black',
                    size: 50,
                    type: 'arrow'
                },
            },
            edgesData: {
                'e1': {
                    linkFunction: 'transfer',
                    stepFunctions: null,
                    feedback: 'exponentialIncrease',
                    feedbackArgument: .50,
                },
            }
        },
        {
            data: {
                name: 'linear 3x',
                displayFunctions: { nodes: ['labelById', 'sizeByValue'] }
            },
            nodes: {
                'n1': {
                    id: 'n1',
                    x: 100,
                    y: 100,
                    outEdges: ['e1']
                },
                'n2': {
                    id: 'n2',
                    x: 200,
                    y: 200,
                    outEdges: ['e2']
                },
                'n3': {
                    id: 'n3',
                    x: 150,
                    y: 150,
                    outEdges: []
                }
            },
            nodesData: {
                'n1': {
                    id: 'n1',
                    active: true,
                    value: 10,
                    stepFunctions: ['increment'],
                    displayFunctions: ['toggle', 'sizeByValue'],
                },
                'n2': {
                    id: 'n2',
                    active: false,
                    value: 11,
                    stepFunctions: [{
                        name: 'activate',
                        argument: 5,

                    }],
                    displayFunctions: ['toggle', 'sizeByValue'],
                },
                'n3': {
                    id: 'n3',
                    active: false,
                    value: 12,
                    stepFunctions: [],
                    displayFunctions: ['toggle', 'sizeByValue'],
                }
            },
            edges: {
                'e1': {
                    id: 'e1',
                    sourceId: 'n1',
                    targetId: 'n2',
                    color: 'black',
                    size: 50,
                    type: 'arrow'
                },
                'e2': {
                    id: 'e2',
                    sourceId: 'n2',
                    targetId: 'n3',
                    color: 'black',
                    size: 50,
                    type: 'arrow'
                }
            },
            edgesData: {
                'e1': {
                    linkFunction: 'transfer',
                    stepFunctions: null,
                },

                'e2': {
                    linkFunction: 'transfer',
                    stepFunctions: null,
                },
            }
        },


        {
            data: {
                currentStep: 0,
                name: '2 independent stock flows',
                displayFunctions: { nodes: ['labelById', 'sizeByValue'] }
                // nodesInitial: {
                //     displayFunctions: ['toggle', 'sizeByValue', 'labelById'],
                // }
            },
            nodes: {
                'n1': {
                    id: 'n1',
                    x: 100,
                    y: 200,
                    outEdges: ['e1'],
                    inEdges: [],
                },
                'n2': {
                    id: 'n2',
                    x: 200,
                    y: 200,
                    inEdges: ['e1'],
                    outEdges: [],
                },
                'n3': {
                    id: 'n3',
                    x: 400,
                    y: 200,
                    outEdges: ['e2'],
                    inEdges: [],
                },
                'n4': {
                    id: 'n4',
                    x: 500,
                    y: 200,
                    inEdges: ['e2'],
                    outEdges: [],
                },
            },
            nodesData: {
                'n1': {
                    id: 'n1',
                    type: 'source',
                    active: true,
                    value: 0,
                    stepFunctions: [{name: 'increment', arguments: [1]}],
                    displayFunctions: ['toggle'],
                },
                'n2': {
                    id: 'n2',
                    type: 'sink',
                    active: false,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: ['toggle'],
                },
                'n3': {
                    type: 'source',
                    id: 'n3',
                    active: true,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: ['toggle'],
                },
                'n4': {
                    type: 'sink',
                    id: 'n4',
                    active: false,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: ['toggle'],
                }
            },
            edges: {
                'e1': {
                    id: 'e1',
                    sourceId: 'n1',
                    targetId: 'n2',
                    color: 'black',
                    size: 50,
                    type: 'arrow'
                },
                'e2': {
                    id: 'e2',
                    sourceId: 'n3',
                    targetId: 'n4',
                    color: 'black',
                    size: 50,
                    type: 'arrow'
                },
            },
            edgesData: {
                'e1': {
                    linkFunction: 'transfer',
                    stepFunctions: null,
                    feedback: 'exponentialIncrease',
                    feedbackArgument: .50,
                },
            }
        },
    ],
}

export { state };