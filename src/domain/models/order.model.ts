import mongoose, { Schema, Document } from 'mongoose';
import { PurchaseOrder } from './order.item.model';

// Define a type alias for order status
type OrderStatus = 'pendiente' | 'completado' | 'cancelado';

export interface OrderDocument extends Document {
  id: number;
  customerId: string;
  items: PurchaseOrder[];
  createdAt: Date;
  status: OrderStatus;
}

export class Order {
  private _status: OrderStatus;

  constructor(
    public readonly id: number,
    public readonly customerId: string,
    public readonly items: PurchaseOrder[],
    public readonly createdAt: Date,
    status: OrderStatus
  ) {
    this._status = status;
  }

  set status(newStatus: OrderStatus) {
    const validStatuses: OrderStatus[] = ['pendiente', 'completado', 'cancelado'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}. Allowed statuses are: ${validStatuses.join(', ')}`);
    }
    this._status = newStatus;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price.value * item.quantity.value, 0);
  }

  toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      items: this.items,
      createdAt: this.createdAt,
      status: this.status,
      total: this.total
    };
  }
}

const OrderSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  customerId: { type: String, required: true },
  items: { type: [Object], required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pendiente', 'completado', 'cancelado'],
    default: 'pendiente',
  },
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const OrderModel = mongoose.model<OrderDocument>('Order', OrderSchema);