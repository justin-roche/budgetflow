import { formatFromMsString, extend } from '../utilities/utilities'
import { traverseGraph } from '../traversal/traverse';
import { applyEdgesConditions } from '../conditions/conditionsApply';
import { displayUpdate } from './../display/displayUpdate'

function incrementTargetTime(state) {

    return extend(state).select('simulation').data(obj => {
        return {...obj, ...{
            targetTime: obj.currentTime + obj.cycleTime,
            remainingCycles: 1,
            forward: true,
        }}
    });
}

function decrementTargetTime(state) {
    return extend(state).select('simulation').data(obj => {
        return {...obj, ...{
            targetTime: obj.currentTime - obj.cycleTime,
            remainingCycles: 1,
            forward: false,
        }}
    });
}

function incrementCurrentTime(state) {
    return extend(state).select('simulation').data(obj => {
        return {...obj, ...{
            currentTime: obj.currentTime + obj.cycleTime,
            currentTimeFormatted: formatFromMsString(obj.currentTime + obj.cycleTime),
        }}
    });

}

function setTargetTime(state, t) {

    return extend(state).select('simulation').data(obj => {
        return {...obj, ...{
            targetTime: t,
            targetTimeFormatted: formatFromMsString(t),
            remainingCycles: Math.abs((t - obj.currentTime) / obj.cycleTime),
            forward: t > obj.currentTime,
        }}
    });
}

function resetTime(state) {
    return extend(state).select('simulation').data(obj => {
        return {...obj, ...{
            currentTime: obj.targetTime,
            currentTimeFormatted: formatFromMsString(obj.currentTime),
            targetTime: null,
            targetTimeFormatted: null,
            remainingCycles: null,
            forward: null,
        }}
    });

}

function simulate(state: Graph) {
    if (state.simulation.forward === true) {
        return simulateForward(state);
    } else {
        //simulateBackward(store, state);
    }
}

function simulateForward(state: Graph) {
    let g = {...state};
    for (let i = 0; i < state.simulation.remainingCycles; i++) {
        g = {...g, ...traverseGraph(g)}
        g = {...g, ...applyEdgesConditions(g)}
        g = {...g, ...displayUpdate(g)}
        g = {...g, ...incrementCurrentTime(g)}
    }

    g = {...g, ...resetTime(g)};
    return g;
}

function simulateBackward(store, state) {
    if (this.simulation.forward === false) {
        if (state.simulation.currentTime !== state.simulation.beginRangeTime) {
            let c = state.simulation.remainingCycles;
            undo(store, state, c);
        }
    }

}

function undo(store, state, c) {
    if(c === 1) {
        store.dispatch({ type: 'GRAPH_UNDO' });
    } else {
        let currentIndex = store.getState().graph.past.length;
        let nextIndex = currentIndex - c;
        store.dispatch({type: 'GRAPH_JUMP_TO_PAST', index: nextIndex});
    }
}

export { resetTime, incrementCurrentTime, incrementTargetTime, decrementTargetTime, setTargetTime, simulate }