import { Product } from '../models/product.model';

export interface ProductRepositoryInterface {
  findTopSelling(limit: number): Promise<Product[]>;
  save(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(productId: number): Promise<Product | null>;
  updateProduct(productId: number, updates: Partial<Product>): Promise<Product | null>;
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
  findByName(name: string): Promise<Product[]>;
>>>>>>> develop
>>>>>>> master
}