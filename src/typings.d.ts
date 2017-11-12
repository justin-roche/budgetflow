declare interface AppState {
    graphs: Array<Graph>,
    ui: UI
    simulation: Object
    graph: Graph
    
}

declare interface Graph {
    id: string,
    data: GraphData
    nodesIds: Array<string>
    nodes: Nodes
    nodesData: NodesData,
    edgesIds: Array<string>
    edges: Edges
    edgesData: EdgesData,
    conditions: ConditionsData,
    conditionsIds: Array<String>    
}

declare interface Nodes {
    [index: string]: AppNode
}

declare interface NodesData {
    [index: string]: NodeData
}

declare interface ConditionsData {
    [index: string]: Condition
}

declare interface Edges {
    [index: string]: Edge
}

declare interface EdgesData {
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
    active?: Boolean,
    value: Number,
    name: string,
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
    active?: boolean
}

declare interface EdgeData {
    id: string
    linkFunctions: Array<FunctionItem>,
    stepFunctions?: Array<FunctionItem>,
    active: boolean,
}

declare interface Condition {
    id: string,
    type: string,
    target: string,
    expression: string,
    phase: string,
    value: boolean,
    scope: string
}

declare interface Edge {
    id: string,
    source: string,
    target: string,
}

declare interface FunctionItem {
    name: string,
    arguments?: Object
}

declare interface Simulation {
    on: Boolean,
    beginRangeTime: Number,
    endRangeTime: Number,
    currentTime: Number,
    targetTime: Number,
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

declare interface modalSettings {
    id: string;
    title: string;
    x: number;
    y: number;
    show: boolean;
}