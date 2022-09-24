import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pieces' })
export class Piece {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  created_at: string;
  @Column()
  build_id: number;
  @Column()
  order_id: string;
  @Column()
  part_id: string;
  @Column()
  status: string;
}
