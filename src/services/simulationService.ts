import { inject } from 'aurelia-framework';
import { Store } from './reduxStore';
import { graphActions } from '../reducers/graphReducer';

@inject(Store)
export class SimulationService {

    remainingCycles;
    simulationOn;
    simulation;
    currentTime;
    cycleTime;

    constructor(private store: Store) {
        this.store.select('simulation.remainingCycles', { bind: [this, 'remainingCycles'] });
        this.store.select('simulation', { bind: [this, 'simulation'] });
        this.store.select('simulation.on', { bind: [this, 'simulationOn'] });
        this.store.select('simulation.currentTime', { bind: [this, 'currentTime'] });
        this.store.select('simulation.cycleTime', { bind: [this, 'cycleTime'] });
    }

    setNextTime(nextTime: Number) {
        this.store.dispatch({ type: 'SIMULATION_NEXT_TIME_SET', payload: nextTime });
        if(this.simulationOn) {
            this.simulate(nextTime);
        }
    }

    simulate(nextTime) {
        if(this.isForward(nextTime)) {
            this.iterateForward(this.getRemainingCycles(nextTime));
            this.store.actions.graph.applyDisplayFunctions();
            this.store.dispatch({ type: 'SIMULATION_NEXT_TIME_SET', payload: null });
            this.store.dispatch({ type: 'SIMULATION_CURRENT_TIME_SET', payload: nextTime });
        } else {
            this.iterateBackward(this.getRemainingCycles(nextTime));
            this.store.actions.graph.applyDisplayFunctions();
            this.store.dispatch({ type: 'SIMULATION_NEXT_TIME_SET', payload: null });
            this.store.dispatch({ type: 'SIMULATION_CURRENT_TIME_SET', payload: nextTime });
        }
    }

    isForward(nextTime) {
        return nextTime > this.currentTime;
    }

    goForward() {
       // this.store.dispatch(graphActions.preTraverse(this.simulation));
        //this.store.dispatch({ type: 'GRAPH_TRAVERSE_CYCLES', payload: 1 });
        this.store.actions.graph.traverse();
    }

    goBackward() {
        this.store.dispatch({ type: 'GRAPH_UNDO' });
    }

    getRemainingCycles(nextTime) {
        let timeDifference = nextTime - this.currentTime;
        let remainingCycles = timeDifference/this.cycleTime;
        return remainingCycles;
    }

    iterateForward(cycles) {
        alert('forward cycles '+cycles);
        for (let i = 0; i < cycles; i++) {
           this.goForward();
        }
    }

    iterateBackward(cycles) {
        // alert('backward cycles '+cycles)
        console.warn('undo cycles', cycles);
            for (let i = cycles; i < 0; i++) {
                this.goBackward();
            }

    }
}