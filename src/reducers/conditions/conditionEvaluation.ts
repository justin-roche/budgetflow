import { operators } from './operators';
import { accessPath } from '../utilities/utilities';

let evaluateCondition = function({ config, graph, source, target }: FunctionArgs): FunctionArgs {

    let tmpTarget = Object.assign({}, target);

    let subjectPath: any = config.arguments.subjectPath;
    let objectPath: any = config.arguments.objectPath;

    let subject = accessPath(graph, subjectPath);
    let object = (<any>config).arguments.object || accessPath(graph, objectPath);
    
    let comparisonFunction = operators[(<any>config).arguments.operator];
    let evalResult = comparisonFunction(subject, object);

    if(evalResult) {
        let effect: any = config.arguments.effect;
        let effectFunction = operators[effect];
        tmpTarget = effectFunction(target);
        
    }

    return { target: tmpTarget, config, graph, source };
};



export { evaluateCondition };