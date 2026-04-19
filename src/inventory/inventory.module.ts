import { Module } from '@nestjs/common';
import { WarehouseModule } from './warehouse/warehouse.module';
import { SuppliesModule } from './supplies/supplies.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [WarehouseModule, SuppliesModule, StockModule],
})
export class InventoryModule {}
