import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NalogModule } from './nalog/nalog.module';
import { AdministratorModule } from './administrator/administrator.module';
import { KorisnikModule } from './korisnik/korisnik.module';
import { AutomobilModule } from './automobil/automobil.module';
import { RezervacijaModule } from './rezervacija/rezervacija.module';
import { KalendarModule } from './kalendar/kalendar.module';
import { DanModule } from './dan/dan.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    NalogModule,
    AdministratorModule,
    KorisnikModule,
    AutomobilModule,
    RezervacijaModule,
    KalendarModule,
    DanModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
