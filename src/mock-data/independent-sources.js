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
        //             nodeFunctions: [{ name: 'increment', arguments: [1] }],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n2': {
        //             id: 'n2',
        //             source: false,
        //             active: false,
        //             value: 0,
        //             nodeFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n2': {
        //             type: 'source',
        //             id: 'n2',
        //             active: true,
        //             value: 1,
        //             nodeFunctions: [],
        //             displayFunctions: ['toggle'],
        //         },
        //         'n4': {
        //             source: false,
        //             id: 'n4',
        //             active: false,
        //             value: 0,
        //             nodeFunctions: [],
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
        //             nodeFunctions: null,
        //             feedback: 'exponentialIncrease',
        //             feedbackArgument: .50,
        //         },
        //     },
        // },