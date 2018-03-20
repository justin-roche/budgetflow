import { operators } from "./operators";

let conditionFunctions = {

    timeActivate: {
        config: {
            name: 'timeActivate',
            arguments: {
                operators: ['>', '<', '=', '<=', '>='],
                targetTime: null,
            },
            effect: ['activate'],
            dataTypes: [],
        },
        fn: function({config, graph, source, target}: FunctionArgs): FunctionArgs {
            let tmpTarget = Object.assign({}, target);
            let evalResult = operators[config.arguments.operators[0]](graph.simulation.currentTime, config.arguments.targetTime.value)
            tmpTarget.active = evalResult;
            return {target: tmpTarget, config, graph, source};
        },
    }
    
}

export { conditionFunctions };