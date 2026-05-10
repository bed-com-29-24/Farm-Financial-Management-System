import { Controller,Get,Delete,Param,Body,UseGuards,ParseIntPipe,Patch } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Get all farmers' })
  findAll() {
    return this.farmersService.findAll();
  }

  // GET ONE
  @Get(':id')
  @ApiOperation({ summary: 'Get a single farmer profile' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.farmersService.findOne(id);
  }

  // UPDATE PROFILE
  @Patch(':id')
  @ApiOperation({ summary: 'Update farmer profile' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFarmerDto) {
    return this.farmersService.update(id, dto as any);
  }

  // CHANGE PASSWORD
  @Patch(':id/change-password')
  @ApiOperation({ summary: 'Change farmer password' })
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { current_password: string; password: string },
  ) {
    return this.farmersService.changePassword(
      id,
      body.current_password,
      body.password,
    );
  }

  // SOFT DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete farmer' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.farmersService.remove(id);
  }
}
