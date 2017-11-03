function simulationReducer(state: Simulation = null, action) {
    
    switch (action.type) {

        case 'SIMULATION_NEXT_TIME_SET': {
            return {...state,  ...setNextTime(state, action.payload) };
        }
        case 'SIMULATION_CURRENT_TIME_SET': {
            return {...state,  currentTime: action.payload };
        }
        case 'SIMULATION_SET': {
            return (action.payload);
        }
        case 'REMAINING_CYCLES_SET': {
            return { ...state, remainingCycles: action.payload }
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
    let timeDifference = nextTime - state.currentTime;

    let remainingCycles = timeDifference/state.cycleTime;
    return {...state, nextTime: nextTime, remainingCycles: remainingCycles};
}

export { simulationReducer };