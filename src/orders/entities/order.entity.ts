import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  client_id: string;
  @Column()
  created_at: string;
  @Column()
  page_link: string;
  @Column()
  folder: string;
  @Column()
  platform: string;
  @Column()
  po_number: string;
  @Column()
  vat: string;
  @Column()
  shipping_value: string;
  @Column()
  delivery_method: string;
  @Column()
  payment_method: string;
  @Column()
  value_excl_vat: string;
  @Column()
  value_incl_vat: string;
  @Column()
  paid: string;
  @Column()
  external_id: string;
  @Column()
  notes: string;
  @Column()
  shipping_deadline: string;
  @Column()
  original_shipping_deadline: string;
  @Column()
  order_deadline: string;
  @Column()
  original_order_deadline: string;
  @Column()
  created_at_day: string;
  @Column()
  label_print_date: string;
  @Column()
  delivery_id: string;
  @Column()
  tracking_id: string;
  @Column()
  tracking_url: string;
  @Column()
  MyUnknownColumn: string;
}
