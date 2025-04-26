import { Product } from '../models/product.model';

export class ProductDomainService {
  calculateDiscount(product: Product, discountPercentage: number): number {
    return product.price * (1 - discountPercentage / 100);
  }
}