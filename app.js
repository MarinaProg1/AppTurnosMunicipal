require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/database');
const cors = require('cors');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
const auditoria = require('./src/middlewares/auditoria.middleware');
const errorHandler = require('./src/middlewares/errorHandler.middleware');

// Rutas
const turnosRoutes = require('./src/routes/turnos.routes');
const pacientesRoutes = require('./src/routes/pacientes.routes');
const medicosRoutes = require('./src/routes/medicos.routes');
const especialidadesRoutes = require('./src/routes/especialidades.routes');
const obrasSocialesRoutes = require('./src/routes/obrasSociales.routes');
// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(auditoria);

// Rutas
app.use('/api/v1/turnos', turnosRoutes);
app.use('/api/v1/pacientes', pacientesRoutes);
app.use('/api/v1/medicos', medicosRoutes);
app.use('/api/v1/especialidades', especialidadesRoutes);
app.use('/api/v1/obras-sociales', obrasSocialesRoutes);
// Middleware de manejo de errores (siempre al final)
app.use(errorHandler);

// Puerto
const PORT = parseInt(process.env.PORT, 10) || 3000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log("===============================================");
    console.log("========= SERVIDOR MUNICIPAL ACTIVO ===========");
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log("===============================================");
});