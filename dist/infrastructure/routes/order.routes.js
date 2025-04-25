"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controller/order.controller");
const order_usecase_1 = require("../../application/use_case/order.usecase");
const order_repository_service_1 = require("../services/order.repository.service");
const router = (0, express_1.Router)();
const orderRepository = new order_repository_service_1.OrderRepositoryService();
const orderUseCase = new order_usecase_1.OrderUseCase(orderRepository);
const orderController = new order_controller_1.OrderController(orderUseCase);
router.post('/ordenes', (req, res) => {
    orderController.create(req, res).catch(err => {
        console.error('Error en POST /ordenes:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    });
});
router.get('/ordenes', (req, res) => {
    orderController.getAll(req, res).catch(err => {
        console.error('Error en GET /ordenes:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    });
});
router.get('/ordenes/:id', (req, res) => {
    orderController.getById(req, res).catch(err => {
        console.error('Error en GET /ordenes/:id:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    });
});
router.put('/ordenes/:id', (req, res) => {
    orderController.update(req, res).catch(err => {
        console.error('Error en PUT /ordenes/:id:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    });
});
router.delete('/ordenes/:id', (req, res) => {
    orderController.delete(req, res).catch(err => {
        console.error('Error en DELETE /ordenes/:id:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    });
});
exports.default = router;
