import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'parts' })
export class Part {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  order_id: string;
  @Column()
  build_id: string;
  @Column()
  status: string;
  @Column()
  machine: string;
  @Column()
  material: string;
  @Column()
  technology: string;
  @Column()
  colour: string;
  @Column()
  infill: string;
  @Column()
  layer_thickness: number;
  @Column()
  height: string;
  @Column()
  width: string;
  @Column()
  depth: string;
  @Column()
  volume: string;
  @Column()
  surface_area: string;
  @Column()
  unit: string;
  @Column()
  orientation: string;
  @Column()
  custom_name: string;
  @Column()
  production_name: string;
  @Column()
  production_time: string;
  @Column()
  shipping_deadline: string;
  @Column()
  order_deadline: string;
  @Column()
  value: number;
  @Column()
  quantity: number;
  @Column()
  request_message: string;
  @Column()
  polishing: number;
  @Column()
  black_dye: number;
  @Column()
  thumbnail: string;
  @Column()
  colour_hex: string;
  @Column()
  on_hold: number;
  @Column()
  cancelled: number;
  @Column()
  file_key: string;
  @Column()
  extension: string;
  @Column()
  fdm_build_time: string;
  @Column()
  mass: string;
  @Column()
  bodies: string;
  @Column()
  check_fix: number;
  @Column()
  check_thin_walls: number;
  @Column()
  fix_message: string;
  @Column()
  inserts: number;
}
