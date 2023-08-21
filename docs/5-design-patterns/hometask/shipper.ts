import { ShippingCompany, TypeOfPackage } from "./enum";

interface IShipper {
  rate: number;
  getCost(wieght: number): number;
}

class AirEastShipper implements IShipper {
  rate: number = 0.39;
  getCost(wieght: number): number {
    return wieght * this.rate;
  }
}

class ChicagoSprintShipper implements IShipper {
  rate: number = 0.42;
  getCost(wieght: number): number {
    return wieght * this.rate;
  }
}

class PacificParcelShipper implements IShipper {
  rate: number = 0.51;
  getCost(weight: number) {
    return weight * this.rate;
  }
}

export class Shipper {
  private static shipper: Shipper;
  location: string;
  weight: number;

  private constructor(location: string, weight: number) {
    this.location = location;
    this.weight = weight;
  }

  public static getInstance(location: string, weight: number): Shipper {
    if (!Shipper.shipper) Shipper.shipper = new Shipper(location, weight);
    return Shipper.shipper;
  }

  public getCost(): number {
    let shipper: IShipper;

    switch (this.location) {
      case ShippingCompany.AirEast:
      default:
        shipper = new AirEastShipper();
      case ShippingCompany.ChicagoSprint:
        shipper = new ChicagoSprintShipper();
      case ShippingCompany.PacificParcel:
        shipper = new PacificParcelShipper();
    }

    return shipper.getCost(this.weight);
  }
}
