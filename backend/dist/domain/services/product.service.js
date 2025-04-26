"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDomainService = void 0;
class ProductDomainService {
    calculateDiscount(product, discountPercentage) {
        return product.price * (1 - discountPercentage / 100);
    }
}
exports.ProductDomainService = ProductDomainService;
