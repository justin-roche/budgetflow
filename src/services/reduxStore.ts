import { BehaviorSubject } from 'rxjs';


export class Store {
    store;

    provideStore(reduxInstance) {
        this.store = reduxInstance;
    }

    dispatch(...args) {
        this.store.dispatch(...args);
        let self  = this;
        return nextMonad()

        function nextMonad() {
            return {
                next: function (cb) {
                    cb(self.store.getState());
                    return nextMonad();
                }
            }
        }
    }

    dispatchSequence(...actions) {
        actions.reduce((acc, action) => {
            this.dispatch(...action);
            console.log('new store', this.store);
            return this.store;
        }, null)
    }

    subscribe(...args) {
        return this.store.subscribe(...args);
    }

    getState(): AppState {
        return this.store.getState();
    }

    select(selector, options = {}): BehaviorSubject<any> {
        let log = options.log || false;
        let time = options.time || 'present';

        let o = new BehaviorSubject({});
        let selectorArray = selector.split('.');
        selectorArray.splice(1,0,time);
        selector = selectorArray.join('.');

        let previous = selector.split('.').reduce((acc, prop) => {
            // if(acc[options.time]) return acc[options.time][prop];
            return acc[prop];
        }, this.store.getState());

        this.store.subscribe(() => {
            let state = this.store.getState();
            let slice = selector.split('.').reduce((acc, prop) => {
                return acc[prop];
            }, state);

            if (typeof slice === 'undefined') {

            }
            else if (previous !== slice) {
                if (log) console.log('selector triggered (current not equal to last):', selector)
                previous = slice;
                o.next(slice);
            }
        });
        if (previous === null) {
            if (log) console.log('selector skipped (previous value null)', selector)
            o = o.skip(1);
        } else {
            if (log) console.log('selector triggered on initialization (previous value not null):', selector, previous)
            o.next(previous);
        }

        return o;

    }

}