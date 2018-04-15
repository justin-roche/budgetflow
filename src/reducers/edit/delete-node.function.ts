import { _ } from 'underscore';

function deleteNode(_g, nd) {
    let g = JSON.parse(JSON.stringify(_g));

    removeEdges(g, nd);
    removeNode(g, nd);
    reindexNodes(g);
    reindexEdges(g);

    console.log('reindexed nodes', g.nodesData, g.edgesData)
    return g;
}

function removeEdges(g, nd) {
    let nodeIndex = _.findIndex(g.nodesData, d => d.id === nd.id);
    g.edgesData = g.edgesData.map((arr, i) => {
        if (arr && (i !== nodeIndex)) {
            return arr.map((targetEdge, ii) => {
                if (ii !== nodeIndex) return targetEdge;
                return null;
            })
        }
        return null;
    });
}

function removeNode(g, nd) {
    let [retainedNodesData, exludedNodesData] = _.partition(g.nodesData, _nd => _nd.id !== nd.id);
    g.nodesData = retainedNodesData;
}

function reindexNodes(g) {
    g.nodesData.forEach((nd, i) => {
        nd.index = i;
    });
}

function reindexEdges(g) {

    let newEdgesData = [];
    let edges = _.flatten(g.edgesData).filter(ed => ed !== null);

    g.nodesData.forEach((nd, sourceIndex) => {
        newEdgesData[sourceIndex] = [];
        let sourceEdges = edges.filter(ed => {
            return ed.d3.source === nd.id;
        });
        sourceEdges.forEach(ed => {
            let targetIndex = _.findIndex(g.nodesData, nd => nd.id === ed.d3.target);
            newEdgesData[sourceIndex][targetIndex] = ed;
        })
    })
    g.edgesData = newEdgesData;
}

export { deleteNode }