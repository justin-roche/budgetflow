
let SimulationFunctions = {

    stepFunctions: {
        increment: function(nodeData, argument) {
            return {value: nodeData.value + argument}
        },
        equal: function(value, node) {
            return value;
        },
        activate: function(node, value) {
            if(node.data.value >= value) {
                node.data.active = true;
            } else {
                node.data.active = false;
            }
        }
    },

    linkFunctions: {
        transfer: function(sourceNode, targetNode, amount) {
            return {source: {...sourceNode, value: sourceNode.value - amount},
                    target: {...targetNode, value: targetNode.value + amount}};
        }
    },

    displayFunctions: {
        idByIndex: function(node,i){
            node.index = 'n'+i;
        },

        toggle: function(node) {
            if (node.data.active) {
                node.color = 'black';
            } else {
                node.color = 'gray';
            }
        },
        
        sizeByValue: function(node, nodeData, multiplier) {
            let newSize = nodeData.value * multiplier;
            if(newSize <10) {
                newSize = 10;
            }
            return {...node, r: newSize};
        },

        labelById: function(node) {
            node.label = node.id;
        },

        randomPosition: function(node) {
            node.x = Math.random();
            node.y = Math.random();
        },

        
    },

    stockFunctions: {
        add: function(value, sourceNode, targetNode) {

        }
    },

    informationFunctions: {

    },

    quantifiers: {
        ifAnywhere: {


        }
        
    }
}

export { SimulationFunctions}