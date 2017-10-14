

let state = {

    ui: {
        graphContainer: {
            show: true,
            defaultEdgeColor: 'black',
            defaultNodeColor: 'gray',
            activeNodeColor: 'green',
            activeEdgeColor: 'green',
            defaultNodeSize: 50,
            selectedNodeId: null,
        },
        nodeEditor: {
            show: false,
            nodeModel: {},
        },
        interactivity: {
            selectedNode: null,
            selectedEdge: null,
        },
    },
    simulation: <Simulation>{
        simulating: false,
        time: null,
        remainingCycles: 1,
    },
    graph: null,
    graphs: <Array<Graph>>[
        // {
        //     id: 'g0',
        //     data: {
        //         id: 
        //         name: 'blank'
        //     },
        //     nodes: {

        //     },
        //     nodesData: {

        //     },
        //     edges: {

        //     },
        //     edgesData: {

        //     }
        // },
        {
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
        },
        {
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
                    outEdges: ['e1'],
                    inEdges: [],
                },
                'n1': {
                    id: 'n1',
                    inEdges: ['e1'],
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
                'e1': {
                    id: 'e1',
                    source: 'n0',
                    target: 'n1',
                    type: 'arrow'
                },
            },
            edgesData: <EdgesData>{
                'e1': {
                    id: 'e1',
                    preLinkFunctions: [],
                    linkFunctions: [{ name: 'transfer', arguments: [1] }],
                    stepFunctions: null,
                },
            }
        },
        // {
        //     id: 'g3',
        //     data: {
        //         name: '3 nodes',
        //         displayFunctions: { nodes: ['labelById', 'sizeByValue'] }
        //     },
        //     nodes: {
        //         'n1': {
        //             id: 'n1',
        //             outEdges: ['e1'],
        //             inEdges: [],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             outEdges: ['e2'],
        //             inEdges: ['e1']
        //         },
        //         'n3': {
        //             id: 'n3',
        //             outEdges: [],
        //             inEdges: ['e2']
        //         }
        //     },
        //     nodesData: {
        //         'n1': {
        //             id: 'n1',
        //             type: 'source',
        //             active: true,
        //             value: 10,
        //             stepFunctions: [],
        //             displayFunctions: [],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             type: 'sink',
        //             active: false,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: [],
        //         },
        //         'n3': {
        //             id: 'n3',
        //             type: 'sink',
        //             active: false,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: [],
        //         }
        //     },
        //     edges: {
        //         'e1': {
        //             id: 'e1',
        //             source: 'n1',
        //             target: 'n2',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //         'e2': {
        //             id: 'e2',
        //             source: 'n2',
        //             target: 'n3',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         }
        //     },
        //     edgesData: {
        //         'e1': {
        //             linkFunctions: [{ name: 'transfer', arguments: [1] }],
        //             stepFunctions: null,
        //         },

        //         'e2': {
        //             linkFunctions: [{ name: 'transfer', arguments: [1] }],
        //             stepFunctions: null,
        //         },
        //     }
        // },
        {
            id: 'g3',
            data: {
                name: 'conditional',
                displayFunctions: { nodes: [{ name: 'labelById' }] }
            },
            nodes: {
                'n0': {
                    id: 'n0',
                    outEdges: ['e1'],
                    inEdges: [],
                },
                'n1': {
                    id: 'n1',
                    outEdges: ['e2'],
                    inEdges: ['e1']
                },
                'n2': {
                    id: 'n2',
                    outEdges: [],
                    inEdges: ['e2']
                }
            },
            nodesData: {
                'n0': {
                    id: 'n0',
                    type: 'source',
                    active: true,
                    value: 10,
                    stepFunctions: [],
                    displayFunctions: [],
                    displayData: {}
                },
                'n1': {
                    id: 'n1',
                    type: 'conditional',
                    active: true,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: [],
                    displayData: {}
                },
                'n2': {
                    id: 'n2',
                    type: 'sink',
                    active: false,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: [],
                    displayData: {}
                }
            },
            edges: {
                'e1': {
                    id: 'e1',
                    source: 'n0',
                    target: 'n1',
                    color: 'black',
                    size: 50,
                    type: 'arrow'
                },
                'e2': {
                    id: 'e2',
                    source: 'n1',
                    target: 'n2',
                    color: 'black',
                    size: 50,
                    type: 'arrow'
                }
            },
            edgesData: {
                'e1': {
                    preLinkFunctions: [],
                    linkFunctions: [{ name: 'transfer', arguments: [1] }],

                },

                'e2': {
                    preLinkFunctions: [],
                    
                    linkFunctions: [{ name: 'transfer', arguments: [1] },
                                    { name: 'derive', phase: 'prelink', arguments: ['active', 'source.value > 1']}],
                    informationFunctions: [],
                },
            }
        },




        // {
        //     id: 'g4',
        //     data: {
        //         currentStep: 0,
        //         name: '2 independent stock flows',
        //         displayFunctions: { nodes: ['labelById', 'sizeByValue'] }
        //     },
        //     nodes: {
        //         'n0': {
        //             id: 'n0',
        //             x: 100,
        //             y: 200,
        //             outEdges: ['e1'],
        //             inEdges: [],
        //         },
        //         'n1': {
        //             id: 'n1',
        //             x: 200,
        //             y: 200,
        //             inEdges: ['e1'],
        //             outEdges: [],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             x: 400,
        //             y: 200,
        //             outEdges: ['e2'],
        //             inEdges: [],
        //         },
        //         'n4': {
        //             id: 'n4',
        //             x: 500,
        //             y: 200,
        //             inEdges: ['e2'],
        //             outEdges: [],
        //         },
        //     },
        //     nodesData: {
        //         'n1': {
        //             id: 'n1',
        //             type: 'source',
        //             active: true,
        //             value: 1,
        //             stepFunctions: [{ name: 'increment', arguments: [1] }],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             type: 'sink',
        //             active: false,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n2': {
        //             type: 'source',
        //             id: 'n2',
        //             active: true,
        //             value: 1,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n4': {
        //             type: 'sink',
        //             id: 'n4',
        //             active: false,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         }
        //     },
        //     edges: {
        //         'e1': {
        //             id: 'e1',
        //             source: 'n1',
        //             target: 'n2',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //         'e2': {
        //             id: 'e2',
        //             source: 'n2',
        //             target: 'n4',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //     },
        //     edgesData: {
        //         'e1': {
        //             linkFunction: 'transfer',
        //             stepFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //     },
        // },
        // {
        //     id: 'g5',

        //     data: {
        //         currentStep: 0,
        //         name: '2 independent stock flows',
        //         displayFunctions: { nodes: ['labelById', 'sizeByValue'] }
        //         // nodesInitial: {
        //         //     displayFunctions: ['toggle', 'sizeByValue', 'labelById'],
        //         // }
        //     },
        //     nodes: {
        //         'n1': {
        //             id: 'n1',
        //             x: 100,
        //             y: 200,
        //             outEdges: ['e1'],
        //             inEdges: [],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             x: 200,
        //             y: 200,
        //             inEdges: ['e1'],
        //             outEdges: [],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             x: 400,
        //             y: 200,
        //             outEdges: ['e2'],
        //             inEdges: [],
        //         },
        //         'n4': {
        //             id: 'n4',
        //             x: 500,
        //             y: 200,
        //             inEdges: ['e2'],
        //             outEdges: [],
        //         },
        //     },
        //     nodesData: {
        //         'n1': {
        //             id: 'n1',
        //             type: 'source',
        //             active: true,
        //             value: 1,
        //             stepFunctions: [{ name: 'increment', arguments: [1] }],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             type: 'sink',
        //             active: false,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n3': {
        //             type: 'source',
        //             id: 'n3',
        //             active: true,
        //             value: 1,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n4': {
        //             type: 'sink',
        //             id: 'n4',
        //             active: false,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         }
        //     },
        //     edges: {
        //         'e1': {
        //             id: 'e1',
        //             source: 'n1',
        //             target: 'n2',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //         'e2': {
        //             id: 'e2',
        //             source: 'n3',
        //             target: 'n4',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //     },
        //     edgesData: {
        //         'e1': {
        //             linkFunction: 'transfer',
        //             stepFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //     }
        // },
        // {
        //     id: 'g6',
        //     data: {
        //         currentStep: 0,
        //         name: '1-2, 1-2',
        //         displayFunctions: { nodes: ['labelById', 'sizeByValue'] }
        //         // nodesInitial: {
        //         //     displayFunctions: ['toggle', 'sizeByValue', 'labelById'],
        //         // }
        //     },
        //     nodes: {
        //         'n1': {
        //             id: 'n1',
        //             x: 200,
        //             y: 100,
        //             outEdges: ['e1', 'e2'],
        //             inEdges: [],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             x: 100,
        //             y: 200,
        //             inEdges: ['e1'],
        //             outEdges: [],
        //         },
        //         'n3': {
        //             id: 'n3',
        //             x: 300,
        //             y: 200,
        //             outEdges: [],
        //             inEdges: ['e2'],
        //         },
        //         'n4': {
        //             id: 'n4',
        //             x: 500,
        //             y: 100,
        //             inEdges: [],
        //             outEdges: ['e3', 'e4'],
        //         },
        //         'n5': {
        //             id: 'n5',
        //             x: 400,
        //             y: 200,
        //             outEdges: [],
        //             inEdges: ['e3'],
        //         },
        //         'n6': {
        //             id: 'n6',
        //             x: 600,
        //             y: 200,
        //             outEdges: [],
        //             inEdges: ['e4'],
        //         },
        //     },
        //     nodesData: {
        //         'n1': {
        //             id: 'n1',
        //             type: 'source',
        //             active: true,
        //             value: 2,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             type: 'sink',
        //             active: false,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n3': {
        //             type: 'sink',
        //             id: 'n3',
        //             active: true,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n4': {
        //             type: 'source',
        //             id: 'n4',
        //             active: false,
        //             value: 2,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n5': {
        //             id: 'n5',
        //             type: 'sink',
        //             active: false,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n6': {
        //             type: 'sink',
        //             id: 'n6',
        //             active: true,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //     },
        //     edges: {
        //         'e1': {
        //             id: 'e1',
        //             source: 'n1',
        //             target: 'n2',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //         'e2': {
        //             id: 'e2',
        //             source: 'n1',
        //             target: 'n3',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //         'e3': {
        //             id: 'e3',
        //             source: 'n4',
        //             target: 'n5',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //         'e4': {
        //             id: 'e2',
        //             source: 'n4',
        //             target: 'n6',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //     },
        //     edgesData: {
        //         'e1': {
        //             id: 'e1',
        //             linkFunctions: [{ name: 'transfer', arguments: 1 }],
        //             stepFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //         'e2': {
        //             id: 'e2',
        //             linkFunctions: [{ name: 'transfer', arguments: 1 }],
        //             stepFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //         'e3': {
        //             id: 'e3',
        //             linkFunctions: [{ name: 'transfer', arguments: 1 }],
        //             stepFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //         'e4': {
        //             id: 'e4',
        //             linkFunctions: [{ name: 'transfer', arguments: 1 }],
        //             stepFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //     }
        // },
        {
            id: 'g7',
            data: <GraphData> {
                id: 'g7',
                name: '1-2-3',
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
                    type: 'source',
                    active: true,
                    value: 50,
                    stepFunctions: [],
                    displayFunctions: [],
                    displayData: {},
                },
                'n1':  <NodeData> {
                    id: 'n1',
                    type: 'sink',
                    active: true,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: [],
                    displayData: {},
                },
                'n2':  <NodeData> {
                    id: 'n2',
                    type: 'sink',
                    active: true,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: [],
                    displayData: {},
                },
                'n3':  <NodeData> {
                    type: 'sink',
                    id: 'n3',
                    active: true,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: [],
                    displayData: {},
                },
                'n4':  <NodeData> {
                    type: 'sink',
                    id: 'n4',
                    active: true,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: [],
                    displayData: {},
                },
                'n5':  <NodeData> {
                    id: 'n5',
                    type: 'sink',
                    active: true,
                    value: 0,
                    stepFunctions: [],
                    displayFunctions: [],
                    displayData: {},
                },
                'n6': <NodeData> {
                    type: 'sink',
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
                    id: 'e0',
                    preLinkFunctions: [],
                    linkFunctions: [{ name: 'transfer', arguments: [3] }],
                },
                'e00': {
                    id: 'e00',
                    preLinkFunctions: [],
                    linkFunctions: [{ name: 'transfer', arguments: [3] }],
                },
                'e1': {
                    id: 'e1',
                    preLinkFunctions: [],
                    linkFunctions: [{ name: 'transfer', arguments: [1] }],
                },
                'e2': {
                    id: 'e2',
                    preLinkFunctions: [],
                    linkFunctions: [{ name: 'transfer', arguments: [1] }],
                },
                'e3': {
                    id: 'e3',
                    preLinkFunctions: [],
                    linkFunctions: [{ name: 'transfer', arguments: [1] }],
                },
                'e4': {
                    id: 'e4',
                    preLinkFunctions: [],
                    linkFunctions: [{ name: 'transfer', arguments: [1] }],
                },
            }
        },
        // {
        //     id: 'g8',
        //     data: {
        //         currentStep: 0,
        //         name: '1-2-3',
        //         displayFunctions: { nodes: [{ name: 'sizeByValue', arguments: [1]] }
        //     },
        //     nodes: {
        //         'n0': {
        //             id: 'n0',
        //             x: 300,
        //             y: 50,
        //             shape: 'square',
        //             outEdges: ['e0', 'e00'],
        //             inEdges: [],
        //         },
        //         'n1': {
        //             id: 'n1',
        //             x: 200,
        //             y: 100,
        //             inEdges: ['e0'],
        //             outEdges: ['e1', 'e2'],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             x: 100,
        //             y: 200,
        //             inEdges: ['e1'],
        //             outEdges: [],
        //         },
        //         'n3': {
        //             id: 'n3',
        //             x: 300,
        //             y: 200,
        //             inEdges: ['e2'],
        //             outEdges: [],
        //         },
        //         'n4': {
        //             id: 'n4',
        //             x: 500,
        //             y: 100,
        //             inEdges: ['e00'],
        //             outEdges: ['e3'],
        //         },
        //         'n5': {
        //             id: 'n5',
        //             x: 400,
        //             y: 200,
        //             outEdges: [],
        //             inEdges: ['e3'],
        //         },
        //     },
        //     nodesData: {
        //         'n0': {
        //             id: 'n0',
        //             type: 'source',
        //             active: true,
        //             value: 50,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n1': {
        //             id: 'n1',
        //             type: 'sink',
        //             active: true,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             type: 'sink',
        //             active: false,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n3': {
        //             type: 'sink',
        //             id: 'n3',
        //             active: true,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n4': {
        //             type: 'sink',
        //             id: 'n4',
        //             active: false,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n5': {
        //             id: 'n5',
        //             type: 'sink',
        //             active: false,
        //             value: 0,
        //             stepFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //     },
        //     edges: {
        //         'e0': {
        //             id: 'e0',
        //             source: 'n0',
        //             target: 'n1',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //         'e00': {
        //             id: 'e00',
        //             source: 'n0',
        //             target: 'n4',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //         'e1': {
        //             id: 'e1',
        //             source: 'n1',
        //             target: 'n2',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //         'e2': {
        //             id: 'e2',
        //             source: 'n1',
        //             target: 'n3',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //         'e3': {
        //             id: 'e3',
        //             source: 'n4',
        //             target: 'n5',
        //             color: 'black',
        //             size: 50,
        //             type: 'arrow'
        //         },
        //         // 'e4': {
        //         //     id: 'e4',
        //         //     source: 'n4',
        //         //     target: 'n6',
        //         //     color: 'black',
        //         //     size: 50,
        //         //     type: 'arrow'
        //         // },
        //     },
        //     edgesData: {
        //         'e0': {
        //             id: 'e0',
        //             linkFunctions: [{ name: 'transfer', arguments: 3 }],
        //             stepFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //         'e00': {
        //             id: 'e00',
        //             linkFunctions: [{ name: 'transfer', arguments: 3 }],
        //             stepFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //         'e1': {
        //             id: 'e1',
        //             linkFunctions: [{ name: 'transfer', arguments: 1 }],
        //             stepFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //         'e2': {
        //             id: 'e2',
        //             linkFunctions: [{ name: 'transfer', arguments: 1 }],
        //             stepFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //         'e3': {
        //             id: 'e3',
        //             linkFunctions: [{ name: 'transfer', arguments: 1 }],
        //             stepFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //         // 'e4': {
        //         //     id: 'e4',
        //         //     linkFunctions: [{name: 'transfer', arguments: 1}],
        //         //     stepFunctions: null,
        //         //     feedback: 'exponentialIncrease',
        //         //     feedbackArgument: .50,
        //         // },
        //     }
        // },
        // {
        //     "id": "g0",
        //     "data":
        //     { "name": "cycle 3" },
        //     "nodes":
        //     {
        //         "n0":
        //         {
        //             "x": 428,
        //             "y": 344,
        //             "id": "n0",
        //             "outEdges": ["e0"],
        //             "inEdges": ["e2"]
        //         },
        //         "n1": {
        //             "x": 632,
        //             "y": 330,
        //             "id": "n1",
        //             "outEdges": ["e1"],
        //             "inEdges": ["e0"]
        //         },
        //         "n2": {
        //             "x": 731,
        //             "y": 368,
        //             "id": "n2",
        //             "outEdges": ["e2"],
        //             "inEdges": ["e1"]
        //         }
        //     },
        //     "nodesData":
        //     {
        //         "n0": {
        //             "id": "n0",
        //             "type": "source",
        //             "displayFunctions": [],
        //             "stepFunctions": [],
        //             "value": 1
        //         },
        //         "n1": {
        //             "id": "n1",
        //             "type": "sink",
        //             "displayFunctions": [],
        //             "stepFunctions": [],
        //             "value": 0
        //         },
        //         "n2": {
        //             "id": "n2",
        //             "type": "sink",
        //             "displayFunctions": [],
        //             "stepFunctions": [],
        //             "value": 0
        //         }
        //     },
        //     "edges": {
        //         "e0": {
        //             "source": "n0",
        //             "target": "n1",
        //             "id": "e0"
        //         },
        //         "e1": {
        //             "source": "n1",
        //             "target": "n2",
        //             "id": "e1"
        //         },
        //         "e2": {
        //             "source": "n2",
        //             "target": "n0",
        //             "id": "e2"
        //         }
        //     },
        //     "edgesData": {
        //         "e0": {
        //             "id": "e0",
        //             "type": "sink",
        //             "linkFunctions": [{ name: 'transduce', arguments: [1, 1] }]
        //         },
        //         "e1": {
        //             "id": "e1",
        //             "type": "sink",
        //             "linkFunctions": [{ name: 'transduce', arguments: [1, 1] }]
        //         },
        //         "e2": {
        //             "id": "e2",
        //             "type": "sink",
        //             "linkFunctions": [{ name: 'transduce', arguments: [1, 1] }]
        //         }
        //     }
        // }
    ],
}

export { state };