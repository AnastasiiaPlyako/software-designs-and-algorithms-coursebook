import {Vertex} from "./Vertex";
import {Edge} from "./Edge";
import {Dijkstra} from "./Dijkstra";
import {WeightedGraph} from "./WeightedGraph";

const vertices = [
    new Vertex('1'),
    new Vertex('2'),
    new Vertex('3'),
    new Vertex('4'),
    new Vertex('5')
];
const edges = [
    new Edge(vertices[0], vertices[3], 3),
    new Edge(vertices[0], vertices[1], 5),
    new Edge(vertices[0], vertices[2], 4),
    new Edge(vertices[1], vertices[3], 6),
    new Edge(vertices[1], vertices[2], 5),
];

const graph: WeightedGraph = new WeightedGraph();
vertices.forEach(vertex => graph.addVertex(vertex));
edges.forEach(edge => graph.addEdge(edge.from, edge.to, edge.weight));

const dijkstra: Dijkstra = new Dijkstra(graph);
console.log(dijkstra.findAllShortestPaths(vertices[3]));
console.log(dijkstra.findShortestPath(vertices[3], vertices[2]));
