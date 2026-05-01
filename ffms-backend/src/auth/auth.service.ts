import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farmer } from 'src/farmers/entities/farmer.entity';
import { RegisterDto } from './dto/register.dtos';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Farmer)
    private farmersRepo: Repository<Farmer>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
  const exists = await this.farmersRepo.findOne({ where: { email: dto.email } });
  if (exists) throw new ConflictException('Email already registered.');

  const passwordHash = await bcrypt.hash(dto.password, 12);
  const farmer = this.farmersRepo.create({ ...dto, passwordHash });
  const saved  = await this.farmersRepo.save(farmer);

  const token = this.jwtService.sign({ sub: saved.farmerId, role: saved.role });
  return { token, user: this._sanitize(saved) };
}

async login(dto: LoginDto) {
  const farmer = await this.farmersRepo.findOne({ where: { email: dto.email, isActive: 1 } });
  if (!farmer) throw new UnauthorizedException('Invalid credentials.');

  const valid = await bcrypt.compare(dto.password, farmer.passwordHash);
  if (!valid) throw new UnauthorizedException('Invalid credentials.');

  const token = this.jwtService.sign({ sub: farmer.farmerId, role: farmer.role });
  return { token, user: this._sanitize(farmer) };
}

async me(farmerId: number) {
  const farmer = await this.farmersRepo.findOne({ where: { farmerId } });
  if (!farmer) throw new UnauthorizedException('User not found.');
  return this._sanitize(farmer);
}

// Strip passwordHash before returning to client
private _sanitize(farmer: Farmer) {
  const { passwordHash, ...safe } = farmer;
  return safe;
}

}