export class Warehouse {
  id: string;
  name: string;
  description: string;
  address: string;

  /**
   *
   */
  constructor(
    id: Warehouse['id'],
    name: Warehouse['name'],
    description: Warehouse['name'],
    address: Warehouse['address'],
  ) {
    this.id = id;
    this.address = address;
    this.name = name;
    this.description = description;
  }
}
