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
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @MessagePattern('create_knight')
  create(@Payload('createKnightDto') createKnightDto: CreateKnightDto) {
    return this.knightsService.create(createKnightDto);
  }

  @MessagePattern('get_knights')
  findAll(@Payload('filter') filter?: string) {
    console.log('filter: ', filter === 'heroes');
    console.log('get knights');
    if (filter === 'heroes') {
      return this.knightsService.findAllHeroes();
    }

    return this.knightsService.findAll();
  }

  @MessagePattern('get_knight_by_id')
  findOne(@Payload('_id') _id: string) {
    return this.knightsService.findOne(_id);
  }

  @MessagePattern('update_knight_by_id')
  update(
    @Payload('payload')
    payload: {
      _id: string;
      updateKnightDto: UpdateKnightDto;
    },
  ) {
    console.log('payload: ', payload);
    return this.knightsService.update(payload._id, payload.updateKnightDto);
  }

  @MessagePattern('remove_knight')
  remove(@Payload('_id') _id: string) {
    return this.knightsService.remove(_id);
  }
}
