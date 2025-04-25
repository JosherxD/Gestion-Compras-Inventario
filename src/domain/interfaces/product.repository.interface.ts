import { Product } from '../models/product.model';

export interface ProductRepositoryInterface {
  findTopSelling(limit: number): Promise<Product[]>;
  save(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
}