import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [ConfigModule.forRoot(), InventoryModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
