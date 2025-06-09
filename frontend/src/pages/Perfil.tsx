import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

interface Actividad {
  nombre: string;
  rangoTemperatura: [number, number];
  vientoMaximo: number;
  permiteLluvia: boolean;
}

interface PerfilUsuario {
  nombre: string;
  correo: string;
  edad: number;
  actividadesPreferidas: string[];
}

function Perfil() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState<PerfilUsuario>({
    nombre: '',
    correo: '',
    edad: 0,
    actividadesPreferidas: [],
  });

  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/actividades')
      .then(res => res.json())
      .then(data => setActividades(data))
      .catch(() => console.error('Error al cargar actividades'));

    fetch('http://localhost:3000/perfil')
      .then(res => res.json())
      .then(data => {
        if (data && data.nombre) {
          setPerfil(data);
        }
      })
      .catch(() => {
        console.warn('No se pudo cargar el perfil desde el servidor');
      });
  }, []);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPerfil({ ...perfil, [name]: name === 'edad' ? Number(value) : value });
  };

  const manejarSeleccionActividad = (nombre: string) => {
    setPerfil(prev => {
      const yaSeleccionada = prev.actividadesPreferidas.includes(nombre);
      return {
        ...prev,
        actividadesPreferidas: yaSeleccionada
          ? prev.actividadesPreferidas.filter(act => act !== nombre)
          : [...prev.actividadesPreferidas, nombre],
      };
    });
  };

  const guardarPerfil = async () => {
    setGuardando(true);
    try {
      const res = await fetch('http://localhost:3000/perfil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perfil),
      });

      if (!res.ok) throw new Error('Error al guardar el perfil');

      navigate('/');
    } catch (err) {
      alert('No se pudo guardar el perfil en el servidor.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow perfil-card">
            <div className="card-body">
              <h2 className="mb-4 text-center titulo-app">👤 Perfil de Usuario</h2>
              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={perfil.nombre}
                    onChange={manejarCambio}
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    value={perfil.correo}
                    onChange={manejarCambio}
                    placeholder="ejemplo@email.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Edad</label>
                  <input
                    type="number"
                    name="edad"
                    className="form-control"
                    value={perfil.edad}
                    onChange={manejarCambio}
                    min={0}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Selecciona tus actividades preferidas:</label>
                  {actividades.length === 0 ? (
                    <div className="text-muted">Cargando actividades...</div>
                  ) : (
                    <div className="row">
                      {actividades.map((act, idx) => (
                        <div className="col-12 col-md-6 mb-2" key={idx}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`actividad-${idx}`}
                              checked={perfil.actividadesPreferidas.includes(act.nombre)}
                              onChange={() => manejarSeleccionActividad(act.nombre)}
                            />
                            <label className="form-check-label" htmlFor={`actividad-${idx}`}>
                              {act.nombre}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={guardarPerfil}
                    disabled={guardando}
                  >
                    {guardando ? 'Guardando...' : 'Guardar perfil'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;