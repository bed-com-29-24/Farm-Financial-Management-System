import { Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';

@Injectable()

export class FarmersService {
  create(createFarmerDto: CreateFarmerDto) {}
}
