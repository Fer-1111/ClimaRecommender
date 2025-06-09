import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import Perfil from './pages/Perfil';

const navBarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  background: '#1565c0',
  padding: '1rem 0',
  borderRadius: '0 0 12px 12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  marginBottom: '2rem'
};

const navButtonStyle: React.CSSProperties = {
  background: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '0.6rem 1.5rem',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.05rem',
  transition: 'background 0.2s, transform 0.2s',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
};

function Root() {
  return (
    <Router>
      <nav style={navBarStyle}>
        <Link
          to="/"
          style={navButtonStyle}
          onMouseOver={e => (e.currentTarget.style.background = '#0d47a1')}
          onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
        >
          Inicio
        </Link>
        <Link
          to="/perfil"
          style={navButtonStyle}
          onMouseOver={e => (e.currentTarget.style.background = '#0d47a1')}
          onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
        >
          Perfil
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default Root;