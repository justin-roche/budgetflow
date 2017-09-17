
export class GraphService {

    graph;

    generateRandom(n) {

        let i;
        let s;
        let E = n;
        let graph = {
            nodes: [],
            edges: []
        };

        for (i = 0; i < n; i++)
            graph.nodes.push({
                id: 'n' + i,
                label: 'n'+i,
                x: Math.random(),
                y: Math.random(),
                size: Math.random(),
                color: 'gray'
            });

        for (i = 0; i < E; i++)
            graph.edges.push({
                id: 'e' + i,
                source: 'n' + (Math.random() * n | 0), //source by id
                target: 'n' + (Math.random() * n | 0),
                size: 50,
                color: 'black',
                type: 'arrow'
            });

        return graph;
    }

    getAdjacentNodes(n) {
        console.log('graph service graph', this.graph);
        let neighbors = this.graph.neighbors(n.id);
        let edges = this.graph.neighboringEdges(n.id);
        let outEdges = this.graph.outNeighboringEdges(n.id);
        console.log('neighbors', neighbors);
        console.log('out neighbors', outEdges);
        console.log('edges', edges);
        return {
            neighbors,
            edges,
            outEdges
        };
        
    }

    

}