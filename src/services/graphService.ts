
export class GraphService {

    graph: any = {};

    generateRandom(n) {

        let i;
        let s;
        let E = n;
        this.graph = {
            nodes: [],
            edges: []
        };

        for (i = 0; i < n; i++)
            this.graph.nodes.push({
                id: 'n' + i,
                label: 'Node ' + i,
                x: Math.random(),
                y: Math.random(),
                size: Math.random(),
                color: '#666'
            });

        for (i = 0; i < E; i++)
            this.graph.edges.push({
                id: 'e' + i,
                source: 'n' + (Math.random() * n | 0), //source by id
                target: 'n' + (Math.random() * n | 0),
                size: 50,
                color: 'green',
                type: 'arrow'
            });

        return this.graph;
    }

    generateRandomNode() {
        return {

            id: 'n' + this.graph.nodes.length++,
            label: 'Node ',
            x: Math.random(),
            y: Math.random(),
            size: Math.random(),
            color: '#666'

        }
    }

}