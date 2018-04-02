import { accessPath } from '../utilities/utilities';
import { nodeOperators } from './operators';

function applyNodeFunction({ config, graph, source }) {
    if (!source.active) {
        return;
    }
    let object = config['object'].value;

    /* if the value is path, get the value from the state */

    if (typeof object === 'string') object = accessPath(graph, object);

    let evaluationFunction = nodeOperators[(<any>config).operator.value];

    /* apply the operator to the source and its object */
    evaluationFunction(source, object);
}

export { applyNodeFunction };