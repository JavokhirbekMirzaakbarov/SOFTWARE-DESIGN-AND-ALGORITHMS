import { Shipment } from "./shipment";

class Client {
  public static main(): void {
    const shipment = Shipment.getInstance(
      0,
      10,
      "123 NY",
      "12345",
      "456 London",
      "67890",
      true,
      true,
      true
    );

    const result = shipment.ship();
    console.log(result);
  }
}
