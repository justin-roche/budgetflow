import { BehaviorSubject } from 'rxjs';
import { GraphService } from './../services/graphService';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../services/reduxStore';
import { _ } from 'underscore';

@inject(Store, GraphService)
export class Simulator {
    t = new BehaviorSubject(null);
    //@select(createSelector('ui.simulation.time', t), {subscribe: true})
    $time;


    dragging = false;
    containerRef;

    sigmaInstance;

    sigmaSettings;
    settings;

    graph;
    simulation;

    g;

    constructor(private store: Store<any>) {
        // select('ui.simulation.time', { subscribe: true })(this, 'simulationTime');   
       // this.$time = this.store.select('ui.simulation.time');   
    
        this.$cycles = this.store.select('simulation.remainingCycles');   
        this.$cycles.subscribe(d => {
            console.log('cycles', d)
           // this.store.dispatch({type: 'BREADTH_TRAVERSE'})
        })

        this.$simulating = this.store.select('simulation.simulating');   
        this.$simulating.subscribe(d => {
              if(d === true) {
                this.store.dispatch({type: 'BREADTH_TRAVERSE', payload: {cycles: this.$cycles.value}});
                this.store.dispatch({type: 'SIMULATION_OFF'})
              }
        })
       // this.test();
    }

    simulationTimeChanged(current, last) {
        if (current && current !== last) {
            console.log('sim time changed', current, last)
        }
    }

    simulateAllCycles() {

    }

    simulatePartialCycles(time) {
        let numberOfCycles = this.convertTimeToCycles(time);
        for (let c = 0; c < numberOfCycles; c++) {
            // dispatch traversal
        }
        this.graph.data.currentStep = numberOfCycles;
    }


    convertTimeToCycles(time) {
        return time;
    }

}