let g = {
    "id": "g0",
    "data": {
        "id": "g0",
        "name": "sum-nodes-transfer",
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
                "1",
                "2"
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
        },
        {
            "id": "3",
            "outEdges": [],
            "inEdges": [
                "2"
            ],
            "x": 986,
            "y": 282
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
            },
            {
                "id": "2",
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
                "label": "null:16"
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
                "label": "null:32"
            },
            "value": 0,
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
                "label": "null:16"
            },
            "value": 16,
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
            "groupId": 0,
            "name": null,
            "source": false,
            "displayFunctions": [],
            "nodeFunctions": [],
            "displayData": {},
            "value": 0
        }
    ],
    "edges": [
        {
            "source": "1",
            "target": "0",
            "id": "0",
            "svg": "sum"
        },
        {
            "source": "1",
            "target": "2",
            "id": "1"
        },
        {
            "source": "1",
            "target": "3",
            "id": "2"
        }
    ],
    "conditions": [],
    "simulation": {
        "on": false,
        "cycleTime": 86400000,
        "beginRangeTime": 1523119053444,
        "endRangeTime": 1546300800000,
        "currentTime": 1524501453444,
        "targetTime": null,
        "remainingCycles": null,
        "forward": null,
        "currentTimeFormatted": "04/23/2018",
        "targetTimeFormatted": null
    },
    "nodeGroups": [
        {},
        {}
    ]
}