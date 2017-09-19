
export class NodeFunctions {
    stepFunctions = {
        increment: function(value, node) {
            node.data.value = node.data.value + value;
        },
        equal: function(value, node) {
            node.data.value = value;
        }
    }

    linkFunctions = {
        transfer: function(sourceNode, targetNode, value) {
            sourceNode.data.value = sourceNode.data.value - value;
            targetNode.data.value = targetNode.data.value + value;
        }
    }

    stockFunctions = {
        add: function(value, sourceNode, targetNode) {

        }
    }

    informationFunctions = {

    }
}