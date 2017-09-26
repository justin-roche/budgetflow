import { BehaviorSubject } from 'rxjs';


export class Store {
    store;

    provideStore(reduxInstance) {
        this.store = reduxInstance;
    }

    dispatch(...args) {
        this.store.dispatch(...args);
    }

    subscribe(...args) {
        return this.store.subscribe(...args);
    }

    getState() {
        return this.store.getState();
    }

    select(selector): BehaviorSubject<any> {

        let o = new BehaviorSubject();

        let previous = selector.split('.').reduce((acc, prop) => {
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
                console.log('selector triggered:', selector)
                previous = slice;
                o.next(slice);
            }
        });
        if(previous === null) {
            console.log('selector not initialized', selector)
            o = o.skip(1);
        } else {
            console.log('selector initialized:', selector, previous)
            o.next(previous);
        }
       
        return o;
        
    }

}