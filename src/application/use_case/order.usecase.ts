import { OrderRepositoryInterface } from '../../domain/interfaces/order.repository.interface';
import { Order  } from '../../domain/models/order.model';
import { OrderItem } from '../../domain/models/order.item.model';
import { Price } from '../../domain/models/price';
import { Quantity } from '../../domain/models/quantity';

export class OrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async createOrder(
    customerId: string,
    items: { productId: string; price: Price; quantity: Quantity }[]
  ): Promise<Order> {
    const orderItems = items.map(item => 
      new OrderItem(item.productId, item.price, item.quantity)
    );
    
    const order = new Order(
      this.generateOrderId(),
      customerId,
      orderItems,
      new Date(),
      'pendiente'
    );

    return this.orderRepository.save(order);
  }

  private generateOrderId(): number {
    return Date.now();
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async updateOrder(id: number, updatedData: Partial<Order>): Promise<Order | null> {
    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      return null;
    }

    const updatedOrder = new Order(
      existingOrder.id,
      updatedData.customerId ?? existingOrder.customerId,
      updatedData.items ?? existingOrder.items,
      existingOrder.createdAt,
      updatedData.status ?? existingOrder.status
    );

    return this.orderRepository.save(updatedOrder);
  }

  async deleteOrder(id: number): Promise<boolean> {
    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      return false;
    }

    return this.orderRepository.delete(id);
  }
}