import { BehaviorSubject } from 'rxjs';

export class Store {
    public actions;
    
    public store;

    public provideStore(reduxInstance) {
        this.store = reduxInstance;
    }

    provideActions(actionCreators) {
        let boundActionCreators = actionCreators.map(actionCreator => actionCreator(this));
        this.actions = boundActionCreators.reduce((acc, actionCreator)=> {
            acc[actionCreator.name] = actionCreator.actions;
            return acc;
        },{});
    }

    setState(s) {
        this.store.dispatch({type: 'SET_STATE', payload: s});
    }

    getState(): AppState {
        return this.store.getState();
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

    

    getPresentState(): AppState {
        let s = this.store.getState();
        let s2 = {} 
        for(let prop in s) {
            s2[prop] = s[prop].present;
        }
        return (<AppState>s2);
    }

    select(selector, options:any = {}): BehaviorSubject<any> {
        let log = options.log || false;
        let time = options.time || 'present';

        let o = new BehaviorSubject({});
        let selectorArray = selector.split('.');
        selectorArray.splice(1,0,time);
        selector = selectorArray.join('.');

        if(options.bind) {
            let context = options.bind[0];
            let property = options.bind[1];
            o.subscribe(v => {
                context[property] = v;
            })
        }

        let previous = selector.split('.').reduce((acc, prop) => {
            // if(acc[options.time]) return acc[options.time][prop];
            return acc[prop];
        }, this.store.getState());

        this.store.subscribe(() => {
            let state = this.store.getState();
            let slice = selector.split('.').reduce((acc, prop) => {
                if(acc === undefined) {
                    debugger;
                }
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