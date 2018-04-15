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
    
    "nodesData": [
        {
            "active": true,
            "id": 1523814619712,
            index: 0,
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
            "id": 1523814687379,
            index: 1,
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
            "id": 1523814702352,
            index: 2,
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
            "id": 1523814728319,
            index: 3,
            "groupIds": [
                1
            ],
            "name": null,
            "source": false,
            "displayFunctions": [],
            "nodeFunctions": [],
            "d3": {
                "label": "null:0",
                "x": 967,
                "y": 224
            },
            "value": 0
        }
    ],
    "edgesData": [
        null,
        [
            {
                "id": 1523817171522,
                "active": true,
                "linkFunctions": [
                    {
                        "phase": "post",
                        "operator": {
                            "value": "sum"
                        },
                        "object": {}
                    }
                ],
                d3:  {
                    "source": 1523814687379,
                    "target": 1523814619712,
                    "svg": "sum"
                },
            },
            null,
            {
                "id": 1523817200305,
                "active": true,
                "linkFunctions": [
                    {
                        "phase": "post",
                        "operator": {
                            "value": "sum"
                        },
                        "object": {}
                    }
                ],
                d3:  {
                    "source": 1523814687379,
                    "target": 1523814702352,
                    "svg": "sum"
                },
            },
            {
                "id": 1523817212507,
                "active": true,
                "linkFunctions": [
                    {
                        "phase": "post",
                        "operator": {
                            "value": "sum"
                        },
                        "object": {}
                    }
                ],
                d3:  {
                    "source": 1523814687379,
                    "target": 1523814728319,
                    "svg": "sum"
                }
            }
        ]
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