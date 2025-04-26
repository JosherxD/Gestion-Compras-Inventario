import mongoose, { Schema, Document } from 'mongoose';
import { Price } from './price';
import { Quantity } from './quantity';

export interface PurchaseOrderDocument extends Document {
  orderId: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
  total: number;
}

const PurchaseOrderSchema: Schema = new Schema({
  orderId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      quantity: { type: Number, required: true, min: 1 },
      subtotal: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
});

export const PurchaseOrderModel = mongoose.model<PurchaseOrderDocument>('PurchaseOrder', PurchaseOrderSchema);

export class PurchaseOrder {
  constructor(
    public readonly productId: string,
    public readonly price: Price,
    public readonly quantity: Quantity,
    public readonly subtotal?: number
  ) {
    if (!this.subtotal) {
      this.subtotal = this.calculateSubtotal();
    }
  }

  calculateSubtotal(): number {
    return this.price.value * this.quantity.value;
  }
}