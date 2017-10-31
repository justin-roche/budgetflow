import { BehaviorSubject } from 'rxjs';
import { GraphService } from './../services/graphService';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../services/reduxStore';
import { _ } from 'underscore';

@inject(Store, GraphService)
export class Simulator {
    simulationOn;

    constructor(private store: Store<any>) {
        // select('ui.simulation.time', { subscribe: true })(this, 'simulationTime');   
       this.store.select('simulation.time').subscribe(d => {
           //if(this.simulationOn) {
               let cycles = this.getCycles();
               // this.store.dispatch({type: 'BREADTH_TRAVERSE', payload: {cycles: this.$cycles.value}});
               // this.store.dispatch({type: 'SIMULATION_OFF'})
           //}
       });  
       this.store.select('simulation.on').subscribe(d => {
            this.simulationOn = d;
    });   
    
        // this.$cycles = this.store.select('simulation.remainingCycles');   
        // this.$cycles.subscribe(d => {
        //     console.log('cycles', d)
        //    // this.store.dispatch({type: 'BREADTH_TRAVERSE'})
        // })

        // this.$simulating = this.store.select('simulation.simulating');   
        // this.$simulating.subscribe(d => {
        //       if(d === true) {
        
        //       }
        // })
       // this.test();
    }

    getCycles() {
        let s = this.store.getState().simulation;
        let d = s.nextTime - s.currentTime; 
        let c = d/s.stepInterval;
        console.log('cycles remaining', c);
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
        //this.graph.data.currentStep = numberOfCycles;
    }


    convertTimeToCycles(time) {
        return time;
    }

}