import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Part } from 'src/parts/entities/part.entity';
import { Repository } from 'typeorm';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { Piece } from './entities/piece.entity';

@Injectable()
export class PiecesService {
  constructor(
    @InjectRepository(Piece) private pieceRepository: Repository<Piece>,
  ) {}
  create(createPieceDto: CreatePieceDto): Promise<Piece> {
    const piece = this.pieceRepository.create(createPieceDto);
    return this.pieceRepository.save(piece);
  }

  findAll(): Promise<Piece[]> {
    return this.pieceRepository.find();
  }

  findOne(id: string) {
    return this.pieceRepository.findOne({ where: { id } });
  }
  async piecesByStatus() {
    const res = await this.pieceRepository
      .createQueryBuilder('pieces')
      .select('pieces.status', 'status')
      .addSelect('count(pieces.status)', 'value')
      .innerJoin(Part, 'parts', 'pieces.part_id=parts.id')
      .where('parts.on_hold=0 and parts.cancelled=0 ')
      .andWhere('pieces.status != "Despatched"')
      .groupBy('pieces.status')
      .execute();
    console.log(res);

    return res;
  }
}
