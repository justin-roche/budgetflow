import * as moment from 'moment';


function ArrayById(o) {
    return Object.keys(o).map(k => o[k]);
}

function ArrayToObject(a) {
    return a.reduce((acc, n) => {
        return { ...acc, [n.id]: n };
    }, {});
}

class ExtensionMonad {
    
        private base;
        private selector;

        constructor(o) {
            this.base = o;
        }
    
        map(fn) {
            let o = {...this.base}
            for (let prop in o) {
                o[prop] = {...o[prop], ...fn(o[prop])};
            }
            return o;
        }
        
        select(str) {
            this.selector = str.split('.');
            return this;
        }

        asProperty() {

        }

        withObject() {
            //this.selector
        }

        data(d) {
            if(typeof d === 'function') {
                d = d(this.access(this.selector))
            }
            return {...this.base, [this.selector[0]]: this.extend(this.selector, d, this.base, null)};
        }

        access(accessPath) {
            return accessPath.reduce((acc, prop) => {
                return acc[prop];
            }, this.base);
        }

        extend(accessPath, obj, base, lastProp) {
            if(accessPath.length === 0) {
                return {...obj};
            } else {
                let oldSlice = this.access(accessPath);
                let newSlice;
                if(lastProp) {
                    newSlice = {...oldSlice, [lastProp]: {...obj}} //extend on a prop
                } else {
                    newSlice = {...oldSlice, ...obj}  // merge over
                }
                lastProp = accessPath.pop();
                return this.extend(accessPath, newSlice, base, lastProp)
            }
            
        }
    }

function extend(obj) {
        return new ExtensionMonad(obj);
}

function formatFromMsString(s: String) {
    let d = new Date(Number(s));
    return moment(d).format('MM/DD/YYYY');
}



export { ArrayById, ArrayToObject, extend, formatFromMsString };