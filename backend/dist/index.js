"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_routes_1 = __importDefault(require("./infrastructure/routes/order.routes"));
const envs_1 = require("./common/config/envs");
const app = (0, express_1.default)();
const PORT = envs_1.env.PORT;
app.use(express_1.default.json());
app.use('/api', order_routes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
