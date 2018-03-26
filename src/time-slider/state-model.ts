import { _ } from 'underscore';

let sm = {

    selectors: [
        
        {
            path: 'ui.timeSlider',
            bindTo: 'sliderSettings',
            compute: null,
            handler: 'sliderUpdated',
        },
        {
            path: 'graph.simulation.currentTime',
            bindTo: 'sliderSettings',
            compute: null,
            handler: 'currentTimeUpdated',
        },
        {
            path: 'graph.simulation',
            bindTo: '_simulation',
            compute: null,
            handler: 'simulationUpdated',
        },
       
        {
            path: 'ui.timeSlider.range',
            bindTo: null,
            compute:  function (e: any, s: AppState) {
                return {
                    timeSlider: s.ui.timeSlider,
                };
            },
            handler: 'rangeUpdated',
        },
    ],

}

export { sm }