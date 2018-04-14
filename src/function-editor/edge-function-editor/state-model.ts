let sm = {

    selectors: [
        {
            path: 'graph.edgesData',
            bindTo: null,
            compute: function (edgesData: any, s: AppState) {
                let id = edgesData[s.ui.graphContainer.selectedEdgeId];
                let selectedEdgeData = null;
                if(id) {
                    let [x,y]=id.split('-');
                    selectedEdgeData = s.graph.edgesData[x][y];
                }
                return computeData(selectedEdgeData);
            },
            handler: 'selectedEdgeDataUpdated',
        },
        {
            path: 'ui.graphContainer.selectedEdgeId',
            bindTo: null,
            compute: function (id: any, s: AppState) {
                let [x,y]=id.split('-');
                let selectedEdgeData = s.graph.edgesData[x][y];
                return computeData(selectedEdgeData);
            },
            handler: 'selectedEdgeDataUpdated',
        },
    
    ]
};

function computeData(selectedEdgeData) {
    if(selectedEdgeData) {
        return {
            edgeData: selectedEdgeData,
            linkFunctions: selectedEdgeData.linkFunctions,
        };
    } else {
        return {
            edgeData: null,
            linkFunctions: []
        }
    }
}

export { sm };