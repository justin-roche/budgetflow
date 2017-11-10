let displayFunctions = {

    labelById: function(s: AppState, nodeId) : NodeDisplayData {
        let nodeData = s.graph.nodesData[nodeId]
        return {...nodeData.displayData, label: nodeId+ ':' + nodeData.value};
    },
    
    inactivateByLinks: function(s: AppState, nodeId) : NodeDisplayData {
        let nodeData = s.graph.nodesData[nodeId]
        let outEdges = s.graph.nodes[nodeId].outEdges.map(edgeId => s.graph.edgesData[edgeId]);
        let inEdges = s.graph.nodes[nodeId].inEdges.map(edgeId => s.graph.edgesData[edgeId]);
        let edges = outEdges.concat(inEdges);
        let active = edges.some(edge => edge.active === true);
        return {...nodeData.displayData, active: active};
    },

    // idByIndex: function(node,i){
    //     node.index = 'n'+i;
    // },

    // toggle: function(node) {
    //     if (node.data.active) {
    //         node.color = 'black';
    //     } else {
    //         node.color = 'gray';
    //     }
    // },
    
    // sizeByValue: function(node, nodeData, multiplier) {
    //     let newSize = nodeData.value * multiplier;
    //     if(newSize <10) {
    //         newSize = 10;
    //     }
    //     return {...node, r: newSize};
    // },

    // randomPosition: function(node) {
    //     node.x = Math.random();
    //     node.y = Math.random();
    // },

}

export { displayFunctions };