import { Warehouse } from '../entities/warehouse.entity';

export class ListWarehousesDto {
  name: Warehouse['name'] | undefined;
  page: number | undefined;
  constructor(
    name: Warehouse['name'] | undefined,
    page: number | undefined,
  ) {
    this.name = name;
    this.page = page;
  }
}
