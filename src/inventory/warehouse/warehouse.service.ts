import { Injectable } from '@nestjs/common';
import { ListWarehousesDto } from './dto/list-warehouses.dto';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class WarehouseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.warehouseCreateInput) {
    return this.prisma.warehouse.create({ data });
  }

  async findAll(listWarehouseDto: ListWarehousesDto) {
    return this.prisma.warehouse.findMany({});
  }
}
