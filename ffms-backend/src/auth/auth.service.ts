import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
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
    private readonly farmersRepo: Repository<Farmer>,
    private readonly jwtService: JwtService,
  ) {}

  
  async register(dto: RegisterDto) {
    const exists = await this.farmersRepo.findOne({
      where: { email: dto.email },
    });

    if (exists) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const farmer = this.farmersRepo.create({
      ...dto,
      passwordHash,
    });

    const saved = await this.farmersRepo.save(farmer);

    const token = this.jwtService.sign({
      sub: saved.farmerId,
      email: saved.email,
      role: saved.role,
    });

    return {
      token,
      user: this.sanitize(saved),
    };
  }

  async login(dto: LoginDto) {
    const farmer = await this.farmersRepo.findOne({
      where: { email: dto.email, isActive: 1 },
    });

    if (!farmer) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(
      dto.password,
      farmer.passwordHash,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: farmer.farmerId,
      email: farmer.email,
      role: farmer.role,
    });

    return {
      token,
      user: this.sanitize(farmer),
    };
  }

  async me(farmerId: number) {
    const farmer = await this.farmersRepo.findOne({
      where: { farmerId },
    });

    if (!farmer) {
      throw new UnauthorizedException('User not found');
    }

    return this.sanitize(farmer);
  }

  private sanitize(farmer: Farmer) {
    const { passwordHash, ...safe } = farmer;
    return safe;
  }
}