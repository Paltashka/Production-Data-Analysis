import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePartDto } from './dto/create-part.dto';
import { Part } from './entities/part.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part) private partRepository: Repository<Part>,
  ) {}

  create(createPartDto: CreatePartDto): Promise<Part> {
    const part = this.partRepository.create(createPartDto);
    return this.partRepository.save(part);
  }

  findAll(): Promise<Part[]> {
    return this.partRepository.find();
  }

  findOne(id: string) {
    return this.partRepository.findOne({ where: { id } });
  }
  // async estimate() {
  //   const res = await this.partRepository
  //     .createQueryBuilder('parts')
  //     .select('sum(value)')
  //     .where('status= "New Part" and technology in ("SLS","MJF")')
  //     .groupBy('technology')
  //     .execute();
  //   const slsValue = res[0]['sum(value)'] / 2500;
  //   const mjfValue = res[1]['sum(value)'] / 1500;
  //   return {
  //     slsValue,
  //     mjfValue,
  //   };
  // }
}
