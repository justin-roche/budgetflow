import { accessPath } from '../utilities/utilities';
import { linkOperators } from './operators';

function applyLinkFunction({ config, graph, source, target }) {
    // if (config.active === false) {
    //     return;
    // }
    /* subject1, subject2 = the evaluated property of the source/target */

    let object = config['object'].value;
    /* if the value is path, get the value from the state */
    if (typeof object === 'string') object = accessPath(graph, object);

    let evaluationFunction = linkOperators[(<any>config).operator.value];

    /* apply the operator to the source and its object */
    evaluationFunction(target, object, source);
}

export { applyLinkFunction };