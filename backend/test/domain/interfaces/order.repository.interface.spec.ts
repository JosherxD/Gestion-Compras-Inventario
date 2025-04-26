import { Order } from '../../domain/models/order.model.spec';
import { OrderRepositoryInterface } from '../../domain/interfaces/order.repository.interface.spec';

describe('OrderRepositoryInterface', () => {
  let orderRepository: OrderRepositoryInterface;

  beforeEach(() => {
    // Mock implementation of the repository
    orderRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };
  });

  it('should call save method with the correct order', async () => {
    const order = new Order(); // Assuming Order has a default constructor
    jest.spyOn(orderRepository, 'save').mockResolvedValue(order);

    const result = await orderRepository.save(order);

    expect(orderRepository.save).toHaveBeenCalledWith(order);
    expect(result).toBe(order);
  });

  it('should call findById method with the correct id', async () => {
    const order = new Order();
    const id = 1;
    jest.spyOn(orderRepository, 'findById').mockResolvedValue(order);

    const result = await orderRepository.findById(id);

    expect(orderRepository.findById).toHaveBeenCalledWith(id);
    expect(result).toBe(order);
  });

  it('should call findAll method and return all orders', async () => {
    const orders = [new Order(), new Order()];
    jest.spyOn(orderRepository, 'findAll').mockResolvedValue(orders);

    const result = await orderRepository.findAll();

    expect(orderRepository.findAll).toHaveBeenCalled();
    expect(result).toBe(orders);
  });

  it('should call delete method with the correct id and return true', async () => {
    const id = 1;
    jest.spyOn(orderRepository, 'delete').mockResolvedValue(true);

    const result = await orderRepository.delete(id);

    expect(orderRepository.delete).toHaveBeenCalledWith(id);
    expect(result).toBe(true);
  });
});