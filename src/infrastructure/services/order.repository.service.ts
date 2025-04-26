import { OrderModel, Order } from '../../domain/models/order.model';
import { Price } from '../../domain/models/price';
import { Quantity } from '../../domain/models/quantity';
import { PurchaseOrder, PurchaseOrderModel } from '../../domain/models/order.item.model';

export class OrderRepositoryService {
  async save(order: Order): Promise<Order> {
    const orderItems = order.items.map((item: any) => ({
      productId: item.productId,
      price: item.price.value,
      quantity: item.quantity.value,
      subtotal: item.calculateSubtotal(),
    }));

    const updatedOrderDocument = await OrderModel.findOneAndUpdate(
      { id: order.id },
      {
        $set: {
          customerId: order.customerId,
          items: orderItems,
          createdAt: order.createdAt,
          status: order.status,
        },
      },
      { new: true, upsert: true } // Crear el documento si no existe
    );

    return new Order(
      updatedOrderDocument.id,
      updatedOrderDocument.customerId,
      updatedOrderDocument.items.map((item: any) => new PurchaseOrder(
        item.productId,
        new Price(Number(item.price)), // Convertir a número
        new Quantity(Math.floor(Number(item.quantity))) // Convertir a entero
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
      new Quantity(Math.floor(Number(item.quantity))) // Convertir a entero
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
        new Quantity(Math.floor(Number(item.quantity))) // Convertir a entero
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

  async updateOrderStatusToCompleted(orderId: number): Promise<void> {
    const order = await this.findById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    if (order.status !== 'completado') {
      throw new Error(`Order status must be 'completado' to save in PurchaseOrder.`);
    }

    const purchaseOrders = order.items.map((item: any) => ({
      productId: item.productId,
      price: item.price.value,
      quantity: item.quantity.value,
      subtotal: item.calculateSubtotal(),
    }));

    await PurchaseOrderModel.insertMany(purchaseOrders);
  }

  async saveToPurchaseOrders(order: Order): Promise<void> {
    // Consolidate all items into a single record
    const items = order.items.map((item: any) => ({
      productId: item.productId,
      productName: `Product ${item.productId}`, // Replace with actual product name retrieval logic
      price: item.price.value,
      quantity: item.quantity.value,
      subtotal: item.calculateSubtotal(),
    }));

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    const purchaseOrder = {
      orderId: order.id.toString(),
      items,
      total,
    };

    await PurchaseOrderModel.create(purchaseOrder);

    // Remove the order from the orders table
    await OrderModel.findOneAndDelete({ id: order.id });
  }
}