/* simuluation */

function createSimulation(_nodes, _links) {
    let d3 = window['d3'];
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    let labels = svg.selectAll('.label');

    let simulation = d3.forceSimulation(_nodes)
        .force("link", d3.forceLink(_links).id(function (d) { return d.id; }))
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .velocityDecay(0.9)
        .alphaTarget(1)
        .on("tick", ticked);

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
                            return d.y - Number(d3.select(this).attr('height') / 2);
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

export { createSimulation }