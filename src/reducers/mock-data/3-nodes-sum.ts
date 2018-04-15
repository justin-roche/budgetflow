// 
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
    "edgesData": [
        null,
        [
            {
                "id": "1-0",
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
                "id": "1-2",
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
            {
                "id": "1-3",
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
            "groupIds": [
                0
            ],
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
            "d3": {
                "label": "null:9",
                "id": "0",
                "x": 449,
                "y": 372
            },
            "value": 9,
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
            "name": "sum",
            "source": true,
            "groupIds": [
                1
            ],
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
            "d3": {
                "label": "sum:18",
                "id": "1",
                "x": 725,
                "y": 284
            },
            "value": 18,
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
                "edge": {
                    "svg": "sum"
                },
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
            "groupIds": [
                0
            ],
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
            "d3": {
                "label": "null:9",
                "id": "2",
                "x": 850,
                "y": 444
            },
            "value": 9,
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
        },
        {
            "active": true,
            "id": "3",
            "groupIds": [
                1
            ],
            "name": null,
            "source": false,
            "displayFunctions": [],
            "nodeFunctions": [],
            "d3": {
                "label": "null:0",
                "id": "3",
                "x": 967,
                "y": 224
            },
            "value": 0
        }
    ],
    "edges": [
        {
            "source": "1",
            "target": "0",
            "id": "1-0",
            "svg": "sum"
        },
        {
            "source": "1",
            "target": "2",
            "id": "1-2",
            "svg": "sum"
        },
        {
            "source": "1",
            "target": "3",
            "id": "1-3",
            "svg": "sum"
        }
    ],
    "conditions": [],
    "simulation": {
        "on": false,
        "cycleTime": 86400000,
        "beginRangeTime": 1523119053444,
        "endRangeTime": 1546300800000,
        "currentTime": 1525106253444,
        "targetTime": null,
        "remainingCycles": null,
        "forward": null,
        "currentTimeFormatted": "04/30/2018",
        "targetTimeFormatted": null
    },
    "nodeGroups": [
        {},
        {}
    ]
}
let THREE_NODES_SUM = g;
export {THREE_NODES_SUM
};