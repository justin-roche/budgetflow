import { ArrayById, ArrayToObject } from '../utilities';
import { displayFunctions } from '../../parser/displayFunctions';

function displayUpdate(state: Graph): Graph {
    state = Object.freeze(state);
    let nodesArr: Array<NodeData> = ArrayById(state.nodesData);
    let displayFns = state.data.displayFunctions.nodes;

    /* reduce the nodesArray */
    let updatedNodesArr = nodesArr.reduce((acc, nodeData) => {

        let appliedNodeData = displayFns.reduce((acc, fn) => {
            let newDisplayData = displayFunctions[fn.name](state, acc, fn.arguments);
            return { ...acc, displayData: { ...acc.displayData, ...newDisplayData } };
        }, nodeData);

        return acc.concat(appliedNodeData);

    }, []);

    /* convert back to object type */
    return { ...state, nodesData: ArrayToObject(updatedNodesArr) };
}

export { displayUpdate };
