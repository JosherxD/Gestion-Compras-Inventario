import { OrderRepositoryInterface } from '../../domain/interfaces/order.repository.interface';
import { Order  } from '../../domain/models/order.model';
import { PurchaseOrder } from '../../domain/models/order.item.model';
import { Price } from '../../domain/models/price';
import { Quantity } from '../../domain/models/quantity';
import { ProductUseCase } from './product.usecase';
import { PurchaseOrderRepositoryService } from '../../infrastructure/services/purchaseorder.repository.service';

export class OrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly productUseCase: ProductUseCase,
    private readonly purchaseOrderRepository?: PurchaseOrderRepositoryService
  ) {
    this.orderRepository = orderRepository;
    this.productUseCase = productUseCase;
    this.purchaseOrderRepository = purchaseOrderRepository;
  }

  async createOrder(
    customerId: string,
    items: { productId: string; price: number; quantity: number }[]
  ): Promise<Order> {
    
    if (items.some(item => item.quantity <= 0 || item.price <= 0)) {
      throw new Error('All items must have a quantity > 0 and price > 0.');
    }

    const orderItems = await Promise.all(items.map(async item => {
      const product = await this.productUseCase.getAllProducts().then(products =>
        products.find(p => p.id === parseInt(item.productId))
      );

      if (!product) {
        throw new Error(`Product with ID ${item.productId} does not exist.`);
      }

      if (product.quantity < item.quantity) {
        throw new Error(`Insufficient stock for product ID ${item.productId}. Available: ${product.quantity}, Requested: ${item.quantity}`);
      }

      product.quantity -= item.quantity;
      await this.productUseCase.updateProduct(product.id, { quantity: product.quantity });

      return new PurchaseOrder(
        item.productId,
        new Price(item.price),
        new Quantity(item.quantity),
        product.name, 
        product.description 
      );
    }));

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
    const orders = await this.orderRepository.findAll();
    return orders.map(order => {
      const reconstructedItems = order.items.map(item => {
        const subtotal = item.price.value * item.quantity.value;
        return new PurchaseOrder(
          item.productId,
          new Price(item.price.value),
          new Quantity(item.quantity.value),
          item.name,
          item.description,
          subtotal
        );
      });

      return new Order(
        order.id,
        order.customerId,
        reconstructedItems,
        order.createdAt,
        order.status
      );
    });
  }

  async getOrderById(id: number): Promise<Order | null> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      return null;
    }

    const reconstructedItems = order.items.map(item => {
      const subtotal = item.price.value * item.quantity.value;
      return new PurchaseOrder(
        item.productId,
        new Price(item.price.value),
        new Quantity(item.quantity.value),
        item.name, 
        item.description, 
        subtotal
      );
    });

    return new Order(
      order.id,
      order.customerId,
      reconstructedItems,
      order.createdAt,
      order.status
    );
  }

  async updateOrder(id: number, updatedData: Partial<Order>): Promise<Order | null> {
    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      return null;
    }

    if (updatedData.items) {
      const updatedItems = await Promise.all(updatedData.items.map(async item => {
        const product = await this.productUseCase.getAllProducts().then(products =>
          products.find(p => p.id === parseInt(item.productId))
        );

        if (!product) {
          throw new Error(`Product with ID ${item.productId} does not exist.`);
        }

        const quantityValue = (() => {
          if (typeof item.quantity === 'object' && item.quantity !== null && 'value' in item.quantity) {
            return (item.quantity as Quantity).value;
          }
          return typeof item.quantity === 'number' ? item.quantity : 0;
        })();
        if (product.quantity < quantityValue) {
          throw new Error(`Insufficient stock for product ID ${item.productId}. Available: ${product.quantity}, Requested: ${quantityValue}`);
        }

        const priceValue = item.price instanceof Price ? item.price.getValue() : item.price;

        return new PurchaseOrder(
          item.productId,
          new Price(priceValue),
          new Quantity(quantityValue),
          product.name, 
          product.description
        );
      }));

      updatedData = { ...updatedData, items: updatedItems };
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

  async updateOrderStatusToCompleted(orderId: number): Promise<{ message: string; orderId: number }> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    if (order.status !== 'completado') {
      order.status = 'completado';
      await this.orderRepository.save(order);
    }

    if (this.purchaseOrderRepository) {
      await this.purchaseOrderRepository.saveToPurchaseOrders(order);
    }

    await this.orderRepository.delete(orderId);

    return { message: 'Order processed successfully', orderId: orderId };
  }
}