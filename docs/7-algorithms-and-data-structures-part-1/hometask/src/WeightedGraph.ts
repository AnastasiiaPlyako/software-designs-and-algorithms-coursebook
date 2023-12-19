import {Vertex} from "./Vertex";
interface IWeightedGraph<T> {
    addVertex(key: Vertex): void;
    addEdge(vertex1: T, vertex2: T, weight: number): void;
}

export class WeightedGraph implements IWeightedGraph<Vertex> {
    readonly list;
    constructor() {
        this.list = {};
    }
    addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void {
        this.list[vertex1.key].push({ node: vertex2.key, weight })
        this.list[vertex2.key].push({ node: vertex1.key, weight });
    }

    addVertex(vertex: Vertex): void {
        if (!this.list[vertex.key]) {
            this.list[vertex.key] = [];
        }
    }
}


