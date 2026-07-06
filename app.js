
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const turnosRoutes = require('./src/routes/turnos.routes');

const PORT = parseInt(process.env.PORT, 10) || 3000


app.use(cors());
app.use(express.json());



app.use('/api/v1/turnos', turnosRoutes);

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
});