import { OrderRepositoryInterface } from '../../domain/interfaces/order.repository.interface';
import { Order  } from '../../domain/models/order.model';
import { OrderItem } from '../../domain/models/order.item.model';
import { Price } from '../../domain/models/price';
import { Quantity } from '../../domain/models/quantity';
import { ProductUseCase } from './product.usecase';

export class OrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly productUseCase: ProductUseCase
  ) {
    this.orderRepository = orderRepository;
    this.productUseCase = productUseCase;
  }

  async createOrder(
    customerId: string,
    items: { productId: string; price: number; quantity: number }[]
  ): Promise<Order> {
    
    if (items.some(item => item.quantity <= 0 || item.price <= 0)) {
      throw new Error('All items must have a quantity > 0 and price > 0.');
    }

    for (const item of items) {
      const products = await this.productUseCase.getAllProducts();
      const product = products.find(p => p.id === parseInt(item.productId));

      if (!product) {
        throw new Error(`Product with ID ${item.productId} does not exist.`);
      }

      const quantityValue = typeof item.quantity === 'object' && item.quantity !== null && 'value' in item.quantity ? (item.quantity as Quantity).value : (typeof item.quantity === 'number' ? item.quantity : 0);
      if (product.quantity < quantityValue) {
        throw new Error(`Insufficient stock for product ID ${item.productId}. Available: ${product.quantity}, Requested: ${item.quantity}`);
      }

      product.quantity -= item.quantity;
      await this.productUseCase.updateProduct(product.id, { quantity: product.quantity });
    }

    const orderItems = items.map(item => {
      const quantityValue = Math.floor(item.quantity); // Ensure quantity is an integer
      return new OrderItem(item.productId, new Price(item.price), new Quantity(quantityValue));
    });

    const order = new Order(
      this.generateOrderId(),
      customerId,
      orderItems,
      new Date(),
      'pendiente'
    );

    const savedOrder = await this.orderRepository.save(order);

    // Reconstruct OrderItem instances to ensure methods like calculateSubtotal are available
    const reconstructedItems = savedOrder.items.map(item =>
      new OrderItem(item.productId, new Price(item.price.value), new Quantity(item.quantity.value))
    );

    return new Order(
      savedOrder.id,
      savedOrder.customerId,
      reconstructedItems,
      savedOrder.createdAt,
      savedOrder.status
    );
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

    if (updatedData.items) {
      const updatedItems = await Promise.all(updatedData.items.map(async item => {
        const product = await this.productUseCase.getAllProducts().then(products =>
          products.find(p => p.id === parseInt(item.productId))
        );

        if (!product) {
          throw new Error(`Product with ID ${item.productId} does not exist.`);
        }

        const quantityValue = typeof item.quantity === 'object' && item.quantity !== null && 'value' in item.quantity ? (item.quantity as Quantity).value : (typeof item.quantity === 'number' ? item.quantity : 0);
        if (product.quantity < quantityValue) {
          throw new Error(`Insufficient stock for product ID ${item.productId}. Available: ${product.quantity}, Requested: ${item.quantity}`);
        }

        const priceValue = item.price instanceof Price ? item.price.getValue() : item.price;

        return new OrderItem(item.productId, new Price(priceValue), new Quantity(quantityValue));
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
}