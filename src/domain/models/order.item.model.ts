import mongoose, { Schema, Document } from 'mongoose';
import { Price } from './price';
import { Quantity } from './quantity';

export interface OrderItemDocument extends Document {
  productId: string;
  price: number;
  quantity: number;
  subtotal: number;
}

const OrderItemSchema: Schema = new Schema({
  productId: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
  subtotal: {
    type: Number,
    required: true,
    default: 0,
  },
});

OrderItemSchema.pre<OrderItemDocument>('save', function (next) {
  this.subtotal = this.price * this.quantity; 
  next();
});

export const OrderItemModel = mongoose.model<OrderItemDocument>('OrderItem', OrderItemSchema);

export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly price: Price,
    public readonly quantity: Quantity
  ) {}

  calculateSubtotal(): number {
    return this.price.value * this.quantity.value;
  }
}