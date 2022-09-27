import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Part } from 'src/parts/entities/part.entity';
import { Piece } from 'src/pieces/entities/piece.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Part, Piece])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
