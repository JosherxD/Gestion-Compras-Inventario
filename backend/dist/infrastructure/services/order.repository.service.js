"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepositoryService = void 0;
const order_model_1 = require("../../domain/models/order.model");
const order_item_model_1 = require("../../domain/models/order.item.model");
const price_1 = require("../../domain/models/price");
const quantity_1 = require("../../domain/models/quantity");
const mongoose_1 = require("mongoose");
class OrderRepositoryService {
    save(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderDocument = new order_model_1.OrderModel({
                customerId: order.customerId,
                items: order.items,
                createdAt: order.createdAt,
                status: order.status,
            });
            const savedOrder = yield orderDocument.save();
            const orderId = savedOrder._id instanceof mongoose_1.Types.ObjectId ? savedOrder._id.toHexString() : '';
            return new order_model_1.Order(orderId, savedOrder.customerId, savedOrder.items, savedOrder.createdAt, savedOrder.status);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderDocument = yield order_model_1.OrderModel.findById(id).lean();
            if (!orderDocument)
                return null;
            const items = orderDocument.items.map(item => {
                const priceValue = typeof item.price === 'number' ? item.price : 0;
                const quantityValue = typeof item.quantity === 'number' ? item.quantity : 1;
                return new order_item_model_1.OrderItem(item.productId, new price_1.Price(priceValue), new quantity_1.Quantity(quantityValue));
            });
            const orderId = orderDocument._id instanceof mongoose_1.Types.ObjectId ? orderDocument._id.toHexString() : '';
            return new order_model_1.Order(orderId, orderDocument.customerId, items, orderDocument.createdAt, orderDocument.status);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const orderDocuments = yield order_model_1.OrderModel.find().lean();
            return orderDocuments.map(orderDocument => {
                const items = orderDocument.items.map(item => {
                    const priceValue = typeof item.price === 'number' ? item.price : 0;
                    const quantityValue = typeof item.quantity === 'number' ? item.quantity : 1;
                    return new order_item_model_1.OrderItem(item.productId, new price_1.Price(priceValue), new quantity_1.Quantity(quantityValue));
                });
                const orderId = orderDocument._id instanceof mongoose_1.Types.ObjectId ? orderDocument._id.toHexString() : '';
                return new order_model_1.Order(orderId, orderDocument.customerId, items, orderDocument.createdAt, orderDocument.status);
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield order_model_1.OrderModel.findByIdAndDelete(id);
            return result !== null;
        });
    }
}
exports.OrderRepositoryService = OrderRepositoryService;
