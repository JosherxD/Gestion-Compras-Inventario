import { ProductRepositoryInterface } from '../../domain/interfaces/product.repository.interface';
import { Product } from '../../domain/models/product.model';

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async getTopSellingProducts(limit: number = 5): Promise<Product[]> {
    return this.productRepository.findTopSelling(limit);
  }

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

  async updateProduct(productId: number, updates: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    const updatedProduct = await this.productRepository.updateProduct(productId, updates);
    if (!updatedProduct) {
      throw new Error(`Failed to update product with ID ${productId}.`);
    }
    return updatedProduct;
  }
}