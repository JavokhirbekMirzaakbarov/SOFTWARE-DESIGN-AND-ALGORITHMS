import { ShippingCompany, TypeOfPackage } from "./enum";

interface IWeightFee {
  getCost(weight: number, shippingCompany: string): number;
}

class LetterFee implements IWeightFee {
  getCost(weight: number, shippingCompany: string): number {
    switch (shippingCompany) {
      case ShippingCompany.AirEast:
      default:
        return weight * 0.39;
      case ShippingCompany.PacificParcel:
        return weight * 0.42;
      case ShippingCompany.ChicagoSprint:
        return weight * 0.51;
    }
  }
}

class PackageFee implements IWeightFee {
  getCost(weight: number, shippingCompany: string): number {
    switch (shippingCompany) {
      case ShippingCompany.AirEast:
      default:
        return weight * 0.25;
      case ShippingCompany.PacificParcel:
        return weight * 0.2;
      case ShippingCompany.ChicagoSprint:
        return weight * 0.19;
    }
  }
}

class OversizedFee implements IWeightFee {
  getCost(weight: number, shippingCompany: string): number {
    switch (shippingCompany) {
      case ShippingCompany.AirEast:
      default:
        return weight + 10;
      case ShippingCompany.PacificParcel:
        return weight;
      case ShippingCompany.ChicagoSprint:
        return weight * 0.02;
    }
  }
}

export class WeightFee {
  private static weightFee: WeightFee;
  company: string;
  weight: number;

  private constructor(weight: number, company: string) {
    this.weight = weight;
    this.company = company;
  }

  public static getInstance(weight: number, company: string): WeightFee {
    if (!WeightFee.weightFee)
      WeightFee.weightFee = new WeightFee(weight, company);
    return WeightFee.weightFee;
  }

  public getCost(): number {
    let weightFee: IWeightFee;

    if (this.weight <= 15) {
      weightFee = new LetterFee();
    } else if (this.weight <= 160) {
      weightFee = new PackageFee();
    } else {
      weightFee = new OversizedFee();
    }

    return weightFee.getCost(this.weight, this.company);
  }
}
