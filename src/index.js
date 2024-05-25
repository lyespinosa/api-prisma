import express from 'express';
import citasRoutes from './routes/cita.routes.js';
import encuestaRoutes from './routes/encuesta.routes.js'

const app = express();

app.use(express.json());

app.use('/cita', citasRoutes);
app.use('/encuesta', encuestaRoutes)

app.listen(3000);

console.log('Server running on http://localhost:3000');