import { Router, Request, Response, NextFunction } from 'express';
import { OrderController } from '../controller/order.controller';
import { OrderUseCase } from '../../application/use_case/order.usecase';
import { OrderRepositoryService } from '../services/order.repository.service';
import { ProductUseCase } from '../../application/use_case/product.usecase';
import { ProductRepositoryService } from '../services/product.repository.service';
import { PurchaseOrderRepositoryService } from '../services/purchaseorder.repository.service';

const router = Router();
const orderRepository = new OrderRepositoryService();
const productRepository = new ProductRepositoryService();
const productUseCase = new ProductUseCase(productRepository);
const purchaseOrderRepository = new PurchaseOrderRepositoryService();
const orderUseCase = new OrderUseCase(orderRepository, productUseCase, purchaseOrderRepository);
const orderController = new OrderController(orderUseCase);

router.post('/ordenes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderController.create(req, res);
  } catch (err) {
    console.error('Error en POST /ordenes:', err);
    next(err);
  }
});

router.get('/ordenes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderController.getAll(req, res);
  } catch (err) {
    console.error('Error en GET /ordenes:', err);
    next(err);
  }
});

router.get('/ordenes/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderController.getOrderById(req, res);
  } catch (err) {
    console.error('Error en GET /ordenes/:id:', err);
    next(err);
  }
});

router.put('/ordenes/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderController.updateOrder(req, res);
  } catch (err) {
    console.error('Error en PUT /ordenes/:id:', err);
    next(err);
  }
});

router.delete('/ordenes/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderController.deleteOrder(req, res);
  } catch (err) {
    console.error('Error en DELETE /ordenes/:id:', err);
    next(err);
  }
});

export default router;