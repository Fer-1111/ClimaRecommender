import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';//Importamos ConfigModule
import { ActivitiesModule } from './activities/activities.module';
import { WeatherModule } from './weather/weather.module';
import { PerfilModule } from './perfil/perfil.module';
import { AuthController } from './Login/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),//activamos lectura de .env
    ActivitiesModule,
    WeatherModule,
    PerfilModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
