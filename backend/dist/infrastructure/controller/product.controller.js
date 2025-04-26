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
exports.ProductController = void 0;
const statusCode_1 = require("../../common/config/statusCode");
class ProductController {
    constructor(productUseCase) {
        this.productUseCase = productUseCase;
    }
    getTopProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = parseInt(req.query.limit) || 3;
                const products = yield this.productUseCase.getTopProducts(limit);
                res.status(statusCode_1.HttpStatus.OK).json(products);
            }
            catch (error) {
                res.status(statusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        });
    }
}
exports.ProductController = ProductController;
