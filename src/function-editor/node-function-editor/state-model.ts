let sm = {

    selectors: [
        {
            path: 'graph.nodesData',
            bindTo: null,
            compute: function (nodesData: any, s: AppState) {
                let selectedNodeData = nodesData[s.ui.graphContainer.selectedNodeId];
                if(selectedNodeData) {
                    return {
                        nodeData: selectedNodeData,
                        nodeFunctions: selectedNodeData.nodeFunctions,
                    };
                } else {
                    return {
                        nodeData: null,
                        nodeFunctions: []
                    }
                }
                
            },
            handler: 'selectedNodeDataUpdated',
        }]
};

export { sm };