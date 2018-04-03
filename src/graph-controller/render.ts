function addLinks(edgesArray, data) {
    let linkGroups = this.container.select('#linklayer')
        .selectAll(".linkGroup")
        .data(edgesArray, function (d) {
            return d.key;
        })
    linkGroups.exit().remove();
    linkGroups.enter().append("g").attr("class", "linkGroup").append("line").attr("marker-end", "url(#end)");
}

function addNodes(nodesArray, data) {
    let self = this;
    let d3 = this.d3;

    let l = this.container.select('#nodelayer');
    let x = l.selectAll(".nodeGroup");
    let nodeGroups = x.data(nodesArray, function (d) {
        return d.key;
    });

    nodeGroups.exit().remove(); // remove all nodes for which no key exists in the d3 graph config
    let newGroups = nodeGroups.enter().append("g").attr("class", "nodeGroup") // add new nodes where no key exists in the Dom

    let newCircles = newGroups
        .each(function (d, i, groups) {
            if (d.shape === 'square') {
                d3.select(this).append("rect")
                    .attr('class', 'node')
            } else {
                d3.select(this).append("circle")
                    .attr('class', 'node')
            }
        })

    newGroups.append("text").attr('class', 'icon')
        .style('font-family', 'FontAwesome')
        .style('font-size', function (d) { return 1 + 'em' })

    newGroups.append("text").attr('class', 'label')

}

function renderNodes() {
    let d3 = this.d3;
    let selectedNodeId = this.ui.selectedNodeId;
    let data = this.graph;

    this.svg.
        selectAll(".label")
        .text(function (d) {
            let dd = data.nodesData[d.id].displayData;
            return dd.label;
        })

    this.svg
        .selectAll(".icon")
        //.text(function(d) { return '\uf118' }); //smiley
        .text(function (d) { return '\uf155' }); //dollar


    this.svg
        .selectAll(".node")
        .each(function (d) {
            let selected = d3.select(this);
            let nd = data.nodesData[d.id];
            let dd = nd.displayData;
            if (selectedNodeId === d.id) {
                selected.classed('selected-node', true);
            } else {
                selected.classed('selected-node', false);
            }


            if (dd.shape === 'square') {
                selected
                    .attr("x", d.x)
                    .attr("y", d.y)
                    .attr("height", 20)
                    .attr('width', 20)
            } else {
                selected
                    .attr("x", d.x)
                    .attr("y", d.y)
                    .attr("cx", d.x)
                    .attr("cy", d.y)
                    .attr("r", 20)
            }

            if (nd.displayData.active === false) {
                selected.attr('fill', 'gray')
                // selected.classed('inactive-node', true);
            } else {
                selected.attr('fill', 'white');
                // selected.classed('inactive-node', false);
            }

            selected
            // .attr('stroke', 'white')
            // .attr('stroke-width', 3)
            // .attr("fill", function (d, i) {
            //     return dd.outlineColor;
            // })

        })


}

function renderLinks(data) {
    let selectedEdgeId = this.ui.selectedEdgeId;
    let d3 = this.d3;

    this.container.selectAll('line')
        .attr("class", "link")
        .attr('id', function (d) {
            return d.id;
        })
        .each(function (d) {
            let selected = d3.select(this);
            if (selectedEdgeId === d.id) {
                selected.classed('selected-edge', true);
            } else {
                selected.classed('selected-edge', false);
            }
        })
}

export { renderLinks, renderNodes, addLinks, addNodes };