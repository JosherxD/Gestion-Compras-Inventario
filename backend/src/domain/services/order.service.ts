import { Order } from '../models/order.model';

export class OrderDomainService {
  validateOrder(order: Order): void {
    if (order.items.length === 0) {
      throw new Error('Order must have at least one item');
    }

  }
}