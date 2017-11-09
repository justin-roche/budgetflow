// import {conditionsUpdate} from './graphFunctions/conditionsUpdate'

// let conditionsActions = function (store) {

//     return {
//         name: 'conditions',
//         actions: {
//             conditionsUpdate: function () {
//                 return store.dispatch({ type: 'CONDITIONS_SET', payload: conditionsUpdate(store.getPresentState()) });
//             },
//         }
//     }
// }

// function conditionsReducer(state = null, action) {
//     switch (action.type) {
//         case 'CONDITIONS_SET': {
//             return action.payload;
//         }
//         default:
//             return state;
//     }

// }

// export {conditionsReducer, conditionsActions};