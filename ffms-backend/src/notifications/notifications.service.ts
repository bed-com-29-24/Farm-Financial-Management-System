import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Farmer } from 'src/farmers/entities/farmer.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  //  CREATE
  async create(farmerId: number, dto: CreateNotificationDto) {
    const farmer = new Farmer();
    farmer.farmerId = farmerId;

    const notification = this.notificationRepo.create({
      ...dto,
      isRead: 0,
      farmer: farmer, 
    });

    return this.notificationRepo.save(notification);
  }

  //  GET ALL
  async findAll(farmerId: number) {
    return this.notificationRepo.find({
      where: { farmer: { farmerId } },
      order: { createdAt: 'DESC' },
    });
  }

  //  MARK AS READ
  async markAsRead(notificationId: number, farmerId: number) {
    const notification = await this.notificationRepo.findOne({
      where: {
        notificationId,
        farmer: { farmerId },
      },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.isRead = 1;
    return this.notificationRepo.save(notification);
  }
}