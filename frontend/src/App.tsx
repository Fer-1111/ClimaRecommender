import { useEffect, useState } from 'react';
import { FaCloudSun } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Login';
import { AuthProvider, useAuth } from "./AuthContext";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// Importa tus ciudades
// @ts-ignore
import clCiudades from './data/ciudades/cl.json';
// (y el resto igual que antes... omito por brevedad)

interface EstadoClima {
  temperatura: number;
  viento: number;
  precipitacion: number;
  descripcion?: string;
  icono?: string;
}

interface Actividad {
  nombre: string;
  rangoTemperatura: [number, number];
  vientoMaximo: number;
  permiteLluvia: boolean;
}

interface ResultadoEvaluacion {
  actividad: Actividad;
  recomendada: boolean;
  razon: string;
}

interface PerfilUsuario {
  nombre: string;
  correo: string;
  edad: number;
  actividadesPreferidas: string[];
}

const ciudadesPorPais: Record<string, string[]> = {
  CL: clCiudades as string[],
  // ... resto de países
};

function ClimaApp() {
  const [clima, setClima] = useState<EstadoClima>({
    temperatura: 18,
    viento: 10,
    precipitacion: 0,
  });
  const [pais, setPais] = useState<string>('CL');
  const [ciudad, setCiudad] = useState<string>('Santiago');
  const [ciudadConfirmada, setCiudadConfirmada] = useState<string>('Santiago');
  const [resultados, setResultados] = useState<ResultadoEvaluacion[] | null>(null);
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [cargando, setCargando] = useState(false);
  const [sugerenciasCiudades, setSugerenciasCiudades] = useState<string[]>([]);
  const [ciudadesDisponibles, setCiudadesDisponibles] = useState<string[]>([]);
  const [modoManual, setModoManual] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mostrarClimaReal, setMostrarClimaReal] = useState(false);

  const { logout } = useAuth();

  useEffect(() => {
    fetch('http://localhost:3000/perfil')
      .then(res => res.json())
      .then(data => {
        if (data?.nombre) setPerfil(data);
      })
      .catch(() => console.warn('No se pudo cargar el perfil del backend.'));
  }, []);

  useEffect(() => {
    setModoManual(false);
    if (ciudadesPorPais[pais]) {
      setCiudadesDisponibles(ciudadesPorPais[pais]);
      setCiudad(ciudadesPorPais[pais][0] || '');
    } else {
      setCiudadesDisponibles([]);
      setCiudad('');
    }
  }, [pais]);

  const verificarCiudad = async (ciudad: string, pais: string) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(ciudad)},${pais}&limit=1&appid=${apiKey}`
    );
    const data = await res.json();
    return data.length > 0;
  };

  const buscarCiudades = async (texto: string, pais: string) => {
    if (texto.length < 1) {
      setSugerenciasCiudades([]);
      return;
    }
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(texto)},${pais}&limit=5&appid=${apiKey}`
    );
    const data = await res.json();
    const nombres = Array.from(
      new Set(
        (data as Array<{ name?: string }>).
          map(c => c.name).
          filter((name): name is string => typeof name === 'string' && name.length > 0)
      )
    );
    setSugerenciasCiudades(nombres);
  };

  const handleObtenerClima = async () => {
    setError(null);
    setCargando(true);
    const existe = await verificarCiudad(ciudad, pais);
    if (!existe) {
      setError('La ciudad no existe en el país seleccionado.');
      setCargando(false);
      setMostrarClimaReal(false);
      return;
    }
    setCiudadConfirmada(ciudad);
    await obtenerClimaYEvaluar();
    setMostrarClimaReal(true);
  };

  const obtenerEvaluaciones = async (estado: EstadoClima) => {
    setCargando(true);
    setError(null);
    setResultados(null);
    try {
      const res = await fetch('http://localhost:3000/clima/evaluar-todas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clima: estado }),
      });

      if (!res.ok) throw new Error('Error al obtener actividades');
      const data: ResultadoEvaluacion[] = await res.json();
      setResultados(data);
    } catch {
      setError('No se pudo obtener la información. Verifica la conexión con el backend.');
    } finally {
      setCargando(false);
    }
  };

  const obtenerClimaYEvaluar = async () => {
    setCargando(true);
    setError(null);
    setResultados(null);
    try {
      const res = await fetch(`http://localhost:3000/clima/actual?ciudad=${encodeURIComponent(ciudad)}&pais=${encodeURIComponent(pais)}`);
      if (!res.ok) throw new Error('No se pudo obtener el clima');
      const climaReal: EstadoClima = await res.json();
      setClima(climaReal);
      await obtenerEvaluaciones(climaReal);
    } catch {
      setError('Error al obtener el clima real. Verifica la ciudad o el backend.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center titulo-app">🌤️ Recomendador de actividades por clima</h1>
      <div className="mb-4 text-end">
        <button className="btn btn-danger" onClick={logout}>Cerrar sesión</button>
      </div>
      {/* Aquí podrías continuar con la UI de clima, inputs, resultados, etc. */}
    </div>
  );
}

function MainApp() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h2>Bienvenido a la app del clima</h2>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Iniciar sesión
        </button>
      </div>
    );
  }

  return <ClimaApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
