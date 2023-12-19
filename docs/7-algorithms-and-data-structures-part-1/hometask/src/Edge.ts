import {Vertex} from "./Vertex";

export class Edge {
    weight;
    from;
    to;
    constructor(vertexFrom: Vertex, vertexTo: Vertex, weight: number) {
        this.weight = weight;
        this.from = vertexFrom;
        this.to = vertexTo;
    }
}
