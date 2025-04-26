"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDomainService = void 0;
class OrderDomainService {
    validateOrder(order) {
        if (order.items.length === 0) {
            throw new Error('Order must have at least one item');
        }
    }
}
exports.OrderDomainService = OrderDomainService;
