import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('clima')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('evaluar-todas')
  evaluarTodas(@Body() body: any) {
    return this.weatherService.evaluarTodas(body.clima);
  }

  @Get('actual')
  async obtenerClima(
    @Query('ciudad') ciudad: string,
    @Query('pais') pais: string,
  ) {
    return this.weatherService.obtenerClimaPorCiudad(ciudad, pais);
  }
}
