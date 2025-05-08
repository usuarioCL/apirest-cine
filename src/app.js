//Ecmascript Modules
import express from 'express';
import peliculasRoutes from './routes/peliculas.routes.js';

const app = express();

app.use(express.json()); 
app.use('/api/',peliculasRoutes); //Rutas de peliculas

//Control sobre rutas inexistentes
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Ruta no encontrada'
    })
})

export default app;