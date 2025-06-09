import { Injectable, HttpException } from '@nestjs/common';
import { ActivitiesService } from '../activities/activities.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

interface WeatherApiResponse {
  main: {
    temp: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    '1h'?: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

@Injectable()
export class WeatherService {
  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly configService: ConfigService,
  ) {}

  evaluarTodas(estadoClima: any) {
    const actividades = this.activitiesService.obtenerTodas();

    return actividades.map((actividad) => {
      const [minTemp, maxTemp] = actividad.rangoTemperatura;
      const { temperatura, viento, precipitacion } = estadoClima;

      const razones: string[] = [];

      if (temperatura < minTemp) {
        razones.push('❄️🥶Temperatura fuera de rango ');
      }

      if (temperatura > maxTemp) {
        razones.push('🔥🥵Temperatura fuera de rango');
      }

      if (viento > actividad.vientoMaximo) {
        razones.push('🌪️Viento excede el máximo permitido');
      }

      if (!actividad.permiteLluvia && precipitacion > 0) {
        razones.push('🌧️🚫Esta actividad no permite lluvia');
      }

      return {
  actividad,
  recomendada: razones.length === 0,
  razon:
    razones.length === 0
      ? 'Condiciones ideales.'
      : razones.map(r => r.match(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F\u200D]+/gu)?.[0] || '').join(' ').trim(),
};
    });
  }

  async obtenerClimaPorCiudad(ciudad: string, pais: string) {
    const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      ciudad + ',' + pais,
    )}&units=metric&lang=es&appid=${apiKey}`;
  
    try {
      const response = await axios.get<WeatherApiResponse>(url);
      const data = response.data;
  
      return {
      temperatura: data.main.temp,
      viento: data.wind.speed,
      precipitacion: data.rain?.['1h'] || 0,
      descripcion: data.weather?.[0]?.description || '',
      icono: data.weather?.[0]?.icon || '',
    };

    } catch (error) {
      throw new HttpException('Error al obtener datos del clima', 500);
    }
  }
}  
