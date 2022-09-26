import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { orderEnum } from './dto/orderType.enum';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
  @Get('deadline/:orders')
  async findOpen(@Param('orders') orderType: orderEnum) {
    return this.ordersService.getSpecifiedOrders(orderType);
  }
  @Get('orders/due')
  async ordersDue() {
    return this.ordersService.ordersDue();
  }
}
