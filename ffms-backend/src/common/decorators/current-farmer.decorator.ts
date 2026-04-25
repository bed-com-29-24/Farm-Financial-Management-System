import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentFarmer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;  // Populated by JwtStrategy.validate()
  },
);

// Usage in any controller:
//   @Get('profile')
//   getProfile(@CurrentFarmer() farmer: { farmerId: number; role: string }) {
//     return this.farmersService.findById(farmer.farmerId);
//   }
