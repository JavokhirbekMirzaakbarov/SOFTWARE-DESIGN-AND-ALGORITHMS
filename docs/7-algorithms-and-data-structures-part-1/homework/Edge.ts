export class Edge implements IEdge {
  public from: string;
  public to: string;
  public weight: number;

  constructor(from: IVertex, to: IVertex, weight: number) {
    this.from = from.name;
    this.to = to.name;
    this.weight = weight;
  }
}
