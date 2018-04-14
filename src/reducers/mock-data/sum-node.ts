import { SALARY_NODE_GRAPH } from './salary-node';

let nodes = [
    {
        "id": "0",
        "outEdges": [],
        "inEdges": [],
        "x": 725,
        "y": 284
    }
];

let nodesData = [
    {
        "active": true,
        "id": "0",
        "name": null,
        "source": true,
        groupIds: [1],
        "displayFunctions": [],
        "nodeFunctions": [
            {
                operator: { value: '=' },
                object: { value: 0 }
            }
        ],
        "displayData": {
            "label": "sum:0"
        },
        "value": 0,
        "type": {
            "name": "sum",
            "linkFunctions": [
                {
                    phase: 'post',
                    "operator": {
                        "value": "sum"
                    },
                    "object": {}
                }
            ],
            "source": true,
            "direction": "source",
            "nodeFunctions": [
                {
                    operator: { value: '=' },
                    object: { value: 0 }
                }
            ]
        }
    }
];

let g = JSON.parse(JSON.stringify(SALARY_NODE_GRAPH));

g.data.name = 'sum-node'
g.nodes = g.nodes.concat(nodes);
g.nodesData = g.nodesData.concat(nodesData);
g.nodeGroups = [{},{}]

g.nodesData.forEach((nd, i) => {
    nd.id = String(i);
})
g.nodes.forEach((nd, i) => {
    nd.id = String(i);
})
let SUM_NODE_GRAPH = g;
export { SUM_NODE_GRAPH };