import {Vertex} from "./Vertex";

interface Path {
    path: string[];
    distance: number;
}


interface IDijkstra<T> {
    findShortestPath(vertex1: T, vertex2: T): Path;
    findAllShortestPaths(vertex: T): Record<string, Path>;
}

export class Dijkstra implements IDijkstra<Vertex> {
    graph;
    constructor(graph) {
        this.graph = graph;
    }

    private dijkstra(start: Vertex) {
        let distances = {};
        let visited = new Set();
        let path = {};

        let nodes = Object.keys(this.graph.list);
        for (let node of nodes) {
            distances[node] = Infinity;
            path[node] = [];
        }
        distances[start.key] = 0;

        while (nodes.length) {
            nodes.sort((a, b) => distances[a] - distances[b]);
            let closestNode = nodes.shift();
            if (distances[closestNode] === Infinity) {
                break;
            }
            visited.add(closestNode);
            const neighbors = this.graph.list[closestNode];
            for (let neighborKey in neighbors) {
                const { node, weight } = neighbors[neighborKey];
                if (!visited.has(node)) {
                    const newDistance = distances[closestNode] + weight;
                    if (newDistance < distances[node]) {
                        distances[node] = newDistance;
                        path[node] = path[closestNode].length
                            ? [...path[closestNode], node]
                            : [start.key, node]
                    }
                }
            }
        }
        return {
            path, distances
        }
    }
    findAllShortestPaths(vertex: Vertex): Record<string, Path> {
        const result = this.dijkstra(vertex);
        return Object.keys(this.graph.list).reduce((res, key) => {
            if (key !== vertex.key) {
                res[key] = { path: result.path[key], distance: result.distances[key]}
            }
            return res;
        }, {})
    }

    findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {
        const result = this.dijkstra(vertex1);
        return {
            path: result.path[vertex2.key],
            distance: result.distances[vertex2.key],
        }
    }
}

