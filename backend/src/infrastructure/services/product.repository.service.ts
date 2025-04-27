import { ProductModel, Product } from '../../domain/models/product.model';
import { PurchaseOrderModel } from '../../domain/models/order.item.model';
<<<<<<< HEAD
=======
import mongoose from 'mongoose';
>>>>>>> develop

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
<<<<<<< HEAD
    const productDocument = await ProductModel.findOne({ id });
    if (!productDocument) return null;
    return new Product(
      productDocument.id,
      productDocument.name,
      productDocument.description,
      productDocument.quantity,
      productDocument.imageUrl,
      productDocument.price
=======
    const query = { id };
    const result = await mongoose.connection.collection('products').findOne(query);
    if (!result) return null;

    return new Product(
      result.id,
      result.name,
      result.description,
      result.quantity,
      result.imageUrl,
      result.price
    );
  }

  async findByName(name: string): Promise<Product[]> {
    const query = { name: { $regex: name, $options: 'i' } };
    const results = await mongoose.connection.collection('products').find(query).toArray();

    return results.map((result) =>
      new Product(
        result.id,
        result.name,
        result.description,
        result.quantity,
        result.imageUrl,
        result.price
      )
>>>>>>> develop
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

  async findTopSelling(limit: number): Promise<Product[]> {
    const topSellingProducts = await PurchaseOrderModel.aggregate([
      { $unwind: '$items' },
      { $group: {
          _id: '$items.productId',
          totalSold: { $sum: '$items.quantity' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: limit },
      { $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' }
    ]);

    return topSellingProducts.map((result: any) => new Product(
      result.productDetails.id,
      result.productDetails.name,
      result.productDetails.description,
      result.productDetails.quantity,
      result.productDetails.imageUrl,
      result.productDetails.price
    ));
  }

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product | null> {
    const updatedProductDocument = await ProductModel.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true }
    );

    if (!updatedProductDocument) return null;

    return new Product(
      updatedProductDocument.id,
      updatedProductDocument.name,
      updatedProductDocument.description,
      updatedProductDocument.quantity,
      updatedProductDocument.imageUrl,
      updatedProductDocument.price
    );
  }
}