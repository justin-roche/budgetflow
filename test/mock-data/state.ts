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
        simulation: {
            time: null,
        },
    },
    sigma: {
        newNode: null,
        changedNode: null,

    },
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
                    data: {
                        active: true,
                        value: 10,
                        stepFunctions: ['increment'],
                        displayFunctions: ['toggle', ,],
                    },
                }
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
                    id: 'n1', x: Math.random(), y: Math.random(),
                    data: {
                        active: true,
                        value: 10,
                        stepFunctions: [],
                        displayFunctions: ['toggle', ,],
                    },
                },
                'n2': {
                    id: 'n2', x: Math.random(), y: Math.random(),
                    data: {
                        active: false,
                        value: 0,
                        stepFunctions: [{ name: 'activate', argument: 5 }],
                        displayFunctions: ['toggle'],
                    }
                },
            },

            edges: {
                'e1': {
                    id: 'e1',
                    data: {
                        linkFunction: 'transfer',
                        stepFunctions: null,
                        feedback: 'exponentialIncrease',
                        feedbackArgument: .50,
                    },
                    source: 'n1',
                    target: 'n2',
                    color: 'black',
                    size: 50,
                    type: 'arrow'
                },
            }
        },
        {
            data: {
                name: 'linear 3x',
                displayFunctions: { nodes: ['labelById', 'sizeByValue'] }

                // nodesInitial: {
                //     displayFunctions: ['toggle', 'sizeByValue', 'labelById'],
                // }
            },
            nodes: {
                'n1': {
                    id: 'n1', x: 100, y: 100,
                    data: {
                        active: true,
                        value: 10,
                        stepFunctions: ['increment'],
                        displayFunctions: ['toggle', 'sizeByValue'],
                    },
                },
                'n2': {
                    id: 'n2', x: 200, y: 200,
                    data: {
                        active: false,
                        value: 0,
                        stepFunctions: [{
                            name: 'activate',
                            argument: 5,

                        }],
                        displayFunctions: ['toggle', 'sizeByValue'],
                    }
                },
                'n3': {
                    id: 'n3', x: 150, y: 150,
                    data: {
                        active: false,
                        value: 0,
                        stepFunctions: [],
                        displayFunctions: ['toggle', 'sizeByValue'],
                    }
                }
            },

            edges: {
                'e1': {
                    id: 'e1',
                    data: {
                        linkFunction: 'transfer',
                        stepFunctions: null,
                    },
                    sourceId: 'n1',
                    targetId: 'n2',
                    color: 'black',
                    size: 50,
                    type: 'arrow'
                },
                'e2': {
                    id: 'e2',
                    data: {
                        linkFunction: 'transfer',
                        stepFunctions: null,
                    },
                    sourceId: 'n2',
                    targetId: 'n3',
                    color: 'black',
                    size: 50,
                    type: 'arrow'
                }
            }
        },
    ],
}

export { state };