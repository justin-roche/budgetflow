/* simuluation */

function createSimulation() {
    let d3 = this.d3;
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    let labels = svg.selectAll('.label');


    let simulation = this.d3.forceSimulation(this.nodes)

    /* initialize the edges for link simulation so they appear */

    let f = this.d3.forceLink(this.edges).id(function (d) { return d.id; })
    f.strength(function (d) { return 0 });

    simulation.force("link", f);
    // .force("charge", d3.forceManyBody().strength(1))
    // .alphaTarget(1)

    simulation.on("tick", ticked);

    function ticked() {
        if (!this.paused) {
            let nodes = svg.selectAll('.node');
            let links = svg.selectAll('.link')
            let labels = svg.selectAll('.label')
            let icons = svg.selectAll('.icon')

            links
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            nodes.each(function (d) {
                if (d.shape === 'square') {
                    d3.select(this)
                        .attr("x", function (d) { return d.x; })
                        .attr("y", function (d) {
                            return d.y - Number(this.d3.select(this).attr('height') / 2);
                        })
                    // .attr("rx", function (d) { return d.x; })
                    // .attr("ry", function (d) { return d.y; });
                } else {
                    d3.select(this)
                        .attr("cx", function (d) { return d.x; })
                        .attr("cy", function (d) { return d.y; })
                }
            })

            labels.attr("transform", function (d) {
                return "translate(" + (d.x + 20) + "," + (d.y + 20) + ")";
            });
            icons.attr("transform", function (d) {
                return "translate(" + (d.x) + "," + (d.y) + ")";
            });
        }

    }

    return simulation;
}

function updateSimulationElements() {
    this.simulation.nodes(this.nodes);

    let forceStrength = this.simulate ? 1 : 0;
    let f = this.d3.forceLink(this.edges).id(function (d) { return d.id; })
    f.strength(function (d) { return forceStrength });

    this.simulation.force("link", f);
    this.simulation.restart();
}

function startSimulation() {
    var svg = this.d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    let f = this.d3.forceLink(this.edges).id(function (d) { return d.id; })
    f.strength(function (d) { return 1 });

    this.simulation.force("link", f);

    this.simulation
        //.alphaTarget(1)
        .restart();
}

function stopSimulation() {

    this.simulation.force('link', null)

}

function initializeSimulation() {
    // this.simulation.force('link', null)
}

export { createSimulation, initializeSimulation, updateSimulationElements, startSimulation, stopSimulation }

 //this.simulation.alphaTarget(0)
    //this.simulation.force('charge', null)
 //this.simulation.force("center", this.d3.forceCenter(width / 2, height / 2))
    //this.simulation.force('link', this.d3.forceLink)
    //this.simulation.velocityDecay(0.9)
    // this.simulation.force('charge', this.d3.forceManyBody)
     //this.simulation.force('center', null)
    // this.simulation.stop();