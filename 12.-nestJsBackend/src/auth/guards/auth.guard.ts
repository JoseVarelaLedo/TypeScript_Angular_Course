import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (
      private readonly JwtService: JwtService, 
      private readonly authService: AuthService  
    ) {}

  async canActivate( context: ExecutionContext ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader ( request );

    if (!token) throw new UnauthorizedException('No bearer token available in request');

    try {
      const payload = await this.JwtService.verifyAsync<JwtPayload> (
        token, { secret: process.env.JWT_SEED }
      );

      const user = await this.authService.findUserById (payload.id);
      if (!user) throw new UnauthorizedException ('User does not exists'); //payload.id equivale a la id del usuario
      if (!user.isActive) throw new UnauthorizedException ('User is not active');
     
      request ['user'] = user; 
    } catch (error) {
      throw new UnauthorizedException ('Token not validated');
    }

    return Promise.resolve(true);
  }

  private extractTokenFromHeader ( request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split (' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
