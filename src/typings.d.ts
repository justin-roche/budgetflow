declare interface AppState {
    graphs: Array<Graph>,
    ui: UI
    simulation: Object
    graph: Graph
}

declare interface Graph {
    id: String,
    data: GraphData
    nodes: {
        [index: string]: AppNode
    }
    nodesData: {
        [index: string]: NodeData, 
    },
    edges: {
        [index: string]: Edge,
    }
    edgesData: {
        [index: string]: EdgeData
    }
}

declare interface GraphData {
    id: String,
    name: String,
    displayFunctions: GraphFunctions
}

declare interface AppNode {
    id: String,
    outEdges: Array<String>,
    inEdges: Array<String>,
    x?: Number,
    y?: Number
}

declare interface NodeData {
    id: String,
    type: String,
    active: Boolean,
    value: Number,
    stepFunctions: Array<FunctionItem>,
    displayFunctions: Array<FunctionItem>,
    displayData: NodeDisplayData,
}

declare interface GraphFunctions {
    nodes: Array<FunctionItem>
}



declare interface NodeDisplayData {
    label?: String,
    shape?: String,
    outlineColor?: String,
}

declare interface EdgeData {
    linkFunctions: Array<FunctionItem>,
    stepFunctions: Array<FunctionItem>,
}

declare interface Edge {
    id: String,
    source: String,
    target: String,
}

declare interface FunctionItem {
    name: String, 
    arguments: Array<any>
}

declare interface Simulation {
    simulating: Boolean,
    time: Number,
    remainingCycles: Number,
}

declare interface UI {
    graphContainer: any,
    nodeEditor: any,
    interactivity: any,
}