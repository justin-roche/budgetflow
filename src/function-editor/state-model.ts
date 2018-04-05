let sm = {

    selectors: [
        {
            path: 'graph.nodesData',
            bindTo: null,
            compute: function (nodesData: any, s: AppState) {
                let selectedNodeData = nodesData[s.ui.graphContainer.selectedNodeId],
                return {
                    nodeData: selectedNodeData,
                    nodeFunctions: selectedNodeData.nodeFunctions.map(id => s.graph.nodeFunctions[id]),
                };
            },
            handler: 'selectedNodeDataUpdated',
        }]
};

export { sm };