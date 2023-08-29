interface IWeightedGraph<T> {
  edges: IEdge[];
  vertices: IVertex[];
  addVertex(key: string): void;
  addEdge(vertex1: T, vertex2: T, weight: number): void;
}

interface IPath {
  path: string[];
  distance: number;
}

interface IDijkstra<T> {
  findShortestPath(vertex1: T, vertex2: T): IPath;
  findAllShortestPath(vertex: T): Record<string, IPath>;
}

interface IVertex {
  name: string;
}

interface IEdge {
  from: string;
  to: string;
  weight: number;
}
