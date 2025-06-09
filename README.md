# Proyecto Clima

Este proyecto es una aplicación fullstack que recomienda actividades basadas en condiciones climáticas simuladas.  
Contiene un **backend** en **NestJS** y un **frontend** en **React + Vite**.

---

## Tecnologías utilizadas

- **Frontend**: React + Vite (TypeScript)
- **Backend**: NestJS (TypeScript)
- **Gestor de paquetes**: PNPM
- **Control de versiones**: Git + GitHub

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado en tu equipo:

- **Node.js**: versión 20.x o superior
- **PNPM**: versión 8.x o superior
- **Git**: última versión estable

### Node.js (versión 20.x o superior)
Descargar e instalar desde la página oficial:

[https://nodejs.org/en](https://nodejs.org/en)

Durante la instalación, Node.js instalará automáticamente `npm` (el gestor de paquetes).

### PNPM (versión 8.x o superior)
Una vez tengas Node.js y npm instalados, instala PNPM ejecutando en la terminal:
```bash
npm install -g pnpm
```
Esto instalará PNPM de forma global en tu sistema.

Verifica la instalación:
```bash
pnpm -v
```
(Debería mostrarte una versión igual o superior a 8.)

### Git (última versión estable)
Descargar e instalar desde:

https://git-scm.com/downloads

Después de instalar Git, podrás clonar repositorios y trabajar con control de versiones fácilmente.

Verifica la instalación:
```bash
git --version
```
(Debería mostrarte la versión instalada.)

## Primeros pasos

### Clonar el repositorio

```bash
git clone https://github.com/mathiu1305/ProyectoClima.git
cd ProyectoClima
```
### Instalar todas las dependencias
```bash
pnpm install
```

## Cómo correr el proyecto

### Levantar el Backend (NestJS) y Frontend (React + Vite)
Desde la carpeta raíz:
```bash
pnpm dev
```
(Bakend)Servidor corriendo en:
http://localhost:3000

(Frontend)Aplicación visible en:
http://localhost:5173


## Estructura del proyecto

```
ProyectoClima/
├── backend/
│   └── package.json
├── frontend/
│   └── package.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

## Comandos útiles

### Instalación general

Instalar todas las dependencias (backend + frontend):

```bash
pnpm install
```
### Desarrollo
Levantar solo el frontend:

```bash
cd frontend
pnpm dev
```

Levantar solo el backend:

```bash
cd backend
pnpm start:dev
```
