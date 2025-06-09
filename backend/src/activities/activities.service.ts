import { Injectable } from '@nestjs/common';

/* 
export type Actividad = {
  nombre: string;
  rangoTemperatura: [number, number];
  vientoMaximo: number;
  permiteLluvia: boolean;
};*/

export type Actividad = {
  nombre: string;
  rangoTemperatura: [number, number];
  vientoMaximo: number;
  permiteLluvia: boolean;
  imagen?: string; // opcional
};


@Injectable()
export class ActivitiesService {
  private actividades: Actividad[] = [
    { nombre: "Pasear al perro", rangoTemperatura: [5, 25], vientoMaximo: 20, permiteLluvia: false },
    { nombre: "Andar en bicicleta", rangoTemperatura: [15, 25], vientoMaximo: 15, permiteLluvia: false },
    { nombre: "Ir al skatepark", rangoTemperatura: [15, 28], vientoMaximo: 15, permiteLluvia: false },
    { nombre: "Salir a correr", rangoTemperatura: [15, 25], vientoMaximo: 15, permiteLluvia: false },
    { nombre: "Hacer picnic en el parque", rangoTemperatura: [18, 28], vientoMaximo: 12, permiteLluvia: false },
    { nombre: "Ir a la playa", rangoTemperatura: [22, 35], vientoMaximo: 18, permiteLluvia: false },
    { nombre: "Practicar senderismo", rangoTemperatura: [12, 25], vientoMaximo: 18, permiteLluvia: false },
    { nombre: "Hacer jardinería", rangoTemperatura: [12, 25], vientoMaximo: 15, permiteLluvia: true },
    { nombre: "Jugar fútbol o básquetbol en la plaza", rangoTemperatura: [15, 28], vientoMaximo: 15, permiteLluvia: false },
    { nombre: "Salir a sacar fotos", rangoTemperatura: [5, 28], vientoMaximo: 20, permiteLluvia: true },
    { nombre: "Ir a un parque de diversiones", rangoTemperatura: [18, 30], vientoMaximo: 18, permiteLluvia: false },
    { nombre: "Salir a patinar", rangoTemperatura: [15, 25], vientoMaximo: 15, permiteLluvia: false },
    { nombre: "Lavar el auto", rangoTemperatura: [18, 28], vientoMaximo: 12, permiteLluvia: false },
    { nombre: "Volar drones", rangoTemperatura: [15, 25], vientoMaximo: 20, permiteLluvia: false },
    { nombre: "Hacer una parrillada", rangoTemperatura: [18, 30], vientoMaximo: 15, permiteLluvia: false },
    { nombre: "Visitar un mercado al aire libre", rangoTemperatura: [15, 28], vientoMaximo: 15, permiteLluvia: false },
    { nombre: "Salir en moto", rangoTemperatura: [15, 28], vientoMaximo: 20, permiteLluvia: false },
  
    { nombre: "Ver una película en casa", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Cocinar algo caliente", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Leer un libro", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Escuchar música o podcast", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Jugar videojuegos", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Reorganizar la casa", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Pintar o hacer manualidades", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Ejercicio en casa", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Armar un rompecabezas", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Maratón de series", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Estudiar o tomar cursos online", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Escribir en diario o blog", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Videollamadas con amigos", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Tejer o coser", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Hacer meditación o mindfulness", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Probar nuevas recetas", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Ir al cine", rangoTemperatura: [0, 40], vientoMaximo: 50, permiteLluvia: true },
  
    { nombre: "Visitar un museo o galería de arte", rangoTemperatura: [0, 30], vientoMaximo: 50, permiteLluvia: true },
    { nombre: "Ir al centro comercial", rangoTemperatura: [0, 30], vientoMaximo: 50, permiteLluvia: true },
    { nombre: "Hacer trámites", rangoTemperatura: [0, 25], vientoMaximo: 50, permiteLluvia: true },
    { nombre: "Tomar café en una cafetería", rangoTemperatura: [0, 25], vientoMaximo: 50, permiteLluvia: true },
    { nombre: "Ir a la biblioteca", rangoTemperatura: [0, 30], vientoMaximo: 50, permiteLluvia: true },
    { nombre: "Deportes bajo techo", rangoTemperatura: [0, 30], vientoMaximo: 50, permiteLluvia: true },
    { nombre: "Asistir a talleres o clases", rangoTemperatura: [0, 30], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Visitar familiares o amigos", rangoTemperatura: [0, 30], vientoMaximo: 88, permiteLluvia: true },
  
    { nombre: "Hacer snowboard o esquiar", rangoTemperatura: [-10, 5], vientoMaximo: 20, permiteLluvia: true },
    { nombre: "Jugar con la nieve", rangoTemperatura: [-10, 5], vientoMaximo: 20, permiteLluvia: true },
    { nombre: "Hacer chocolate caliente", rangoTemperatura: [-5, 10], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Ir a una cabaña o refugio", rangoTemperatura: [-5, 10], vientoMaximo: 25, permiteLluvia: true },
    { nombre: "Hacer fogata", rangoTemperatura: [0, 15], vientoMaximo: 15, permiteLluvia: false },
    { nombre: "Fotografía invernal", rangoTemperatura: [-10, 5], vientoMaximo: 20, permiteLluvia: true },
    { nombre: "Ir a un centro de ski", rangoTemperatura: [-10, 5], vientoMaximo: 20, permiteLluvia: true },
    { nombre: "Patinar sobre hielo", rangoTemperatura: [-10, 5], vientoMaximo: 20, permiteLluvia: true },
    { nombre: "Usar sauna o jacuzzi", rangoTemperatura: [5, 30], vientoMaximo: 88, permiteLluvia: true },
  
    { nombre: "Volar cometas", rangoTemperatura: [15, 25], vientoMaximo: 40, permiteLluvia: false },
    { nombre: "Hacer windsurf", rangoTemperatura: [22, 32], vientoMaximo: 40, permiteLluvia: false },
    { nombre: "Ver las olas en la costa", rangoTemperatura: [10, 30], vientoMaximo: 35, permiteLluvia: false },
    { nombre: "Caminar por lugares abiertos", rangoTemperatura: [10, 25], vientoMaximo: 20, permiteLluvia: false },
    { nombre: "Tomar fotos de paisajes", rangoTemperatura: [5, 25], vientoMaximo: 20, permiteLluvia: false },
    { nombre: "Limpiar hojas del patio", rangoTemperatura: [10, 22], vientoMaximo: 15, permiteLluvia: false },
    { nombre: "Planificar la semana en casa", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
    { nombre: "Visitar librerías o cafés", rangoTemperatura: [0, 40], vientoMaximo: 88, permiteLluvia: true },
  ];

  

  crear(actividad: Actividad) {
    this.actividades.push(actividad);
    return {
      mensaje: 'Actividad registrada correctamente',
      actividad,
    };
  }

  obtenerTodas() {
    return this.actividades;
  }
}
