
let cycle: Graph = {
    "id": "g3",
    "data": {
        "id": "g3",
        "name": "cycle",
        "displayFunctions": {
            "nodes": [
                {
                    "name": "labelById"
                },
                {
                    "name": "inactivateByLinks"
                }
            ]
        }
    },
    "nodesIds": [
        "n0",
        "n1",
        "n2"
    ],
    "nodes": {
        "n0": {
            "id": "n0",
            "outEdges": [
                "e0"
            ],
            "inEdges": [
                "e2"
            ]
        },
        "n1": {
            "id": "n1",
            "outEdges": [
                "e1"
            ],
            "inEdges": [
                "e0"
            ]
        },
        "n2": {
            "id": "n2",
            "outEdges": [
                "e2"
            ],
            "inEdges": [
                "e1"
            ]
        }
    },
    "nodesData": {
        "n0": {
            "id": "n0",
            "type": "source",
            "value": 10,
            active: true,
            "stepFunctions": [],
            "displayFunctions": [],
            "displayData": {
                "label": "n0:10",
                "active": true
            }
        },
        "n1": {
            "id": "n1",
            "type": "sink",
            "active": true,
            "value": 0,
            "stepFunctions": [],
            "displayFunctions": [],
            "displayData": {
                "label": "n1:0",
                "active": true
            }
        },
        "n2": {
            "id": "n2",
            "type": "sink",
            "active": true,
            "value": 0,
            "stepFunctions": [],
            "displayFunctions": [],
            "displayData": {
                "label": "n2:0",
                "active": true
            }
        }
    },
    "edgesIds": [
        "e0",
        "e1",
        "e2"
    ],
    "edges": {
        "e0": {
            "id": "e0",
            "source": "n0",
            "target": "n1"
        },
        "e1": {
            "id": "e1",
            "source": "n1",
            "target": "n2"
        },
        "e2": {
            "source": "n2",
            "target": "n0",
            "id": "e2"
        }
    },
    "edgesData": {
        "e0": {
            "id": "e0",
            "linkFunctions": [
                "f1"
            ],
            "active": true
        },
        "e1": {
            "id": "e1",
            "linkFunctions": [
                "f1"
            ],
            "active": true
        },
        "e2": {
            "id": "e2",
            "active": true,
            "linkFunctions": ['f1']
        }
    },
    "functions": {
        "f1": {
            "name": "transfer",
            "arguments": {
                "amount": {
                    "value": 1
                }
            },
            "target": null
        }
    },
    "conditions": {

    },
    "simulation": {
        "on": false,
        "cycleTime": 86400000,
        "beginRangeTime": 2000000000,
        "endRangeTime": 2100000000,
        "currentTime": 2000000000,
        "targetTime": null,
        "remainingCycles": 0,
        "forward": null
    }
};

export { cycle }
