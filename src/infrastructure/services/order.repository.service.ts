import { OrderModel, Order } from '../../domain/models/order.model';
import { OrderItem } from '../../domain/models/order.item.model';
import { Price } from '../../domain/models/price';
import { Quantity } from '../../domain/models/quantity';

export class OrderRepositoryService {
  async save(order: Order): Promise<Order> {
    const orderDocument = new OrderModel({
      id: order.id, 
      customerId: order.customerId,
      items: order.items,
      createdAt: order.createdAt,
      status: order.status,
    });
    const savedOrder = await orderDocument.save();
    return new Order(
      savedOrder.id, 
      savedOrder.customerId,
      savedOrder.items,
      savedOrder.createdAt,
      savedOrder.status
    );
  }

  async findById(id: number): Promise<Order | null> {
    const orderDocument = await OrderModel.findOne({ id }).lean(); 
    if (!orderDocument) return null;

    const items = orderDocument.items.map(item => {
      const priceValue = typeof item.price === 'number' ? item.price : 0;
      const quantityValue = typeof item.quantity === 'number' ? item.quantity : 1;
      return new OrderItem(
        item.productId,
        new Price(priceValue),
        new Quantity(quantityValue)
      );
    });

    return new Order(
      orderDocument.id, 
      orderDocument.customerId,
      items,
      orderDocument.createdAt,
      orderDocument.status
    );
  }

  async findAll(): Promise<Order[]> {
    const orderDocuments = await OrderModel.find().lean();
    return orderDocuments.map(orderDocument => {
      const items = orderDocument.items.map(item => {
        const priceValue = typeof item.price === 'number' && item.price > 0 ? item.price : 1; 
        const quantityValue = typeof item.quantity === 'number' ? item.quantity : 1;
        return new OrderItem(
          item.productId,
          new Price(priceValue),
          new Quantity(quantityValue)
        );
      });

      return new Order(
        orderDocument.id, 
        orderDocument.customerId,
        items,
        orderDocument.createdAt,
        orderDocument.status
      );
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await OrderModel.findOneAndDelete({ id }); 
    return result !== null;
  }
}