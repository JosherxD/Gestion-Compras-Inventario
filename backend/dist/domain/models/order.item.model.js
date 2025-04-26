"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
class OrderItem {
    constructor(productId, price, quantity) {
        this.productId = productId;
        this.price = price;
        this.quantity = quantity;
    }
    calculateSubtotal() {
        return this.price.value * this.quantity.value;
    }
}
exports.OrderItem = OrderItem;
