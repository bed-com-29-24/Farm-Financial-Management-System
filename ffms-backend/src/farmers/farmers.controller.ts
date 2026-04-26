import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { FarmersService } from './farmers.service';

@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  // CREATE
  @Post()
  create(@Body() body) {
    return this.farmersService.create(body);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.farmersService.findAll();
  }

  // GET ONE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmersService.findOne(Number(id));
  }

  // UPDATE
  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.farmersService.update(Number(id), body);
  }

  // DELETE (SOFT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmersService.remove(Number(id));
  }
}
