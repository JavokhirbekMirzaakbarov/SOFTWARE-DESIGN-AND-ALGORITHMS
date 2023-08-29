import { Edge } from "./Edge";
import { Vertex } from "./Vertex";

export class WeightedGraph implements IWeightedGraph<IVertex> {
  public vertices: IVertex[];
  public edges: IEdge[];

  constructor() {
    this.vertices = [];
    this.edges = [];
  }

  addVertex(key: string): void {
    this.vertices.push(new Vertex(key));
  }

  addEdge(from: IVertex, to: IVertex, weight: number): void {
    this.edges.push(new Edge(from, to, weight));
  }
}
