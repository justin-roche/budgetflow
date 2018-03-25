import { operators } from './operators';
import { accessPath } from '../utilities/utilities';

let evaluateCondition = function({ config, graph, source, target }: FunctionArgs): FunctionArgs {

    let tmpTarget = Object.assign({}, target);

    let subject = config['subject'].value;
    let object = config['object'].value; 

        /* if the value is path, get the value from the state */

    if(typeof subject === 'string') subject = accessPath(graph, subject);
    if(typeof object === 'string') object = accessPath(graph, object);
    
    let comparisonFunction = operators[(<any>config).operator.value];
    let evalResult = comparisonFunction(subject, object);

    if(evalResult) {
        let effect: any = config['effect'].value;
        let effectFunction = operators[effect];
        tmpTarget = effectFunction(target);
    }

    return { target: tmpTarget, config, graph, source };
};



export { evaluateCondition };