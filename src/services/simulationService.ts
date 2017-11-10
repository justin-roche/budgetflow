import { inject } from 'aurelia-framework';
import { Store } from './reduxStore';
import { graphActions } from '../reducers/graphReducer';

@inject(Store)
export class SimulationService {

    constructor(private store: Store) {
        
    }

    setTargetTime(t: Number) {
        let simulation = this.store.actions.simulation.setTargetTime(t).getPresentState().simulation;
        if(simulation.on) this.simulate(simulation);
    }

    simulate(simulation) {
        if(simulation.forward) {
            this.store.actions.graph.traverse()
            this.store.actions.graph.applyDisplayFunctions()
            this.store.actions.simulation.clearTargetTime();
        } else {
            this.store.actions.graph.undo()
                .actions.graph.applyDisplayFunctions()
                .actions.simulation.clearTargetTime();
        }
    }

}