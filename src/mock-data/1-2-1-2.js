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