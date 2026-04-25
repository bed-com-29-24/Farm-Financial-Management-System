import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Allow requests to pass through when JWT auth is not configured yet.
    // If a real JWT strategy is configured, this will use passport's JWT flow.
    return super.canActivate(context) as boolean;
  }
}
