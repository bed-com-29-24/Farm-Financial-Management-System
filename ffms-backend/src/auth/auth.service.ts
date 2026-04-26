import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// ✅ Define user type
type User = {
  id: number;
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  private users: User[] = []; // ✅ FIXED

  constructor(private jwtService: JwtService) {}

  // ✅ REGISTER
  async register(user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser: User = {
      id: Date.now(),
      email: user.email,
      password: hashedPassword,
    };

    this.users.push(newUser);

    return {
      message: 'User registered successfully',
    };
  }

  // ✅ LOGIN
  async login(user: any) {
    const foundUser = this.users.find(u => u.email === user.email);

    if (!foundUser) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(user.password, foundUser.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      email: foundUser.email,
      sub: foundUser.id,
    };

    return {
        message: 'Login successful',
      access_token: this.jwtService.sign(payload),
    };
  }
}