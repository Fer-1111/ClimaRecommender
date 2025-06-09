import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import App from "./App";
import Perfil from "./pages/Perfil";
import miFoto from "./images/logo192.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Define la interfaz del perfil
interface PerfilUsuario {
  nombre: string;
  correo: string;
  edad: number;
  actividadesPreferidas: string[];
}

interface SidebarProps {
  perfil: PerfilUsuario | null;
}

function SidebarHeader({ sidebarOpen }: { sidebarOpen: boolean }) {
  return (
    <div className="sidebar-header d-flex align-items-center mb-4">
      <img
        src={miFoto}
        alt="Logo"
        style={{
          width: sidebarOpen ? 40 : 32,
          height: sidebarOpen ? 40 : 32,
          transition: "width 0.3s, height 0.3s",
          marginRight: sidebarOpen ? 12 : 0,
        }}
      />
      {sidebarOpen && (
        <span className="fw-bold fs-5" style={{ letterSpacing: 1 }}>
          ProyectoClima
        </span>
      )}
    </div>
  );
}

function SidebarNav({ sidebarOpen }: { sidebarOpen: boolean }) {
  const location = useLocation();
  const navItems = [
    { to: "/", label: "Inicio", icon: "🏠" },
    { to: "/perfil", label: "Perfil", icon: "👤" },
  ];
  return (
    <ul className="nav flex-column gap-2">
      {navItems.map((item) => (
        <li className="nav-item" key={item.to}>
          <Link
            to={item.to}
            className={`nav-link d-flex align-items-center rounded-pill px-2 py-2 ${location.pathname === item.to
                ? "active bg-primary text-white shadow-sm"
                : "text-secondary"
              }`}
            style={{
              gap: sidebarOpen ? 12 : 0,
              fontWeight: 500,
              fontSize: sidebarOpen ? "1.05em" : "1.2em",
              transition: "all 0.2s",
              border: "none",
              background: location.pathname === item.to ? "rgba(59,130,246,0.15)" : "transparent",
              boxShadow: location.pathname === item.to ? "0 2px 8px rgba(59,130,246,0.07)" : "none",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.08)")}
            onMouseLeave={e => (e.currentTarget.style.background = location.pathname === item.to ? "rgba(59,130,246,0.15)" : "transparent")}
          >
            <span style={{ fontSize: "1.3em" }}>{item.icon}</span>
            {sidebarOpen && <span>{item.label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SidebarProfile({ perfil }: { perfil: PerfilUsuario }) {
  return (
    <div
      className="sidebar-profile border-top pt-3"
      style={{
        fontSize: "0.97em",
        maxHeight: "35vh",
        overflowY: "auto",
        color: "#444",
      }}
    >
      <div className="fw-bold">{perfil.nombre}</div>
      <div className="text-muted">{perfil.correo}</div>
      <div>Edad: {perfil.edad}</div>
      <div>
        <strong>Actividades:</strong>
        <ul className="mb-0 ps-3">
          {perfil.actividadesPreferidas.map((act, idx) => (
            <li key={idx}>{act}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Sidebar({ perfil }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div
        className="d-flex"
        style={{
          minHeight: "100vh",
          background: "var(--bs-body-bg)",
        }}
      >
        {/* Sidebar */}
        <aside
          className={`sidebar bg-white shadow-lg position-fixed h-100 p-3 d-flex flex-column justify-content-between transition-all`}
          style={{
            width: sidebarOpen ? 240 : 64,
            left: 0,
            top: 0,
            height: "100vh",
            zIndex: 1000,
            borderRight: "none",
            borderRadius: "24px 24px 24px 24px",
            transition: "width 0.3s, backdrop-filter 0.3s",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(16px) saturate(180%)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
          }}
        >
          <div>
            <SidebarHeader sidebarOpen={sidebarOpen} />
            <button
              className="btn btn-outline-primary w-100 mb-3 d-flex align-items-center justify-content-center"
              style={{
                fontSize: "1.4em",
                borderRadius: 20,
                transition: "background 0.2s, transform 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                background: "rgba(255,255,255,0.5)",
                border: "none",
              }}
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label={sidebarOpen ? "Cerrar menú lateral" : "Abrir menú lateral"}
            >
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.3s",
                  transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                {sidebarOpen ? "⇦" : "☰"}
              </span>
            </button>
            <SidebarNav sidebarOpen={sidebarOpen} />
          </div>
          {sidebarOpen && perfil && <SidebarProfile perfil={perfil} />}
        </aside>

        {/* Contenido principal */}
        <main
          className="flex-grow-1 p-4"
          style={{
            marginLeft: sidebarOpen ? 240 : 64,
            transition: "margin-left 0.3s",
            width: "100%",
            background: "var(--bs-body-bg)",
          }}
        >
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default Sidebar;