import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, sifra: string): Promise<any> {
    const korisnik = await this.authService.ValidirajKorisnika(email, sifra);
    if (!korisnik) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return korisnik;
  }
}
