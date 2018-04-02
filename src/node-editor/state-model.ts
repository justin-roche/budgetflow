import { _ } from 'underscore';

let sm = {

    selectors: [
        
        {
            path: 'ui.graphContainer.selectedNodeId',
            bindTo: null,
            compute:  function (e: any, s: AppState) {
                return {
                    nodeData: s.graph.nodesData[e],
                };
            },
            handler: 'selectedNodeUpdated',
        },
    ],

}

export { sm }