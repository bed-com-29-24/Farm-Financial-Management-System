

import { Controller, Get, Put, Param, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentFarmer } from '../common/decorators/current-farmer.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  getAll(@CurrentFarmer() farmer: any) {
    console.log(farmer)
    return this.service.findAll(farmer.farmerId);
  }

  @Put(':id')
  markAsRead(@Param('id') id: number, @CurrentFarmer() farmer: any) {
    return this.service.markAsRead(id, farmer.farmerId);
  }
  
}