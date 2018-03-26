import { stepFunctions } from './stepFunctions';


function applyStepFunction(state: Graph, nodeData) {
    if(!nodeData.active) {
        return {...nodeData};
    }
    let update = nodeData.stepFunctions.reduce((acc, stepFunctionId) => {
        
        let functionConfig: any = state.functions[stepFunctionId];
        let fn = stepFunctions[functionConfig.name].fn;
        
        let newSlice = fn({
            graph: state,
            target: acc,
            config: functionConfig
        });
        let updated = { ...acc, ...newSlice };
        return updated;
    }, { ...nodeData });

    return update;
}

export { applyStepFunction };