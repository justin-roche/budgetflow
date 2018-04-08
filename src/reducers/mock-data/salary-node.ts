import { BLANK_GRAPH } from './blank-graph';


let nodes = [
    {
        "id": "0",
        "outEdges": [],
        "inEdges": [],
        "x": 449,
        "y": 372
    }
];

let nodesData = [
       { "active": true,
        "id": "0",
        groupId: 0,
        "name": null,
        "source": true,
        "displayFunctions": [],
        "nodeFunctions": [{
            "name": "salary",
            "operator": {
                "value": "+"
            },
            "object": {
                "value": 1
            },
        }],
        "displayData": {
            "label": "null:0"
        },
        "value": 0,
        "type": {
            "name": "salary",
            "nodeFunctions": [
                {
                    "name": "salary",
                    "operator": {
                        "value": "+"
                    },
                    "object": {
                        "value": 1
                    },
                    "id": "f-1"
                }
            ],
            "linkFunctions": [
                {
                    "operator": {
                        "value": "transfer"
                    },
                    "object": {
                        "value": 1
                    }
                }
            ],
            "source": true,
            "direction": "source"
        }
    }
];


let g = JSON.parse(JSON.stringify(BLANK_GRAPH));

g.data.name = 'salary-node'
g.nodes = nodes;
g.nodesData = nodesData;

let SALARY_NODE_GRAPH = g;
export {SALARY_NODE_GRAPH};

