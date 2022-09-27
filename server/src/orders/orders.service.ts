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

  async createResponseObj(resArr, status) {
    const resObj = { status };
    resArr.forEach((obj) => {
      resObj[obj.technology] = obj.value;
      return obj;
    });
    console.log(resObj);

    return resObj;
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
    return this.createResponseObj(res, 'open');
  }

  private async dueOrders() {
    const date = new Date().toISOString().substring(0, 10);
    const res =
      await // .query(`select count(distinct(orders.id)) as value, parts.technology
      // from orders
      // inner join pieces on orders.id = pieces.order_id
      // and pieces.status != "Despatched"
      // inner join parts on orders.id =parts.order_id
      // and (parts.cancelled = 0 and parts.on_hold = 0)
      // where orders.order_deadline = "${date}"
      // group by parts.technology;`);

      this.orderRepository
        .query(`select count(distinct(orders.id)) as value, parts.technology
      from orders
      inner join pieces on orders.id = pieces.order_id
      and pieces.status != "Despatched" 
      inner join parts on orders.id =parts.order_id 
      and (parts.cancelled = 0 and parts.on_hold = 0)
      where orders.order_deadline = "2022-09-20"
      group by parts.technology;`);
    return this.createResponseObj(res, 'due');

    // 2022-09-20
  }

  async fullChart() {
    const res: any[] = [];
    res.push(await this.openOrders());
    res.push(await this.dueOrders());
    res.push(await this.lateOrders());
    res.push(await this.veryLate());
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
    where orders.order_deadline <"2022-08-26" and orders.order_deadline>="2022-08-24"
    group by parts.technology;`);
    return this.createResponseObj(res, 'late');
  }
  private async veryLate() {
    const today = new Date();
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
    );
    const datestr = date.toISOString().substring(0, 10);

    const res =
      await //   .query(`select count(distinct(orders.id)) as value, parts.technology
      // from orders
      // inner join pieces on orders.id = pieces.order_id
      // and pieces.status != "Despatched"
      // inner join parts on orders.id =parts.order_id
      // and (parts.cancelled = 0 and parts.on_hold = 0)
      // where orders.order_deadline <"${datestr}"
      // group by parts.technology;`);
      this.orderRepository
        .query(`select count(distinct(orders.id)) as value, parts.technology
    from orders
    inner join pieces on orders.id = pieces.order_id
    and pieces.status != "Despatched" 
    inner join parts on orders.id =parts.order_id 
    and (parts.cancelled = 0 and parts.on_hold = 0)
    where orders.order_deadline <"2022-09-23"
    group by parts.technology;`);
    return this.createResponseObj(res, 'very Late');
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

    const res =
      await //   .query(`select count(distinct(orders.id)) as value, parts.technology
      // from orders
      // inner join pieces on orders.id = pieces.order_id
      // and pieces.status != "Despatched"
      // inner join parts on orders.id =parts.order_id
      // and (parts.cancelled = 0 and parts.on_hold = 0)
      // where orders.order_deadline >"${plusWeekstr}" and orders.order_deadline<"${plus2Weekstr}"
      // group by parts.technology;`);
      this.orderRepository
        .query(`select count(distinct(orders.id)) as value, parts.technology,orders.order_deadline
    from orders
    inner join pieces on orders.id = pieces.order_id
    and pieces.status != "Despatched" 
    inner join parts on orders.id =parts.order_id 
    and (parts.cancelled = 0 and parts.on_hold = 0)
    where orders.order_deadline >"2022-09-19" and orders.order_deadline<"2022-09-26"
    group by parts.technology, orders.order_deadline;`);
    res.forEach((obj) => {
      obj.status = obj.order_deadline;
      obj[obj.technology] = obj.value;
      delete obj.order_deadline;
      delete obj.technology;
      delete obj.value;
    });
    return res;
  }
}
