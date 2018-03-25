import { Store } from '../../services/reduxStore';
import { _ } from 'underscore';

let sm = {

    selectors: [
        {
            path: 'ui.graphContainer.selectedEdgeId',
            bindTo: null,
            compute: function (e: any, s: AppState) {
                return {
                    edgeData: s.graph.edgesData[e],
                    conditions: _.filter(s.graph.conditions, (c) => c.target === e.id)
                };
            },
            handler: 'selectedConditionsUpdated',
        }
    ],

}

export { sm }