import { ArrayById, ArrayToObject } from '../utilities/utilities';
import { displayFunctions } from '../../reducers/display/displayFunctions';

function displayUpdate(_g: Graph) {
    let g = JSON.parse(JSON.stringify(_g))
    let displayFns = g.data.displayFunctions.nodes;

    /* reduce the nodesArray */
    g.nodesData.forEach((nodeData) => {
        displayFns.forEach((fn) => {
            displayFunctions[fn.name](g, nodeData, fn.arguments);
        });
    });
    return g;
}

export { displayUpdate };
