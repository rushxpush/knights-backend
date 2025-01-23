import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { KnightsService } from './knights.service';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';

@Controller('knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @Post()
  create(@Body() createKnightDto: CreateKnightDto) {
    console.log(createKnightDto);
    return this.knightsService.create(createKnightDto);
  }

  @Get()
  findAll(@Query('filter') filter?: string) {
    if (filter === 'heroes') {
      return this.knightsService.findAllHeroes();
    }

    return this.knightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.knightsService.findOne(_id);
  }

  @Patch(':id')
  update(@Param('id') _id: string, @Body() updateKnightDto: UpdateKnightDto) {
    return this.knightsService.update(_id, updateKnightDto);
  }

  @Delete(':id')
  remove(@Param('id') _id: string) {
    return this.knightsService.remove(_id);
  }
}
