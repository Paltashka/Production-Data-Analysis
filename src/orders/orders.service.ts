import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from 'src/parts/entities/part.entity';
import { Piece } from 'src/pieces/entities/piece.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { orderEnum } from './dto/orderType.enum';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Piece) private pieceRepository: Repository<Piece>,
    @InjectRepository(Part) private partRepository: Repository<Part>,
  ) {}

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOne(id: string) {
    return this.orderRepository.findOne({ where: { id } });
  }

  async getSpecifiedOrders(orderType: orderEnum) {
    if (orderType == 'open') {
      return this.openOrders();
    }
    if (orderType == 'due') {
      return this.dueOrders();
    }
    if (orderType == 'late') {
      return this.lateOrders();
    }
    if (orderType == 'veryLate') {
      return this.veryLate();
    }
  }

  private async openOrders() {
    const res = await this.orderRepository
      .query(`select count(distinct(orders.id)) as value, parts.technology
    from orders
    inner join pieces on orders.id = pieces.order_id
    and pieces.status != "Despatched"
    inner join parts on orders.id =parts.order_id
    and (parts.cancelled = 0 and parts.on_hold = 0)
    group by parts.technology;`);
    console.log(res);

    return res;
  }

  private async dueOrders() {
    const date = new Date().toISOString().substring(0, 10);
    const res = await this.orderRepository
      .query(`select count(distinct(orders.id)) as value, parts.technology
      from orders
      inner join pieces on orders.id = pieces.order_id
      and pieces.status != "Despatched" 
      inner join parts on orders.id =parts.order_id 
      and (parts.cancelled = 0 and parts.on_hold = 0)
      where orders.order_deadline = "${date}"
      group by parts.technology;`);
    return res;
  }

  private async lateOrders() {
    const today = new Date();
    const date = today.toISOString().substring(0, 10);
    const dateMin2 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
    );
    const dateMin2str = dateMin2.toISOString().substring(0, 10);
    const res = await this.orderRepository
      .query(`select count(distinct(orders.id)) as value, parts.technology
    from orders
    inner join pieces on orders.id = pieces.order_id
    and pieces.status != "Despatched" 
    inner join parts on orders.id =parts.order_id 
    and (parts.cancelled = 0 and parts.on_hold = 0)
    where orders.order_deadline <"${date}" and orders.order_deadline>="${dateMin2str}"
    group by parts.technology;`);
    return res;
  }
  private async veryLate() {
    const today = new Date();
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
    );
    const datestr = date.toISOString().substring(0, 10);

    const res = await this.orderRepository
      .query(`select count(distinct(orders.id)) as value, parts.technology
    from orders
    inner join pieces on orders.id = pieces.order_id
    and pieces.status != "Despatched" 
    inner join parts on orders.id =parts.order_id 
    and (parts.cancelled = 0 and parts.on_hold = 0)
    where orders.order_deadline <"${datestr}"
    group by parts.technology;`);
    return res;
  }

  async ordersDue() {
    const today = new Date(2022, 7, 7);
    const plusWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 8,
    );
    const plusWeekstr = plusWeek.toISOString().substring(0, 10);
    const plus2Week = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 15,
    );
    const plus2Weekstr = plus2Week.toISOString().substring(0, 10);

    const res = await this.orderRepository
      .query(`select count(distinct(orders.id)) as value, parts.technology
    from orders
    inner join pieces on orders.id = pieces.order_id
    and pieces.status != "Despatched" 
    inner join parts on orders.id =parts.order_id 
    and (parts.cancelled = 0 and parts.on_hold = 0)
    where orders.order_deadline >"${plusWeekstr}" and orders.order_deadline<"${plus2Weekstr}"
    group by parts.technology;`);
    return res;
  }
}
