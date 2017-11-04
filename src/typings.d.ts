declare interface AppState {
    graphs: Array<Graph>,
    ui: UI
    simulation: Object
    graph: Graph
}

declare interface Graph {
    id: string,
    data: GraphData
    nodes: Nodes
    nodesData: NodesData,
    edges: Edges
    edgesData: EdgesData
}

declare interface Nodes {
    [index: string]: AppNode
}

declare interface NodesData {
    [index: string]: NodeData
}

declare interface Edges {
    [index: string]: Edge
}

declare interface EdgesData{
    [index: string]: EdgeData
}

declare interface GraphData {
    id: string,
    name: string,
    displayFunctions: GraphFunctions
}

declare interface AppNode {
    id: string,
    outEdges: Array<string>,
    inEdges: Array<string>,
    x?: Number,
    y?: Number
}

declare interface NodeData {
    id: string,
    type: string,
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
    label?: string,
    shape?: string,
    outlineColor?: string,
}

declare interface EdgeData {
    id: string
    // preLinkFunctions: Array<FunctionItem>,
    linkFunctions: Array<FunctionItem>,
    stepFunctions?: Array<FunctionItem>,
}

declare interface Edge {
    id: string,
    source: string,
    target: string,
}

declare interface FunctionItem {
    name: string, 
    arguments: Array<any>
}

declare interface Simulation {
    on: Boolean,
    beginRangeTime: Number,
    endRangeTime: Number,
    currentTime: Number,
    nextTime: Number,
    cycleTime: Number,
    remainingCycles: Number,
}

declare interface NodeModel {
    node: AppNode,
    nodeData: NodeData,
    outEdges: Array<Edge>,
    outEdgesData: Array<Edge>,
    inEdges: Array<Edge>,
    inEdgesData: Array<EdgeData>,
    outNodes: Array<AppNode>,
    outNodesData: Array<AppNode>,
    inNodes: Array<AppNode>,
    inNodesData: Array<AppNode>,
}

declare interface UI {
    graphContainer: any,
    nodeEditor: {
        nodeModel: NodeModel
    },
    interactivity: any,
}