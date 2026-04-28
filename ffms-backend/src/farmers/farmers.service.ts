import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farmer } from './entities/farmer.entity';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer)
    private farmersRepo: Repository<Farmer>,
  ) {}

  // CREATE
  create(data: Partial<Farmer>) {
    const farmer = this.farmersRepo.create(data);
    return this.farmersRepo.save(farmer);
  }

  // GET ALL
  findAll() {
    return this.farmersRepo.find();
  }

  // GET ONE
  findOne(id: number) {
    return this.farmersRepo.findOne({
      where: { farmerId: id },
    });
  }

  async findById(id: number): Promise<Farmer> {
    const farmer = await this.findOne(id);
    if (!farmer) throw new NotFoundException(`Farmer ${id} not found`);
    return farmer;
  }

  // UPDATE
  async update(id: number, data: Partial<Farmer>) {
    await this.farmersRepo.update(id, data);
    return this.findOne(id);
  }

  // SOFT DELETE
  async remove(id: number) {
    return this.farmersRepo.update(id, { isActive: 0 });
  }
}
