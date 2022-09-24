import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PiecesService } from './pieces.service';
import { CreatePieceDto } from './dto/create-piece.dto';

@Controller('pieces')
export class PiecesController {
  constructor(private readonly piecesService: PiecesService) {}

  @Post()
  create(@Body() createPieceDto: CreatePieceDto) {
    return this.piecesService.create(createPieceDto);
  }

  @Get()
  findAll() {
    return this.piecesService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.piecesService.findOne(id);
  }
  @Get('piecesByStatus')
  async piecesByStatus() {
    return this.piecesService.piecesByStatus();
  }
}
