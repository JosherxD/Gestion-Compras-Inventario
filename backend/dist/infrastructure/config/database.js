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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envs_1 = require("../../common/config/envs");
class DatabaseConfig {
    constructor() {
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const uri = (_a = envs_1.env.MONGO_URI) !== null && _a !== void 0 ? _a : 'mongodb://localhost:27017/DBCompras';
                yield mongoose_1.default.connect(uri, {});
                console.log('✅ Conexión exitosa a MongoDB');
            }
            catch (error) {
                console.error('❌ Error al conectar a MongoDB:', error);
                process.exit(1);
            }
        });
    }
    static getInstance() {
        if (!DatabaseConfig.instance) {
            DatabaseConfig.instance = new DatabaseConfig();
        }
        return DatabaseConfig.instance;
    }
}
const dbConfig = {
    host: envs_1.env.DB_HOST,
    port: envs_1.env.DB_PORT,
    user: envs_1.env.DB_USER,
    password: envs_1.env.DB_PASSWORD,
    database: envs_1.env.DB_NAME,
    ssl: envs_1.env.DB_SSL,
    pool: {
        max: envs_1.env.DB_POOL_MAX,
        idleTimeoutMillis: envs_1.env.DB_POOL_IDLE_TIMEOUT,
        connectionTimeoutMillis: envs_1.env.DB_POOL_CONNECTION_TIMEOUT,
    },
};
exports.db = DatabaseConfig.getInstance();
