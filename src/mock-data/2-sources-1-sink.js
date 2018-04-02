let convergentSourcesGraph = {

    "id": "g10",
    "data": {
        "id": "g10",
        "name": "2 sources 1 sink",
        "displayFunctions": {
            "nodes": [
                {
                    "name": "labelById",
                    "arguments": []
                }
            ]
        }
    },
    "nodes": {
        "n0": {
            "id": "n0",
            "outEdges": [
                "e0"
            ],
            "inEdges": []
        },
        "n1": {
            "id": "n1",
            "outEdges": [],
            "inEdges": [
                "e0",
                "e1"
            ]
        },
        "n2": {
            "id": "n2",
            "outEdges": [
                "e1"
            ],
            "inEdges": []
        }
    },
    "nodesData": {
        "n0": {
            "id": "n0",
            "type": "source",
            "active": true,
            "value": 10,
            "nodeFunctions": [
                
            ],
            "displayFunctions": [],
            "displayData": {
                "outlineColor": "blue",
                "label": "n0:0"
            }
        },
        "n1": {
            "id": 'n1',
            "active": true,
            "type": "sink",
            "displayFunctions": [],
            "nodeFunctions": [],
            "displayData": {},
            "value": 0
        },
        "n2": {
            "id": 'n2',
            "active": true,
            "type": "source",
            "displayFunctions": [],
            "nodeFunctions": [],
            "displayData": {},
            "value": 10
        }
    },
    "edges": {
        "e0": {
            "source": "n0",
            "target": "n1",
            "id": "e0"
        },
        "e1": {
            "source": "n2",
            "target": "n1",
            "id": "e1"
        }
    },
    "edgesData": {
        "e0": {
            "id": "e0",
            active: true,
            linkFunctions: [{ name: 'transfer', arguments: {amount: {value: 1}} }],
        },
        "e1": {
            "id": "e1",
            active: true,
            linkFunctions: [{ name: 'transfer', arguments: {amount: {value: 1}} }],
        }
    }
}

export { convergentSourcesGraph };