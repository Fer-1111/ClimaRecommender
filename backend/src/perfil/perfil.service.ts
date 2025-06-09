import { Injectable } from '@nestjs/common';
import { PerfilUsuario } from './perfil.types';

@Injectable()
export class PerfilService {
  private perfil: PerfilUsuario | null = null;

  guardarPerfil(perfil: PerfilUsuario) {
    this.perfil = perfil;
    return { mensaje: 'Perfil guardado correctamente' };
  }

  obtenerPerfil(): PerfilUsuario | null {
    return this.perfil;
  }
}
