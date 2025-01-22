import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KnightsService } from './knights.service';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';

@Controller('knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @Post()
  create(@Body() createKnightDto: CreateKnightDto) {
    return this.knightsService.create(createKnightDto);
  }

  @Get()
  findAll() {
    return this.knightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.knightsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKnightDto: UpdateKnightDto) {
    return this.knightsService.update(+id, updateKnightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.knightsService.remove(+id);
  }
}
