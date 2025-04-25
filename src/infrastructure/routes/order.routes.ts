import { Router } from 'express';
import { OrderController } from '../controller/order.controller';
import { OrderUseCase } from '../../application/use_case/order.usecase';
import { OrderRepositoryService } from '../services/order.repository.service';
import { ProductUseCase } from '../../application/use_case/product.usecase';
import { ProductRepositoryService } from '../services/product.repository.service';

const router = Router();
const orderRepository = new OrderRepositoryService();
const productRepository = new ProductRepositoryService();
const productUseCase = new ProductUseCase(productRepository);
const orderUseCase = new OrderUseCase(orderRepository, productUseCase);
const orderController = new OrderController(orderUseCase);

router.post('/ordenes', (req, res) => {
  orderController.create(req, res).catch((err: Error) => {
    console.error('Error en POST /ordenes:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

router.get('/ordenes', (req, res) => {
  orderController.getAll(req, res).catch((err: Error) => {
    console.error('Error en GET /ordenes:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

router.get('/ordenes/:id', (req, res) => {
  orderController.getOrderById(req, res).catch((err: Error) => {
    console.error('Error en GET /ordenes/:id:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

router.put('/ordenes/:id', (req, res) => {
  orderController.updateOrder(req, res).catch((err: Error) => {
    console.error('Error en PUT /ordenes/:id:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

router.delete('/ordenes/:id', (req, res) => {
  orderController.deleteOrder(req, res).catch((err: Error) => {
    console.error('Error en DELETE /ordenes/:id:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

export default router;