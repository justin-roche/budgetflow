
export class NodeFunctions {
    stepFunctions = {
        increment: function(value, node) {
            return value+1;
        },
        equal: function(value, node) {
            return value;
        }
    }
}