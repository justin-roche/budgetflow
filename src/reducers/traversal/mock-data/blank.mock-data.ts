let BLANK_GRAPH = {
    id: 'g0',
    data: {
        id: 'g0',
        name: 'blank',
        displayFunctions: { nodes: [{ name: 'labelByName', arguments: [] }] },
    },
    nodesIds: [],
    nodes: {
       
    },
    nodesData: <NodesData>{
        
    },
    edgesIds: [],
    edges: {

    },
    edgesData: {

    },
    nodeFunctions: {
        // 'f1': {
        //     operator: {
        //         value: '+',
        //     },
        //     object: {
        //         value: 1,
        //     }
        // }
    },
    conditions: [],
    simulation: <Simulation>{
        on: false,
        cycleTime: 24 * 60 * 60 * 1000, //cycle time is one day
        beginRangeTime: new Date().getTime(),
        endRangeTime: new Date('2019').getTime(),
        currentTime: new Date().getTime(),
        targetTime: null,
        remainingCycles: 0,
        forward: null,
    },
},

export { BLANK_GRAPH };