import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

interface PerfilUsuario {
  nombre: string;
  correo: string;
  edad: number;
  actividadesPreferidas: string[];
}

export default function PerfilLoader() {
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/perfil')
      .then(res => res.json())
      .then(data => setPerfil(data))
      .catch(() => setPerfil(null))
      .finally(() => setCargando(false));
  }, []);

 if (cargando) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        color: '#333',
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 16 }}>😊</div>
      <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 8 }}>
        Cargando tu perfil...
      </div>
      <div style={{ fontSize: 14, color: '#888' }}>
        Por favor espera un momento.
      </div>
      <div
        style={{
          marginTop: 24,
          width: 40,
          height: 40,
          border: '4px solid #eee',
          borderTop: '4px solid #4a90e2',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}

  return <Sidebar perfil={perfil} />;
}