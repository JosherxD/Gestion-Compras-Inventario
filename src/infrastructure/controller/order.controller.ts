import { Request, Response } from 'express';
import { OrderUseCase } from '../../application/use_case/order.usecase';

export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  async create(req: Request, res: Response) {
    console.log('POST /ordenes llamado con datos:', req.body);
    try {
      const { customerId, items } = req.body;
      const order = await this.orderUseCase.createOrder(customerId, items);
      res.status(201).json(order);
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
      const updatedOrder = await this.orderUseCase.updateOrder(orderId, req.body);
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
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