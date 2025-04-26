const mongoose = require('mongoose');
import * as purchaseOrderModule from '../../domain/models/order.item.model.spec';
import { Price } from '../../domain/models/price.spec';
import { Quantity } from '../../domain/models/quantity.spec';

describe('PurchaseOrderModel', () => {
  it('should call mongoose.model with correct arguments', () => {
    const modelSpy = jest.spyOn(mongoose, 'model');
    const { PurchaseOrderModel } = require('../../domain/models/order.item.model');

    expect(modelSpy).toHaveBeenCalledWith('PurchaseOrder', expect.anything());
    expect(PurchaseOrderModel.modelName).toBe('PurchaseOrder');
  });
});

describe('PurchaseOrder class', () => {
  it('should calculate subtotal correctly when not provided', () => {
    const price = new Price(10);
    const quantity = new Quantity(2);
    const subtotalSpy = jest.spyOn(purchaseOrderModule.PurchaseOrder.prototype, 'calculateSubtotal');

    const order = new purchaseOrderModule.PurchaseOrder(
      'prod-001',
      price,
      quantity,
      'Product Name',
      'Description'
    );

    expect(subtotalSpy).toHaveBeenCalled();
    expect(order.subtotal).toBe(20);
  });

  it('should not call calculateSubtotal if subtotal is provided', () => {
    const price = new Price(10);
    const quantity = new Quantity(2);
    const subtotalSpy = jest.spyOn(purchaseOrderModule.PurchaseOrder.prototype, 'calculateSubtotal');

    const order = new purchaseOrderModule.PurchaseOrder(
      'prod-002',
      price,
      quantity,
      'Product Name',
      'Description',
      50
    );

    expect(subtotalSpy).not.toHaveBeenCalled();
    expect(order.subtotal).toBe(50);
  });
});

describe('PurchaseOrderSchema', () => {
  it('should define the schema with correct fields and types', () => {
    const { PurchaseOrderModel } = require('../../domain/models/order.item.model');
    const schemaPaths = PurchaseOrderModel.schema.paths;

    expect(schemaPaths.orderId).toBeDefined();
    expect(schemaPaths.orderId.instance).toBe('String');
    expect(schemaPaths.items).toBeDefined();
    expect(schemaPaths.total).toBeDefined();
    expect(schemaPaths.total.instance).toBe('Number');
    expect(schemaPaths.status).toBeDefined();
    expect(schemaPaths.status.instance).toBe('String');
  });

  it('should require orderId, total, and status fields', () => {
    const { PurchaseOrderModel } = require('../../domain/models/order.item.model');
    const schemaPaths = PurchaseOrderModel.schema.paths;

    expect(schemaPaths.orderId.isRequired).toBe(true);
    expect(schemaPaths.total.isRequired).toBe(true);
    expect(schemaPaths.status.isRequired).toBe(true);
  });

  it('should define items as an array with correct subfields', () => {
    const { PurchaseOrderModel } = require('../../domain/models/order.item.model');
    const itemsSchema = PurchaseOrderModel.schema.paths.items.schema.paths;

    expect(itemsSchema.productId).toBeDefined();
    expect(itemsSchema.productId.instance).toBe('String');
    expect(itemsSchema.name).toBeDefined();
    expect(itemsSchema.name.instance).toBe('String');
    expect(itemsSchema.description).toBeDefined();
    expect(itemsSchema.description.instance).toBe('String');
    expect(itemsSchema.price).toBeDefined();
    expect(itemsSchema.price.instance).toBe('Number');
    expect(itemsSchema.quantity).toBeDefined();
    expect(itemsSchema.quantity.instance).toBe('Number');
    expect(itemsSchema.subtotal).toBeDefined();
    expect(itemsSchema.subtotal.instance).toBe('Number');
  });

  it('should enforce minimum values for price and quantity', () => {
    const { PurchaseOrderModel } = require('../../domain/models/order.item.model');
    const itemsSchema = PurchaseOrderModel.schema.paths.items.schema.paths;

    expect(itemsSchema.price.options.min).toBe(0);
    expect(itemsSchema.quantity.options.min).toBe(1);
  });
});