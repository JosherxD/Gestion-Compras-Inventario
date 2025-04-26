import { Request, Response } from 'express';
import { OrderUseCase } from '../../application/use_case/order.usecase';
import { OrderRepositoryService } from '../services/order.repository.service';

const orderRepository = new OrderRepositoryService();

export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  async create(req: Request, res: Response) {
    console.log('POST /ordenes llamado con datos:', req.body);
    try {
      const { customerId, items } = req.body;

      if (!customerId || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Customer ID and at least one item are required.' });
      }

      for (const item of items) {
        if (!item.productId || item.quantity <= 0 || item.price <= 0) {
          return res.status(400).json({ error: 'Each item must have a valid productId, quantity > 0, and price > 0.' });
        }
      }

      const order = await this.orderUseCase.createOrder(customerId, items);

      const total = order.items.reduce((sum, item) => sum + item.calculateSubtotal(), 0);

      res.status(201).json({
        order,
        total,
        message: 'Order created successfully',
      });
    } catch (error) {
      console.error('Error al crear la orden:', error);
      res.status(500).json({ error: 'Error al crear la orden' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const orders = await this.orderUseCase.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
      res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
  }

  async getOrderById(req: Request, res: Response): Promise<Response> {
    try {
      const orderId = Number(req.params.id);
      const order = await this.orderUseCase.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      return res.status(500).json({ message: 'An error occurred while fetching the order.' });
    }
  }

  async updateOrder(req: Request, res: Response): Promise<Response> {
    try {
      const orderId = Number(req.params.id);
      const { status, items } = req.body;

      if (status && !['pendiente', 'completado', 'cancelado'].includes(status)) {
        return res.status(400).json({ message: `Invalid status: ${status}. Allowed statuses are: pendiente, completado, cancelado.` });
      }

      const existingOrder = await this.orderUseCase.getOrderById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }

      if (status === 'completado') {
        const completionResponse = await this.orderUseCase.updateOrderStatusToCompleted(orderId);
        return res.status(200).json(completionResponse);
      }

      const updatedOrder = await this.orderUseCase.updateOrder(orderId, { status, items });
      return res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ message: 'An error occurred while updating the order.' });
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<Response> {
    try {
      const orderId = Number(req.params.id);
      const success = await this.orderUseCase.deleteOrder(orderId);
      if (!success) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      return res.status(500).json({ message: 'An error occurred while deleting the order.' });
    }
  }
}

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await orderRepository.delete(Number(id));

    if (deleted) {
      res.status(200).json({ message: 'Orden eliminada correctamente.' });
    } else {
      res.status(404).json({ message: 'Orden no encontrada.' });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({ message: 'Error al eliminar la orden.', error: errorMessage });
  }
};