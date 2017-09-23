
export class SimulationFunctions {

    stepFunctions = {
        increment: function(value, node) {
            node.data.value = node.data.value + value;
        },
        equal: function(value, node) {
            node.data.value = value;
        },
        activate: function(node, value) {
            if(node.data.value >= value) {
                node.data.active = true;
            } else {
                node.data.active = false;
            }
        }
    }

    linkFunctions = {
        transfer: function(sourceNode, targetNode, value) {
            sourceNode.data.value = sourceNode.data.value - value;
            targetNode.data.value = targetNode.data.value + value;
        }
    }

    displayFunctions = {
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
        
        sizeByValue: function(node) {
            node.size = node.data.value;
        },

        labelById: function(node) {
            node.label = node.id;
        },

        randomPosition: function(node) {
            node.x = Math.random();
            node.y = Math.random();
        },

        
    }

    stockFunctions = {
        add: function(value, sourceNode, targetNode) {

        }
    }

    informationFunctions = {

    }

    quantifiers: {
        ifAnywhere: {


        }
        
    }
}