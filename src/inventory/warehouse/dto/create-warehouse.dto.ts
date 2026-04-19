import { Warehouse } from '../entities/warehouse.entity';

export class CreateWarehouseDto {
  name: Warehouse['name'];
  address: Warehouse['address'];
  description: Warehouse['description'];
  constructor(
    name: Warehouse['description'],
    address: Warehouse['address'],
    description: Warehouse['description'],
  ) {
    this.name = name;
    this.address = address;
    this.description = description;
  }
}
