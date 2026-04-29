import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FarmersService } from './farmers.service';
import { UpdateFarmerDto } from './dto/update.farmer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Farmers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  // GET ALL
  @Get()
  @ApiOperation({ summary: 'Get all farmers (admin only)' })
  findAll() {
    return this.farmersService.findAll();
  }

  // GET ONE
  @Get(':id')
  @ApiOperation({ summary: 'Get a single farmer profile' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.farmersService.findOne(id);
  }

  // UPDATE
  @Put(':id')
  @ApiOperation({ summary: 'Update farmer profile' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFarmerDto) {
    return this.farmersService.update(id, dto);
  }

  // SOFT DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete farmer (admin only)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.farmersService.remove(id);
  }
}
