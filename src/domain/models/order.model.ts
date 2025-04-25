import mongoose, { Schema, Document } from 'mongoose';
import { OrderItem } from './order.item.model';

export interface OrderDocument extends Document {
  id: number;
  customerId: string;
  items: OrderItem[];
  createdAt: Date;
  status: 'pendiente' | 'completado' | 'cancelado';
}

export class Order {
  private _status: 'pendiente' | 'completado' | 'cancelado';

  constructor(
    public readonly id: number,
    public readonly customerId: string,
    public readonly items: OrderItem[],
    public readonly createdAt: Date,
    status: 'pendiente' | 'completado' | 'cancelado'
  ) {
    this._status = status;
  }

  set status(newStatus: 'pendiente' | 'completado' | 'cancelado') {
    const validStatuses = ['pendiente', 'completado', 'cancelado'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}. Allowed statuses are: ${validStatuses.join(', ')}`);
    }
    this._status = newStatus;
  }

  get status(): 'pendiente' | 'completado' | 'cancelado' {
    return this._status;
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