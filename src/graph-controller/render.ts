let CIRCLE_RADIUS = 20;

function addContainer() {
    this.svg = this.d3.select('svg');
        this.svg
            .attr("width", 1200)
            .attr("height", 800);

        if (!this.container) {
            this.svg = this.d3.select('svg');
            this.container = this.svg.append('g');
            // addZoomListener.call(this);
        }
        this.container.append("g").attr("id", "linklayer")
        this.container.append("g").attr("id", "nodelayer")

        defineLinkDefs.call(this);
       
}

function defineLinkDefs() {
    let markers = this.container.append("svg:defs")
    .selectAll("marker")
    
    markers.data(["end"])      // Different link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 2)
    .attr("markerHeight", 2)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

    markers.data(["sum"])      // Different link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 2)
    .attr("markerHeight", 2)
    .attr("orient", "auto")
    .append("svg:path")
    //.attr("d", "M0,-5L10,0L0,5");

    
}

/* does not perform anything on existing links */

function addLinks(edgesArray, data) {
    let d3 = this.d3;
    let linkGroups = this.container.select('#linklayer')
        .selectAll(".linkGroup")
        .data(edgesArray, function (d) {
            return d.key;
        })
    linkGroups.exit().remove();
    
    let newGroups = linkGroups.enter().append("g").attr("class", "linkGroup");
    newGroups.each(function (edge, i, groups) {
        d3.select(this)
        .append("line")
       
         if(edge.svg) {
            d3.select(this).attr("marker-end", `url(#${edge.svg})`);
            // d3.select(this).attr('stroke', 'url(#diagonalHatch)')
         } else {
            d3.select(this).attr("marker-end", "url(#end)");
         }
    })

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

    configureLabels.call(this, data)

    this.svg
        .selectAll(".icon")
        //.text(function(d) { return '\uf118' }); //smiley
        .text(function (d) { return '\uf155' }); //dollar

    this.svg
        .selectAll(".node")
        .each(function (d) {
            let selected = d3.select(this);
            let dd = data.nodesData.filter(nd => nd.id === d.key)[0].d3;

            if (selectedNodeId === d.key) {
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
                    .attr("r", CIRCLE_RADIUS)
            }

            if (dd.active === false) {
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

function configureLabels(data) {
    let d3 = this.d3;
    this.svg.
        selectAll(".label")
        .each(function(l){
            let dd = data.nodesData.filter(nd => nd.id === l.key)[0].d3;
            let d3el = d3.select(this);
            let el = this;

            d3el.text(function (d) {
                return dd.label;
            })
            
            d3el.attr('x',function(d){
                // let dd = data.nodesData[d.id].d3;
                return -(el.getBBox().width/2)-(CIRCLE_RADIUS/2);
            })
            
            d3el.attr('y',function(d){
                // let dd = data.nodesData[d.id].d3;
                return 20;
            })
        });
       
}

function updateLinks(data) {
    let selectedEdgeId = this.ui.selectedEdgeId;
    let d3 = this.d3;

    this.container.selectAll('line')
        .attr('stroke', function(d) {
            let p = d3.select(this.parentNode);
            let updatedParentGroupData = p.data()[0];
            if(updatedParentGroupData.stroke) return `url(#${updatedParentGroupData.stroke})`;
            return '#999';
        })
        .attr("class", "link")
        .attr('id', function (d) {
            return d.key;
        })
        .each(function (d) {
            let selected = d3.select(this);
            if (selectedEdgeId === d.key) {
                selected.classed('selected-edge', true);
            } else {
                selected.classed('selected-edge', false);
            }
        })
}

export { addContainer, updateLinks, renderNodes, addLinks, addNodes };
