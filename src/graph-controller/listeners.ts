function addZoomListener() {
    let self = this;
    let d3 = this.d3;

    let zoomHandler = d3.zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed);

    this.container.call(zoomHandler);

    function zoomed(e) {
        self.container.attr("transform", d3.event.transform)
    }
}

function addMouseOverListener() {
    let node = this.svg.selectAll('.node');
    let link = this.svg.selectAll('line');
    let self = this;
    node.on("mouseover", function (d) {
        self.d3.select(this)
            .attr('class', 'selected-node')
    })
        .on("mouseout", function (d) {
            self.d3.select(this)
                .attr('class', 'node')
        });
}

function addDragListener() {
    let d3 = this.d3;
    let self: any = this;
    let circles = this.svg.selectAll('.node');

    circles.on('mousedown.drag', null);

    circles.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    function dragstarted(d, a) {
        console.log(d, this.className);
        self.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        /* classing fails on svg, stroke does not update */
        d3.select(this).attr('style', "stroke-width: 5")
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        self.simulation.alphaTarget(1);
        d.fx = null;
        d.fy = null;
        d3.select(this).attr('style', "stroke-width: 2")    }
}

function addClickListener() {
    let d3 = this.d3;
    let nodes = this.container.selectAll('.node')
    let self = this;
    nodes.on('click', function (d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        let previous = self.ui.selectedNodeId;

        if (previous) {
            if (previous === d.id) {
                self.store.actions.ui.selectNode(null)
            }
            if (previous !== d.id) {
                self.store.actions.graph.addEdge(previous, d.id);
                self.store.actions.ui.selectNode(d.id)
            }
        }
        else {
            self.store.actions.ui.selectNode(d.id)
        }


    })

    let links = this.container.selectAll('.link')

    links.on('click', function (d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        let previous = self.ui.selectedEdgeId;
        if (previous === d.id) {
            self.store.actions.ui.selectEdge(null);
        } else {
            self.store.actions.ui.selectEdge(d.id);
        }
    })

}

function addDblClickListener() {
    let d3 = this.d3;
    let nodes = this.container.selectAll('.node')
    let self = this;
    nodes.on('dblclick', function (d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        let previous = self.ui.selectedNodeId;
        alert(previous)
        self.store.actions.ui.selectNode(d.id);
    })

}

function onBackgroundClick(e) {
    // this.simulation.stop();
    this.store.dispatch({ type: 'ADD_NODE', payload: { node: { x: e.offsetX, y: e.offsetY } } });
}

function addKeyListeners() {
    document.onkeydown = function (e) {
        console.log(e);
        if (e.key === 's') {
            this.paused = !this.paused;
            this.simulation.stop();
            this.refresh(this.graph)
            console.log('paused', this.paused)
        }
        // if(e.key === "Backspace") {
        //     if(this.ui.selectedNodeId) {
        //         this.store.dispatch({ type: 'DELETE_NODE', payload: { id: this.ui.selectedNodeId } });
        //         this.store.dispatch({ type: 'SELECT_NODE', payload: null });
        //     }
        // }
    }.bind(this)
}

export { addZoomListener, addMouseOverListener, addDragListener, addClickListener, addDblClickListener, onBackgroundClick, addKeyListeners }