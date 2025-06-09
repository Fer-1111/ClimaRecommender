const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Cambia el puerto si tu frontend usa otro
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: "supersecreto", // Cambia esto por algo seguro en producción
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true solo si usas HTTPS
}));

const USUARIOS = [
  { username: "admin", password: "1234" },
  { username: "fer", password: "clima" }
];

// Endpoint de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const ok = USUARIOS.some(u => u.username === username && u.password === password);
  if (ok) {
    req.session.user = username;
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// Endpoint para saber si el usuario está logueado
app.get("/session", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ user: null });
  }
});

// Endpoint de logout
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.sendStatus(200);
  });
});

// Ejemplo de endpoint protegido
app.get("/perfil", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "No autorizado" });
  }
  // Devuelve datos de perfil de ejemplo
  res.json({
    nombre: "Fernando",
    correo: "fer@ejemplo.com",
    edad: 30,
    actividadesPreferidas: ["Correr", "Leer", "Nadar"]
  });
});

app.listen(3000, () => console.log("Backend corriendo en puerto 3000"));