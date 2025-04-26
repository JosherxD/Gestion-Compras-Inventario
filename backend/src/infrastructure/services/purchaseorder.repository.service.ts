import { PurchaseOrderModel, PurchaseOrderDocument } from '../../domain/models/order.item.model';
import { Order } from '../../domain/models/order.model';

export class PurchaseOrderRepositoryService {
  async getAllPurchaseOrders(): Promise<PurchaseOrderDocument[]> {
    return await PurchaseOrderModel.find().lean();
  }

  async getPurchaseOrderById(orderId: string): Promise<PurchaseOrderDocument | null> {
    return await PurchaseOrderModel.findOne({ orderId }).lean();
  }

  async updateOrderStatusToCompleted(order: Order): Promise<void> {
    if (order.status !== 'completado') {
      throw new Error(`Order status must be 'completado' to save in PurchaseOrder.`);
    }

    const purchaseOrders = order.items.map((item: any) => ({
      productId: item.productId,
      price: item.price.value,
      quantity: item.quantity.value,
      subtotal: item.calculateSubtotal(),
    }));

    await PurchaseOrderModel.insertMany(purchaseOrders);
  }

  async saveToPurchaseOrders(order: Order): Promise<void> {
    const items = order.items.map((item: any) => ({
      productId: item.productId,
      name: item.name,
      description: item.description,
      price: item.price.value,
      quantity: item.quantity.value,
      subtotal: item.calculateSubtotal(),
    }));

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    const purchaseOrder = {
      orderId: order.id.toString(),
      items,
      total,
      status: order.status
    };

    await PurchaseOrderModel.create(purchaseOrder);
  }

  async getMostSoldProduct(): Promise<{ productId: string; totalSold: number } | null> {
    const purchaseOrders = await PurchaseOrderModel.find({}, { items: 1 }).lean();

    const productSales: Record<string, number> = {};

    purchaseOrders.forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = 0;
        }
        productSales[item.productId] += item.quantity;
      });
    });

    const mostSoldProduct = Object.entries(productSales).reduce((max, [productId, totalSold]) => {
      return totalSold > max.totalSold ? { productId, totalSold } : max;
    }, { productId: '', totalSold: 0 });

    return mostSoldProduct.productId ? mostSoldProduct : null;
  }

  async getMostSoldProductByCompletedOrders(): Promise<{ productId: string; totalSold: number } | null> {
    const purchaseOrders = await PurchaseOrderModel.find({ status: 'completado' }, { items: 1 }).lean();

    const productSales: Record<string, number> = {};

    purchaseOrders.forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = 0;
        }
        productSales[item.productId] += item.quantity;
      });
    });

    const mostSoldProduct = Object.entries(productSales).reduce((max, [productId, totalSold]) => {
      return totalSold > max.totalSold ? { productId, totalSold } : max;
    }, { productId: '', totalSold: 0 });

    return mostSoldProduct.productId ? mostSoldProduct : null;
  }

  async getMostSoldProductByOrderId(orderId: string): Promise<{ productId: string; totalSold: number } | null> {
    const purchaseOrders = await PurchaseOrderModel.find({ orderId, status: 'completado' }, { items: 1 }).lean();

    const productSales: Record<string, number> = {};

    purchaseOrders.forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = 0;
        }
        productSales[item.productId] += item.quantity;
      });
    });

    const mostSoldProduct = Object.entries(productSales).reduce((max, [productId, totalSold]) => {
      return totalSold > max.totalSold ? { productId, totalSold } : max;
    }, { productId: '', totalSold: 0 });

    return mostSoldProduct.productId ? mostSoldProduct : null;
  }

  async getMostSoldProductOverall(): Promise<{ productId: string; totalSold: number } | null> {
    return this.getMostSoldProductByCompletedOrders();
  }

  async getTopSoldProductsOverall(limit: number = 3): Promise<{ productId: string; totalSold: number }[]> {
    const purchaseOrders = await PurchaseOrderModel.find({ status: 'completado' }, { items: 1 }).lean();

    const productSales: Record<string, number> = {};

    purchaseOrders.forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = 0;
        }
        productSales[item.productId] += item.quantity;
      });
    });

    const sortedProducts = Object.entries(productSales)
      .map(([productId, totalSold]) => ({ productId, totalSold }))
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, limit);

    return sortedProducts;
  }

  // async getTop3SoldProducts(): Promise<{ productId: string; name: string; totalSold: number }[]> {
  //   const topProducts = await PurchaseOrderModel.aggregate([
  //     { $unwind: '$items' },
  //     { $group: {
  //         _id: '$items.productId',
  //         name: { $first: '$items.name' },
  //         totalSold: { $sum: '$items.quantity' },
  //         status: { $first: '$status' }
  //       }
  //     },
  //     { $match: { status: 'completado' } },
  //     { $sort: { totalSold: -1 } },
  //     { $limit: 3 }
  //   ]);

  //   return topProducts.map(product => ({
  //     productId: product._id,
  //     name: product.name,
  //     totalSold: product.totalSold
  //   }));
  // }
}