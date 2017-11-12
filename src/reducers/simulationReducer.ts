import undoable, { distinctState } from 'redux-undo'
import { ActionCreators } from 'redux-undo';
import { formatFromMsString } from './utilities'
let simulationActions = function (store) {
    return {
        name: 'simulation',
        actions: {
            toggleOn: function (t) {
                store.dispatch({ type: 'SIMULATION_ON_TOGGLE'});
            },
            setTargetTime: function (t) {
                store.dispatch({ type: 'SIMULATION_SET_TARGET_TIME', payload: setTargetTime(store.getPresentState(), t) });
            },
            updateCurrentTime: function (t) {
                store.dispatch({ type: 'SIMULATION_CURRENT_TIME_UPDATE', payload: updateCurrentTime(store.getPresentState()) });
            },
            incrementTargetTime: function () {
                store.dispatch({ type: 'SIMULATION_SET', payload: incrementTargetTime(store.getPresentState()) });
            },
            decrementTargetTime: function () {
                store.dispatch({ type: 'SIMULATION_DECREMENT_TARGET_TIME', payload: decrementTargetTime(store.getPresentState()) });
            },
            incrementCurrentTime: function () {
                store.dispatch({ type: 'SIMULATION_INCREMENT_CURRENT_TIME', payload: incrementCurrentTime(store.getPresentState()) });
            },
            undo: function (c = 1) {
                if(c === 1) {
                    store.dispatch({ type: 'SIMULATION_UNDO' });
                } else {
                    let currentIndex = store.getState().simulation.past.length;
                    let nextIndex = currentIndex - c;
                    store.dispatch({type: 'SIMULATION_JUMP_TO_PAST', index: nextIndex});
                }
                
            }
        }
    }


}

function incrementTargetTime(state) {
    let sim = { ...state.simulation };

    sim.targetTime = sim.currentTime + sim.cycleTime;
    sim.remainingCycles = 1;
    sim.forward = true;

    return sim;
}

function decrementTargetTime(state) {
    let sim = { ...state.simulation };

    sim.targetTime = sim.currentTime - sim.cycleTime;
    sim.remainingCycles = 1;
    sim.forward = false;

    return sim;
}

function incrementCurrentTime(state) {
    let sim = { ...state.simulation };

    sim.currentTime = sim.currentTime + sim.cycleTime;
    sim.remainingCycles = sim.currentCycles - 1;
    sim.currentTimeFormatted = formatFromMsString(sim.currentTime);
    return sim;
}

function setTargetTime(state, t) {
    let sim = { ...state.simulation };

    sim.targetTime = t;
    sim.remainingCycles = Math.abs((t - sim.currentTime) / sim.cycleTime);
    sim.forward = t > sim.currentTime;
    sim.targetTimeFormatted = formatFromMsString(sim.targetTime);
    
    return sim;
}

function updateCurrentTime(state) {
    let sim = { ...state.simulation };

    sim.currentTime = sim.targetTime;
    sim.targetTime = null;
    sim.targetTimeFormatted = null;
    sim.remainingCycles = null;
    sim.forward = null;
    sim.currentTimeFormatted = formatFromMsString(sim.currentTime);
    
    return sim;
}

function simulationReducer(state: Simulation = null, action) {


    switch (action.type) {

        case 'SIMULATION_SET': {
            return (action.payload);
        }
        case 'SIMULATION_SET_TARGET_TIME': {
            return action.payload;
        }
        case 'SIMULATION_CURRENT_TIME_SET': {
            return { ...state, currentTime: action.payload };
        }
        case 'SIMULATION_INCREMENT_CURRENT_TIME': {
            return action.payload;
        }
        case 'SIMULATION_DECREMENT_TARGET_TIME': {
            return action.payload;
        }
        case 'REMAINING_CYCLES_SET': {
            return { ...state, remainingCycles: action.payload }
        }
        case 'SIMULATION_ON_TOGGLE': {
            return { ...state, on: !state.on };
        }
        case 'SIMULATION_ON': {
            return { ...state, simulating: true };
        }
        case 'SIMULATION_OFF': {
            return { ...state, simulating: false };
        }
        case 'SIMULATION_CURRENT_TIME_UPDATE': {
            return action.payload;
        }
        default:
            return state;
    }

}

let undoableSimulationReducer = undoable(simulationReducer, {
    undoType: 'SIMULATION_UNDO', 
    redoType: 'SIMULATION_REDO', filter: function (x, prev, next) {
        return (next !== null && prev !== null) && next !== prev;
    },
    jumpToPastType: 'SIMULATION_JUMP_TO_PAST'
});

export { simulationReducer, undoableSimulationReducer, simulationActions };