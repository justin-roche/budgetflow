import { ArrayById, ArrayToObject } from '../utilities';
import { displayFunctions } from '../../parser/displayFunctions';

function displayUpdate(state: AppState): Graph {

    let nodesArr: Array<NodeData> = ArrayById(state.graph.nodesData);
    let displayFns = state.graph.data.displayFunctions.nodes;

    /* reduce the nodesArray */
    let updatedNodesArr = nodesArr.reduce((acc, nodeData) => {

        let appliedNodeData = displayFns.reduce((acc, fn) => {
            let newDisplayData = displayFunctions[fn.name](state.graph, nodeData.id, ...fn.arguments);
            return { ...acc, displayData: { ...acc.displayData, ...newDisplayData } };
        }, nodeData);

        return acc.concat(appliedNodeData);

    }, []);

    /* convert back to object type */
    return { ...state.graph, nodesData: ArrayToObject(updatedNodesArr) };
}

export { displayUpdate };
