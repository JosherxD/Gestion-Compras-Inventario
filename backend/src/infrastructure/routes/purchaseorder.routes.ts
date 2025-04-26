import { Router, Request, Response, NextFunction } from 'express';
import { PurchaseOrderRepositoryService } from '../services/purchaseorder.repository.service';

const router = Router();
const purchaseOrderRepository = new PurchaseOrderRepositoryService();


router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const purchaseOrders = await purchaseOrderRepository.getAllPurchaseOrders();
      res.json(purchaseOrders);
    } catch (error) {
      next(error);
    }
  });
  
  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const purchaseOrder = await purchaseOrderRepository.getPurchaseOrderById(id);
      if (!purchaseOrder) {
        return res.status(404).json({ error: 'Purchase order not found' });
      }
      res.json(purchaseOrder);
    } catch (error) {
      next(error);
    }
  });


router.get('/most-sold-product/:orderId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const mostSoldProduct = await purchaseOrderRepository.getMostSoldProductByOrderId(orderId);
    if (!mostSoldProduct) {
      return res.status(404).json({ error: 'No sales data available for the specified orderId' });
    }
    res.json(mostSoldProduct);
  } catch (error) {
    next(error);
  }
});


// router.get('/top-3-sold-products', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const topSoldProducts = await purchaseOrderRepository.getTop3SoldProducts();
//     res.json(topSoldProducts);
//   } catch (error) {
//     next(error);
//   }
// });

export default router;