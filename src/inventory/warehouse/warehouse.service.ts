import { Injectable } from '@nestjs/common';
import { Warehouse } from './entities/warehouse.entity';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { randomUUID } from 'node:crypto';
import { ListWarehousesDto } from './dto/list-warehouses.dto';

@Injectable()
export class WarehouseService {
  private readonly warehouses: Warehouse[] = [];

  create(warehouse: CreateWarehouseDto): void {
    const uuid = randomUUID();
    this.warehouses.push({
      id: uuid,
      ...warehouse,
    });
  }

  findAll(listWarehouseDto:ListWarehousesDto): Warehouse[] {
    return this.warehouses;
  }
}
