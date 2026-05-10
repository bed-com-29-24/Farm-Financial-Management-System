import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farmer } from './entities/farmer.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer)
    private farmersRepo: Repository<Farmer>,
  ) {}

  // SANITIZE — remove passwordHash from response
  private sanitize(farmer: Farmer) {
    const { passwordHash, ...safe } = farmer;
    return safe;
  }

  // CREATE
  async create(data: Partial<Farmer>) {
    const farmer = this.farmersRepo.create(data);
    const saved = await this.farmersRepo.save(farmer);
    return this.sanitize(saved);
  }

  // GET ALL
  async findAll() {
    const farmers = await this.farmersRepo.find();
    return farmers.map((f) => this.sanitize(f));
  }

  // GET ONE
  async findOne(id: number) {
    const farmer = await this.farmersRepo.findOne({ where: { farmerId: id } });
    if (!farmer) throw new NotFoundException(`Farmer ${id} not found`);
    return this.sanitize(farmer);
  }

  async findById(id: number): Promise<Farmer> {
    const farmer = await this.farmersRepo.findOne({ where: { farmerId: id } });
    if (!farmer) throw new NotFoundException(`Farmer ${id} not found`);
    return farmer;
  }

  // UPDATE
  async update(id: number, data: Partial<Farmer>) {
    await this.farmersRepo.update(id, data);
    return this.findOne(id);
  }

  // CHANGE PASSWORD
  async changePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const farmer = await this.farmersRepo.findOne({ where: { farmerId: id } });
    if (!farmer) throw new NotFoundException(`Farmer ${id} not found`);

    const valid = await bcrypt.compare(currentPassword, farmer.passwordHash);
    if (!valid)
      throw new UnauthorizedException('Current password is incorrect');

    farmer.passwordHash = await bcrypt.hash(newPassword, 12);
    await this.farmersRepo.save(farmer);
    return { message: 'Password changed successfully' };
  }

  // SOFT DELETE
  async remove(id: number): Promise<{message: string}> {
    await this.findOne(id);
    await this.farmersRepo.delete(id);
    return {message: `User with ${id} successfully deleted`};
  }
}
