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
exports.OrderUseCase = void 0;
const order_model_1 = require("../../domain/models/order.model");
const order_item_model_1 = require("../../domain/models/order.item.model");
class OrderUseCase {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    createOrder(customerId, items) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = items.map(item => new order_item_model_1.OrderItem(item.productId, item.price, item.quantity));
            const order = new order_model_1.Order(this.generateOrderId(), customerId, orderItems, new Date());
            return this.orderRepository.save(order);
        });
    }
    generateOrderId() {
        return `ORD-${Date.now()}`;
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.findAll();
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.findById(id);
        });
    }
    updateOrder(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const existingOrder = yield this.orderRepository.findById(id);
            if (!existingOrder) {
                return null;
            }
            const updatedOrder = new order_model_1.Order(existingOrder.id, (_a = updatedData.customerId) !== null && _a !== void 0 ? _a : existingOrder.customerId, (_b = updatedData.items) !== null && _b !== void 0 ? _b : existingOrder.items, existingOrder.createdAt, (_c = updatedData.status) !== null && _c !== void 0 ? _c : existingOrder.status);
            return this.orderRepository.save(updatedOrder);
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingOrder = yield this.orderRepository.findById(id);
            if (!existingOrder) {
                return false;
            }
            return this.orderRepository.delete(id);
        });
    }
}
exports.OrderUseCase = OrderUseCase;
