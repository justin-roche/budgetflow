declare interface AppState {
    graphs: Array<Graph>,
    ui: UI
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
    conditions: FunctionsData,
    //conditionsIds: Array<String>  
    functions: FunctionsData,
    simulation: Simulation,  
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

declare interface FunctionsData {
    [index: string]: FunctionConfig,
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
    stepFunctions: Array<String>,
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
    linkFunctions: Array<String>,
    stepFunctions?: Array<String>,
    active: boolean,
}

declare interface Condition {
    // arguments: ConditionArguments
    subject:{
        name: String,
        value: any,
    },
    object: {
        name: String,
        value: any
    },
    operator: {
        value: String,
        name: String,
    },
    effect: {
        value: String,
        name: String,
    }
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

/* type of link functions, node functions, and conditions */
declare interface FunctionConfig {
        name: String,
        target: String, /* id of the target (node/edge)*/
        type: String, /* link, node, or condition */
        precondition: String /* active/inactive prior to running */
        arguments: ArgumentData, /* key value map */
        data: Object /* condition scope, data types, etc. */
        fnId: String, /* points to the executed function */
}

declare interface FunctionArgs {
    graph: Graph,
    target: any,
    source: any, 
    config: FunctionConfig /* the functions own config object */
}

declare interface ArgumentData {
    [index: string]: ArgumentConfig
}

declare interface ArgumentConfig {
    name: String, /*  name in function */
    displayName: String,
    displayType: String /* type of selector */
    value: any /* currently selected value */
}

declare interface ConditionArguments {
    
}

declare interface Simulation {
    on: Boolean,
    beginRangeTime: Number,
    endRangeTime: Number,
    currentTime: Number,
    targetTime: Number,
    cycleTime: Number,
    remainingCycles: Number,
    forward: Boolean
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