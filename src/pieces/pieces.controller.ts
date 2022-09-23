import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PiecesService } from './pieces.service';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.piecesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePieceDto: UpdatePieceDto) {
    return this.piecesService.update(+id, updatePieceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.piecesService.remove(+id);
  }
}
