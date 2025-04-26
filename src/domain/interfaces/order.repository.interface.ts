import { Order } from '../models/order.model';

export interface OrderRepositoryInterface {
  save(order: Order): Promise<Order>;
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  delete(id: number): Promise<boolean>;
  updateOrderStatusToCompleted(orderId: number): Promise<void>;
  saveToPurchaseOrders(order: Order): Promise<void>;
}