import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Part } from 'src/parts/entities/part.entity';
import { Repository } from 'typeorm';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { Piece } from './entities/piece.entity';
import { piecesStatus } from './types/piece.status.type';

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
    let res = await this.pieceRepository
      .query(`select technology,pieces.status,count(pieces.id) as value
    from pieces
    inner join parts on pieces.part_id=parts.id
    and (parts.cancelled = 0 and parts.on_hold = 0)
    where pieces.status != "Despatched"
    group by technology,pieces.status;`);

    res = res.map((obj) => {
      const resObj: piecesStatus = {};
      resObj[obj.technology] = obj.value;
      resObj['status'] = obj.status;
      res.forEach((arrElem, index) => {
        if (
          arrElem.technology !== obj.technology &&
          arrElem.status === obj.status
        ) {
          resObj[arrElem.technology] = arrElem.value;
          res.splice(index, 1);
        }
      });
      return resObj;
    });
    return res.filter((obj) => obj);
  }
  async estimate() {
    const res = await this.pieceRepository
      .query(`select technology,count(pieces.id) as value
    from pieces
    inner join parts on pieces.part_id=parts.id
    and (parts.cancelled = 0 and parts.on_hold = 0 and (parts.technology="SLS" or parts.technology="MJF"))
    where pieces.status = "New" and pieces.build_id IS NULL
    group by parts.technology;`);

    res.forEach((obj) => {
      obj.status = obj.technology;

      if (obj.status === 'SLS') {
        obj[obj.technology] = obj.value / 2500;
      }
      if (obj.status === 'MJF') {
        obj[obj.technology] = obj.value / 1500;
      }
      delete obj.technology;
      delete obj.value;
    });

    return res;
  }
}
