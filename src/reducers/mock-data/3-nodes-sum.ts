let g = {
    "id": "g0",
    "data": {
        "id": "g0",
        "name": "sum-nodes",
        "displayFunctions": {
            "nodes": [
                {
                    "name": "labelByName",
                    "arguments": []
                }
            ]
        }
    },
    "nodes": [
        {
            "id": "0",
            "outEdges": [],
            "inEdges": [
                "0"
            ],
            "x": 449,
            "y": 372
        },
        {
            "id": "1",
            "outEdges": [
                "0",
                "1"
            ],
            "inEdges": [],
            "x": 725,
            "y": 284
        },
        {
            "id": "2",
            "outEdges": [],
            "inEdges": [
                "1"
            ],
            "x": 850,
            "y": 444
        }
    ],
    "edgesData": [
        null,
        [
            {
                "id": "0",
                "active": true,
                "linkFunctions": [
                    {
                        "phase": "post",
                        "operator": {
                            "value": "sum"
                        },
                        "object": {}
                    }
                ]
            },
            null,
            {
                "id": "1",
                "active": true,
                "linkFunctions": [
                    {
                        "phase": "post",
                        "operator": {
                            "value": "sum"
                        },
                        "object": {}
                    }
                ]
            }
        ]
    ],
    "nodesData": [
        {
            "active": true,
            "id": "0",
            "groupId": 0,
            "name": null,
            "source": true,
            "displayFunctions": [],
            "nodeFunctions": [
                {
                    "name": "salary",
                    "operator": {
                        "value": "+"
                    },
                    "object": {
                        "value": 1
                    }
                }
            ],
            "displayData": {
                "label": "null:14"
            },
            "value": 14,
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
        },
        {
            "active": true,
            "id": "1",
            "name": null,
            "source": true,
            "groupId": 1,
            "displayFunctions": [],
            "nodeFunctions": [
                {
                    "operator": {
                        "value": "="
                    },
                    "object": {
                        "value": 0
                    }
                }
            ],
            "displayData": {
                "label": "null:28"
            },
            "value": 28,
            "type": {
                "name": "sum",
                "linkFunctions": [
                    {
                        "phase": "post",
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
                        "operator": {
                            "value": "="
                        },
                        "object": {
                            "value": 0
                        }
                    }
                ]
            }
        },
        {
            "active": true,
            "id": "2",
            "groupId": 0,
            "name": null,
            "source": true,
            "displayFunctions": [],
            "nodeFunctions": [
                {
                    "name": "salary",
                    "operator": {
                        "value": "+"
                    },
                    "object": {
                        "value": 1
                    }
                }
            ],
            "displayData": {
                "label": "null:14"
            },
            "value": 14,
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
                        }
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
    ],
    "edges": [
        {
            "source": "1",
            "target": "0",
            "id": "0",
            "svg": 'sum',
        },
        {
            "source": "1",
            "target": "2",
            "id": "1"
        }
    ],
    "conditions": [],
    "simulation": {
        "on": false,
        "cycleTime": 86400000,
        "beginRangeTime": 1523119053444,
        "endRangeTime": 1546300800000,
        "currentTime": 1524328653444,
        "targetTime": null,
        "remainingCycles": null,
        "forward": null,
        "currentTimeFormatted": "04/21/2018",
        "targetTimeFormatted": null
    },
    "nodeGroups": [
        {},
        {}
    ]
}
let THREE_NODES_SUM = g;
export {THREE_NODES_SUM};