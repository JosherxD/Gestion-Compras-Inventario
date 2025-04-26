import { Product } from '../models/product.model.spec';

export interface ProductRepositoryInterface {
  findTopSelling(limit: number): Promise<Product[]>;
  save(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(productId: number): Promise<Product | null>;
  updateProduct(productId: number, updates: Partial<Product>): Promise<Product | null>;
}