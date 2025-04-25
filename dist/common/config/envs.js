"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    DB_HOST: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : "localhost",
    DB_PORT: parseInt((_b = process.env.DB_PORT) !== null && _b !== void 0 ? _b : "5432", 10),
    DB_USER: (_c = process.env.DB_USER) !== null && _c !== void 0 ? _c : "postgres",
    DB_PASSWORD: (_d = process.env.DB_PASSWORD) !== null && _d !== void 0 ? _d : "your_secure_password",
    DB_NAME: (_e = process.env.DB_NAME) !== null && _e !== void 0 ? _e : "order_system",
    DB_SCHEMA: (_f = process.env.DB_SCHEMA) !== null && _f !== void 0 ? _f : "public",
    DB_SSL: process.env.DB_SSL === "true",
    DB_POOL_MAX: parseInt((_g = process.env.DB_POOL_MAX) !== null && _g !== void 0 ? _g : "10", 10),
    DB_POOL_IDLE_TIMEOUT: parseInt((_h = process.env.DB_POOL_IDLE_TIMEOUT) !== null && _h !== void 0 ? _h : "10000", 10),
    DB_POOL_CONNECTION_TIMEOUT: parseInt((_j = process.env.DB_POOL_CONNECTION_TIMEOUT) !== null && _j !== void 0 ? _j : "2000", 10),
    PORT: parseInt((_k = process.env.PORT) !== null && _k !== void 0 ? _k : "3000", 10),
    NODE_ENV: (_l = process.env.NODE_ENV) !== null && _l !== void 0 ? _l : "development",
    API_PREFIX: (_m = process.env.API_PREFIX) !== null && _m !== void 0 ? _m : "/api/v1",
    JWT_SECRET: (_o = process.env.JWT_SECRET) !== null && _o !== void 0 ? _o : "your_jwt_secret_key",
    DEFAULT_PAGE_SIZE: parseInt((_p = process.env.DEFAULT_PAGE_SIZE) !== null && _p !== void 0 ? _p : "20", 10),
    MONGO_URI: (_q = process.env.MONGO_URI) !== null && _q !== void 0 ? _q : "mongodb://localhost:27017/order_system"
};
