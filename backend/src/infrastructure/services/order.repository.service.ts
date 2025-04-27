import { OrderModel, Order } from '../../domain/models/order.model';
import { Price } from '../../domain/models/price';
import { Quantity } from '../../domain/models/quantity';
import { PurchaseOrder } from '../../domain/models/order.item.model';

export class OrderRepositoryService {
  async save(order: Order): Promise<Order> {
    const orderItems = order.items.map((item: any) => ({
      productId: item.productId,
      name: item.name,
      description: item.description,
      price: item.price.value,
      quantity: item.quantity.value,
      subtotal: item.calculateSubtotal(),
      status: order.status,
    }));

    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

    const updatedOrderDocument = await OrderModel.findOneAndUpdate(
      { id: order.id },
      {
        $set: {
          customerId: order.customerId,
          items: orderItems,
          total,
          createdAt: order.createdAt,
          status: order.status,
        },
      },
      { new: true, upsert: true }
    );

    return new Order(
      updatedOrderDocument.id,
      updatedOrderDocument.customerId,
      updatedOrderDocument.items.map((item: any) => new PurchaseOrder(
        item.productId,
        new Price(Number(item.price)),
        new Quantity(Math.floor(Number(item.quantity))),
        item.name,
        item.description
      )),
      updatedOrderDocument.createdAt,
      updatedOrderDocument.status
    );
  }

  async findById(id: number): Promise<Order | null> {
    const orderDocument = await OrderModel.findOne({ id }).lean(); 
    if (!orderDocument) return null;

    const items = orderDocument.items.map((item: any) => new PurchaseOrder(
      item.productId,
      new Price(Number(item.price)),
      new Quantity(Math.floor(Number(item.quantity))),
      item.name,
      item.description
    ));

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
      const items = orderDocument.items.map((item: any) => new PurchaseOrder(
        item.productId,
        new Price(Number(item.price)),
        new Quantity(Math.floor(Number(item.quantity))),
        item.name,
        item.description
      ));

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

  async getNextOrderId(): Promise<number> {
    const lastOrder = await OrderModel.findOne().sort({ id: -1 }).lean();
    return lastOrder ? lastOrder.id + 1 : 1;
  }
>>>>>>> develop
>>>>>>> master
}