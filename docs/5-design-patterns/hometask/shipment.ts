import { ShippingCompany } from "./enum";
import { Shipper } from "./shipper";
import { WeightFee } from "./weightFee";

export class Shipment {
  private static shipment: Shipment;
  private shipmentID: number;
  private weight: number;
  private fromAddress: string;
  private fromZipCode: string;
  private toAddress: string;
  private toZipCode: string;

  // new properties to mark Fragile, Do Not Leave, and Return Receipt Requested
  private isFragile: boolean;
  private isDoNotLeave: boolean;
  private isReturnReceiptRequested: boolean;

  private constructor(
    shipmentID: number,
    weight: number,
    fromAddress: string,
    fromZipCode: string,
    toAddress: string,
    toZipCode: string,
    isFragile: boolean,
    isDoNotLeave: boolean,
    isReturnReceiptRequested: boolean
  ) {
    this.shipmentID = shipmentID || this.getShipmentID();
    this.weight = weight;
    this.fromAddress = fromAddress;
    this.fromZipCode = fromZipCode;
    this.toAddress = toAddress;
    this.toZipCode = toZipCode;
    this.isFragile = isFragile;
    this.isDoNotLeave = isDoNotLeave;
    this.isReturnReceiptRequested = isReturnReceiptRequested;
  }

  public static getInstance(
    shipmentID: number,
    weight: number,
    fromAddress: string,
    fromZipCode: string,
    toAddress: string,
    toZipCode: string,
    isFragile: boolean,
    isDoNotLeave: boolean,
    isReturnReceiptRequested: boolean
  ) {
    if (!Shipment.shipment)
      Shipment.shipment = new Shipment(
        shipmentID,
        weight,
        fromAddress,
        fromZipCode,
        toAddress,
        toZipCode,
        isFragile,
        isDoNotLeave,
        isReturnReceiptRequested
      );
    return Shipment.shipment;
  }

  private getShipmentID(): number {
    let count = 0;
    return count++;
  }

  public shipCost(): string {
    const location = this.getTypeOfZipCode(this.fromZipCode);
    const shipper = Shipper.getInstance(location, this.weight);
    const weightFee = WeightFee.getInstance(this.weight, location);

    const cost = shipper.getCost() + weightFee.getCost();

    return `Shipment ID: ${this.shipmentID}, From: ${this.fromAddress}, ${
      this.fromZipCode
    }, To: ${this.toAddress}, ${this.toZipCode}, Cost: $${cost.toFixed(2)}`;
  }

  public ship(): string {
    let returnString: string = this.shipCost();
    if (this.isFragile) {
      returnString += "\n**FRAGILE**";
    }
    if (this.isDoNotLeave) {
      returnString += "\n**DO NOT LEAVE**";
    }
    if (this.isReturnReceiptRequested) {
      returnString += "\n**RETURN RECEIPT REQUESTED**";
    }
    return returnString;
  }

  public getTypeOfZipCode(fromZipCode): string {
    const firstDigit = parseInt(fromZipCode[0]);

    switch (firstDigit) {
      case 1:
      case 2:
      case 3:
      default:
        return ShippingCompany.AirEast;
      case 4:
      case 5:
      case 6:
        return ShippingCompany.ChicagoSprint;
      case 7:
      case 8:
      case 9:
        return ShippingCompany.PacificParcel;
    }
  }
}
