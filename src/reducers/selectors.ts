import { BehaviorSubject } from 'rxjs';



// const createSelector = function(selector, obs) {
//     let previous = null;
//    return function(state) {
//        let slice = selector.split('.').reduce((acc, prop)=>{
//         return acc[prop]; 
//        },state);
//        console.log('slice', slice);
//        if(previous != null) {
//         return slice;
//        }
//        previous = slice;
//    }
// }

// const createSelector = function (context, store, selector):BehaviorSubject<any> {
//     let o = new BehaviorSubject({});
    
//     let previous = selector.split('.').reduce((acc, prop) => {
//         return acc[prop];
//     }, store.getState());

//     store.subscribe(() => {
//         let state = store.getState();
//         let slice = selector.split('.').reduce((acc, prop) => {
//             return acc[prop];
//         }, state);
//         console.log('slice', slice);
//         if(typeof slice === 'undefined'){

//         }
//         else if (previous !== slice) {
//             o.next(slice);
//             previous = slice;
//         }
//     });

//     return o.skip(1);
// }

// export { createSelector };