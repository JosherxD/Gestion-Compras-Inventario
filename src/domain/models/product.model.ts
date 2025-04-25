import mongoose, { Schema, Document } from 'mongoose';

export interface ProductDocument extends Document {
  id: number;
  name: string;
  description: string;
  quantity: number;
  imageUrl: string;
  price: number; 
}

const ProductSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true }, 
  name: { type: String, required: true, unique: true }, 
  description: { type: String, required: true }, 
  quantity: { type: Number, required: true, min: 0 }, 
  imageUrl: { type: String }, 
  price: { type: Number, required: true, min: 0 }, 
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema);

export class Product {
    constructor(
      public readonly id: number,
      public readonly name: string,
      public readonly description: string,
      public readonly quantity: number,
      public readonly imageUrl: string,
      public readonly price: number 
    ) {}
  }