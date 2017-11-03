
function setNextTime(store, nextTime: Number) {
    store
    .dispatch({ type: 'SIMULATION_NEXT_TIME_SET', payload: nextTime })
    .next((newState) => {
        if(newState.simulation.remainingCycles < 0) {
            store.dispatch({ type: 'GRAPH_REVERSE_CYCLES', payload: newState.simulation.remainingCycles });
        }
        else if(newState.simulation.on) {
           store.dispatch({ type: 'GRAPH_TRAVERSE_CYCLES', payload: newState.simulation.remainingCycles });
        }
    })
    .next((newState) => {
        store.dispatch({ type: 'SIMULATION_CURRENT_TIME_SET', payload: nextTime });
        // this.store.dispatch({ type: 'SIMULATION_NEXT_TIME_SET', payload: null })
    })
}