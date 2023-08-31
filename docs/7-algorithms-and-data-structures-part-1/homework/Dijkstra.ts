type Costs = {
  [key: string]: number;
};

type ArrangedGraph = {
  [key: string]: Costs;
};

type Parents = {
  [key: string]: string;
};

export class Dijkstra implements IDijkstra<IVertex> {
  private graph: IWeightedGraph<IVertex>;

  constructor(graph: IWeightedGraph<IVertex>) {
    this.graph = graph;
  }

  public findShortestPath(start: IVertex, finish: IVertex): IPath {
    if (start.name === finish.name) {
      return {
        distance: 0,
        path: [start.name],
      };
    }

    const graph = this.buildGraph(start, finish);
    const costs = Object.assign({ [finish.name]: Infinity }, graph[start.name]);
    const parents = this.initializeParents(start, finish, graph);
    const processed: string[] = [];
    const optimalPath = [finish.name];
    let node = this.getLowestCostNode(costs, processed);

    while (node) {
      const children = graph[node];

      for (let c in children) {
        let newCost = costs[node] + children[c];

        if (!costs[c]) {
          costs[c] = newCost;
          parents[c] = node;
        }

        if (costs[c] > newCost) {
          costs[c] = newCost;
          parents[c] = node;
        }
      }

      processed.push(node);
      node = this.getLowestCostNode(costs, processed);
    }

    let parent = parents[finish.name];

    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }

    optimalPath.reverse();

    return {
      distance: costs[finish.name],
      path: Number.isFinite(costs[finish.name]) ? optimalPath : [],
    };
  }

  public findAllShortestPath(vertex: IVertex): Record<string, IPath> {
    return this.graph.vertices
      .filter((item) => item.name !== vertex.name)
      .reduce((acc, item) => {
        return { ...acc, [item.name]: this.findShortestPath(vertex, item) };
      }, {});
  }

  private buildGraph(start: IVertex, finish: IVertex): ArrangedGraph {
    const edges = this.getArrangedEdges(this.graph.edges, start);
    const graph = this.graph.vertices.reduce((acc, vertex) => {
      if (vertex.name === finish.name) {
        return { ...acc, [vertex.name]: {} };
      } else {
        return {
          ...acc,
          [vertex.name]: this.getNeighborEdges(edges, vertex.name),
        };
      }
    }, {});

    return graph;
  }

  private getNeighborEdges(edges: IEdge[], name: string): Costs {
    return edges.reduce((acc, edge) => {
      if (edge.from === name) {
        return { ...acc, [edge.to]: edge.weight };
      }

      return acc;
    }, {});
  }

  private getArrangedEdges(edges: IEdge[], vertex: IVertex): IEdge[] {
    return edges.map((edge) => {
      if (edge.to === vertex.name) {
        edge.to = edge.from;
        edge.from = vertex.name;
      }

      return edge;
    });
  }

  private getLowestCostNode(costs: Costs, processed: string[]): string {
    return Object.keys(costs).reduce((lowest, node) => {
      if (lowest === "" || costs[node] < costs[lowest]) {
        if (!processed.includes(node)) {
          lowest = node;
        }
      }
      return node;
    }, "");
  }

  private initializeParents(
    start: IVertex,
    finish: IVertex,
    graph: ArrangedGraph
  ): Parents {
    const parents = { [finish.name]: "" };

    for (let child in graph[start.name]) {
      parents[child] = start.name;
    }

    return parents;
  }
}
