import { stepFunctions } from './stepFunctions';


function applyStepFunction(state: Graph, node) {
    if(!node.active) {
        return;
    }
    node.stepFunctions.forEach(fnId => {
        let functionConfig: any = state.functions[fnId];
        let fn = stepFunctions[functionConfig.name].fn;
        
        fn({
            graph: state,
            target: node,
            config: functionConfig
        });

    });       
       
}

export { applyStepFunction };