
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
        },

        /* a transducer does not subtract from the original node, only increases the target node, because it is a different type of information */
        transduce: function(sourceNode, targetNode, amount, integral) {
            return {source: sourceNode,
            target: {...targetNode, value: targetNode.value + (amount * integral || 1)}};
        }
    },

    preLinkFunctions: {
        derive: function(source, target, dataKey, expression) {
            let r = eval(expression);
            let newTarget = {};
            newTarget[dataKey] = r;
            return {source: source, target: {...target, newTarget}};
        } 
    },

    displayFunctions: {
        labelById: function(node, nodeData) {
            return {...nodeData.displayData, label: node.id+ ':' + nodeData.value};
        },

        // idByIndex: function(node,i){
        //     node.index = 'n'+i;
        // },

        // toggle: function(node) {
        //     if (node.data.active) {
        //         node.color = 'black';
        //     } else {
        //         node.color = 'gray';
        //     }
        // },
        
        // sizeByValue: function(node, nodeData, multiplier) {
        //     let newSize = nodeData.value * multiplier;
        //     if(newSize <10) {
        //         newSize = 10;
        //     }
        //     return {...node, r: newSize};
        // },

        // randomPosition: function(node) {
        //     node.x = Math.random();
        //     node.y = Math.random();
        // },

        
    },

    stockFunctions: {
        add: function(value, sourceNode, targetNode) {

        }
    },

    quantifiers: {
        ifAnywhere: {


        }
        
    }
}

export { SimulationFunctions}