import { Controller, Get, Post, Body } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { PerfilUsuario } from './perfil.types';

@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Post()
  guardar(@Body() body: PerfilUsuario) {
    return this.perfilService.guardarPerfil(body);
  }

  @Get()
  obtener(): PerfilUsuario | null {
    return this.perfilService.obtenerPerfil();
  }
}
