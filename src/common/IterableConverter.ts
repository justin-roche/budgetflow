export class IterableValueConverter {
    // toView(value = {}) {
    //   let index = 0;
    //   let propKeys = Reflect.ownKeys(value);
    //   return {
    //       [Symbol.iterator]() {
    //           return this;
    //       },
    //       next() {
    //           if (index < propKeys.length) {
    //               let key = propKeys[index];
    //               index++;
    //               return { value: [key, value[key]] };
    //           } else {
    //               return { done: true };
    //           }
    //       }
    //   };
    // }

    toView(obj) {
        // Create a temporary array to populate with object keys
        let temp = [];
        
        // A basic for..in loop to get object properties
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...in
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                temp.push({prop: prop, value: obj[prop]});
            }
        }
        
        return temp;
    }
  }