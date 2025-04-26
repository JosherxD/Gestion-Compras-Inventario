import dotenv from 'dotenv';
dotenv.config();

export const env = {
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: parseInt(process.env.DB_PORT ?? "5432", 10),
  DB_USER: process.env.DB_USER ?? "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "your_secure_password",
  DB_NAME: process.env.DB_NAME ?? "order_system",
  DB_SCHEMA: process.env.DB_SCHEMA ?? "public",
  DB_SSL: process.env.DB_SSL === "true",
  DB_POOL_MAX: parseInt(process.env.DB_POOL_MAX ?? "10", 10),
  DB_POOL_IDLE_TIMEOUT: parseInt(process.env.DB_POOL_IDLE_TIMEOUT ?? "10000", 10),
  DB_POOL_CONNECTION_TIMEOUT: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT ?? "2000", 10),
  PORT: parseInt(process.env.PORT ?? "3000", 10),
  NODE_ENV: process.env.NODE_ENV ?? "development",
  API_PREFIX: process.env.API_PREFIX ?? "/api/v1",
  JWT_SECRET: process.env.JWT_SECRET ?? "your_jwt_secret_key",
  DEFAULT_PAGE_SIZE: parseInt(process.env.DEFAULT_PAGE_SIZE ?? "20", 10),
  MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/order_system"
};