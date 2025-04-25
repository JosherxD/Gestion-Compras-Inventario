import { ProductModel, Product } from '../../domain/models/product.model';

export class ProductRepositoryService {
  async save(product: Product): Promise<Product> {
    const productDocument = new ProductModel({
      id: product.id,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      imageUrl: product.imageUrl,
      price: product.price,
    });
    const savedProduct = await productDocument.save();
    return new Product(
      savedProduct.id, 
      savedProduct.name,
      savedProduct.description,
      savedProduct.quantity,
      savedProduct.imageUrl,
      savedProduct.price
    );
  }

  async findById(id: number): Promise<Product | null> {
    const productDocument = await ProductModel.findOne({ id });
    if (!productDocument) return null;
    return new Product(
      productDocument.id,
      productDocument.name,
      productDocument.description,
      productDocument.quantity,
      productDocument.imageUrl,
      productDocument.price
    );
  }

  async findAll(): Promise<Product[]> {
    const productDocuments = await ProductModel.find();
    return productDocuments.map(productDocument => {
      return new Product(
        productDocument.id,
        productDocument.name,
        productDocument.description,
        productDocument.quantity,
        productDocument.imageUrl,
        productDocument.price
      );
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await ProductModel.findOneAndDelete({ id });
    return result !== null;
  }

  async findTopSelling(): Promise<Product[]> {
    const topSellingProducts = await ProductModel.find().sort({ quantity: -1 }).limit(5);
    return topSellingProducts.map(productDocument => {
      return new Product(
        productDocument.id,
        productDocument.name,
        productDocument.description,
        productDocument.quantity,
        productDocument.imageUrl,
        productDocument.price
      );
    });
  }
}