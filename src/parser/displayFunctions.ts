let displayFunctions = {

    labelById: function(graph, nodeId) {
        let nodeData = graph.nodesData[nodeId]
        return {...nodeData.displayData, label: nodeId+ ':' + nodeData.value};
    },
    
    inactivateByLinks: function(g, nodeId) {
        let nodeData = g.nodesData[nodeId]
        let outEdges = g.nodes[nodeId].outEdges.map(edgeId => g.edgesData[edgeId]);
        let inEdges = g.nodes[nodeId].inEdges.map(edgeId => g.edgesData[edgeId]);
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