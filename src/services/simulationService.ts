import { inject } from 'aurelia-framework';
import { Store } from './reduxStore';
import { graphActions } from '../reducers/graphReducer';

@inject(Store)
export class SimulationService {

    private state;
    targetTime;
    simulation;

    constructor(private store: Store) {
        this.store.select('simulation.targetTime',{bind: [this, 'targetTime']}).subscribe(t => {
            this.state = this.store.getPresentState();
            this.simulation = this.state.simulation;
            if(this.simulation.on && t!==null) {
                this.simulate();
            }
        })
    }

    setTargetTime(t: Number) {
        // if(simulation.on) this.simulate(simulation);
    }

    // decrementTargetTime() {
    //     let simulation = this.store.getPresentState().simulation;
    //     if(simulation.currentTime !== simulation.beginRangeTime) {
    //         this.store.actions.graph.undo();
    //         // this.store.actions.graph.undo();
    //         this.store.actions.simulation.undo();
    //         this.store.actions.simulation.undo();
    //     }
    // }

    simulate() {
        if(this.simulation.forward === true) {
            this.simulateForward()
        } 
        if(this.simulation.forward === false) {
            this.simulateBackward()
        }
    }

    simulateForward() {
        // if(this.simulation.remainingCycles === 1) {
        //     this.store.actions.graph.traverse()
        //     this.store.actions.graph.applyConditions();
        // } else {
            for(let i = 0; i< this.simulation.remainingCycles; i++) {
                this.store.actions.graph.traverse();
                this.store.actions.graph.applyConditions();
                this.store.actions.simulation.incrementCurrentTime();
            }
        //}
        
        this.store.actions.graph.applyDisplayFunctions()
        this.store.actions.simulation.updateCurrentTime();
    }

    simulateBackward() {
        if(this.simulation.currentTime !== this.simulation.beginRangeTime) {
            this.store.actions.graph.undo()
            this.store.actions.graph.undo() // undo conditions application
            this.store.actions.graph.undo()  //undo display function application
            // .actions.graph.applyDisplayFunctions()
            .actions.simulation.updateCurrentTime();
        }
        
    }

}