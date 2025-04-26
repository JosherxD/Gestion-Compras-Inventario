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
exports.ProductRepositoryService = void 0;
const product_model_1 = require("../../domain/models/product.model");
const mongoose_1 = require("mongoose");
class ProductRepositoryService {
    save(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDocument = new product_model_1.ProductModel({
                name: product.name,
                price: product.price,
                quantity: product.stock,
            });
            const savedProduct = yield productDocument.save();
            const productId = savedProduct._id instanceof mongoose_1.Types.ObjectId ? savedProduct._id.toHexString() : '';
            return new product_model_1.Product(productId, savedProduct.name, savedProduct.price, savedProduct.quantity);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDocument = yield product_model_1.ProductModel.findById(id);
            if (!productDocument)
                return null;
            const productId = productDocument._id instanceof mongoose_1.Types.ObjectId ? productDocument._id.toHexString() : '';
            return new product_model_1.Product(productId, productDocument.name, productDocument.price, productDocument.quantity);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const productDocuments = yield product_model_1.ProductModel.find();
            return productDocuments.map(productDocument => {
                const productId = productDocument._id instanceof mongoose_1.Types.ObjectId ? productDocument._id.toHexString() : '';
                return new product_model_1.Product(productId, productDocument.name, productDocument.price, productDocument.quantity);
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield product_model_1.ProductModel.findByIdAndDelete(id);
            return result !== null;
        });
    }
    findTopSelling() {
        return __awaiter(this, void 0, void 0, function* () {
            const topSellingProducts = yield product_model_1.ProductModel.find().sort({ quantity: -1 }).limit(5);
            return topSellingProducts.map(productDocument => {
                const productId = productDocument._id instanceof mongoose_1.Types.ObjectId ? productDocument._id.toHexString() : '';
                return new product_model_1.Product(productId, productDocument.name, productDocument.price, productDocument.quantity);
            });
        });
    }
}
exports.ProductRepositoryService = ProductRepositoryService;
