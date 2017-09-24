import { Store } from 'aurelia-redux-plugin';
import { BehaviorSubject } from 'rxjs';



const createSelector = function(context, selector) {
    let name = '$'+selector.split('.').pop();
    context[name] = new BehaviorSubject(null);
    let emit = function(a) {
        context[name].next(a);
    }
    return function(state) {
        emit(state[selector])
    }
}

export {createSelector};