let simulationActions = function (store) {
    
        return {
            name: 'simulation',
            actions: {
                setTargetTime: function(t) {
                     store.dispatch({ type: 'SIMULATION_SET', payload: setTargetTime(store.getPresentState(), t)}); 
                },
                clearTargetTime: function(t) {
                    store.dispatch({ type: 'SIMULATION_SET', payload: clearTargetTime(store.getPresentState()) }); 
                }
            }
        }
    
    
    }


function setTargetTime(state, t) {
    let sim = {...state.simulation};

    sim.targetTime = t; 
    sim.remainingCycles = (t - sim.currentTime)/sim.cycleTime;
    sim.forward = t > sim.currentTime;

    return sim;
}

function clearTargetTime(state) {
    let sim = {...state.simulation};

    sim.currentTime = sim.targetTime;
    sim.targetTime = null; 
    sim.remainingCycles = null;
    sim.forward = null;

    return sim;
}
    
function simulationReducer(state: Simulation = null, action) {
    
    
    switch (action.type) {

        case 'SIMULATION_SET': {
            return (action.payload);
        }
        case 'SIMULATION_NEXT_TIME_SET': {
            return {...state, nextTime: action.payload};
        }
        case 'SIMULATION_CURRENT_TIME_SET': {
            return {...state,  currentTime: action.payload };
        }
        
        case 'REMAINING_CYCLES_SET': {
            return { ...state, remainingCycles: action.payload}
        }
        case 'SIMULATION_ON_TOGGLE': {
            return {...state, on: !state.on};
        }
        case 'SIMULATION_ON': {
            return {...state, simulating: true};
        }
        case 'SIMULATION_OFF': {
            return {...state, simulating: false};
        }
        default:
            return state;
    }

}

function setNextTime(state, nextTime) {
    
}

export { simulationReducer, simulationActions };