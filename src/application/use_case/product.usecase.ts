import { ProductRepositoryInterface } from '../../domain/interfaces/product.repository.interface';
import { Product } from '../../domain/models/product.model';

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async getTopProducts(limit: number = 3): Promise<Product[]> {
    return this.productRepository.findTopSelling(limit);
  }

  async createProduct(data: { id: number; name: string; description: string; quantity: number; imageUrl: string; price: number }): Promise<Product> {
    const { id, name, description, quantity, imageUrl, price } = data;

    const product = new Product(id, name, description, quantity, imageUrl, price);

    return this.productRepository.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

}