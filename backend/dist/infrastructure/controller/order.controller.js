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
exports.OrderController = void 0;
class OrderController {
    constructor(orderUseCase) {
        this.orderUseCase = orderUseCase;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customerId, items } = req.body;
                const order = yield this.orderUseCase.createOrder(customerId, items);
                res.status(201).json(order);
            }
            catch (error) {
                console.error('Error al crear la orden:', error);
                res.status(500).json({ error: 'Error al crear la orden' });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.orderUseCase.getAllOrders();
                res.status(200).json(orders);
            }
            catch (error) {
                console.error('Error al obtener las órdenes:', error);
                res.status(500).json({ error: 'Error al obtener las órdenes' });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.orderUseCase.getOrderById(req.params.id);
                if (!order) {
                    return res.status(404).json({ error: 'Orden no encontrada' });
                }
                res.status(200).json(order);
            }
            catch (error) {
                console.error('Error al obtener la orden:', error);
                res.status(500).json({ error: 'Error al obtener la orden' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedOrder = yield this.orderUseCase.updateOrder(req.params.id, req.body);
                if (!updatedOrder) {
                    return res.status(404).json({ error: 'Orden no encontrada' });
                }
                res.status(200).json(updatedOrder);
            }
            catch (error) {
                console.error('Error al actualizar la orden:', error);
                res.status(500).json({ error: 'Error al actualizar la orden' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.orderUseCase.deleteOrder(req.params.id);
                if (!success) {
                    return res.status(404).json({ error: 'Orden no encontrada' });
                }
                res.status(204).send();
            }
            catch (error) {
                console.error('Error al eliminar la orden:', error);
                res.status(500).json({ error: 'Error al eliminar la orden' });
            }
        });
    }
}
exports.OrderController = OrderController;
