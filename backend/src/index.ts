import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import orderRoutes from './infrastructure/routes/order.routes';
import productRoutes from './infrastructure/routes/product.routes';
import purchaseOrderRoutes from './infrastructure/routes/purchaseorder.routes';
import { env } from './common/config/envs';
import { db } from './infrastructure/config/database';

const app = express();
const PORT = env.PORT;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3002',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

db.connectToDatabase().then(() => {
  console.log('✅ Conexión exitosa a MongoDB');
}).catch((error) => {
  console.error('❌ Error al conectar a MongoDB:', error);
  process.exit(1);
});

app.use('/api', orderRoutes);

app.use('/api', productRoutes);

app.use('/api/purchaseorders', purchaseOrderRoutes);

app.get('/ping', (_req, res) => {
  console.log('Solicitud recibida en /ping');
  res.send('pong');
});

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});