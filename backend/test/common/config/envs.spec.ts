import * as dotenv from 'dotenv';
import * as envModule from './env';

describe('env config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // limpia caché del módulo
    process.env = { ...originalEnv }; // clona el entorno original
  });

  afterEach(() => {
    process.env = originalEnv; // restaura el entorno original
    jest.restoreAllMocks(); // limpia todos los espías
  });

  it('should load environment variables with default values', () => {
    process.env = {}; // sin variables de entorno definidas

    // Forzamos a recargar el módulo con las nuevas variables
    jest.spyOn(dotenv, 'config').mockImplementation(() => ({ parsed: {} }));

    const freshEnv = require('./env').env;

    expect(freshEnv.DB_HOST).toBe('localhost');
    expect(freshEnv.DB_PORT).toBe(5432);
    expect(freshEnv.DB_USER).toBe('postgres');
    expect(freshEnv.DB_PASSWORD).toBe('your_secure_password');
    expect(freshEnv.DB_NAME).toBe('order_system');
    expect(freshEnv.DB_SCHEMA).toBe('public');
    expect(freshEnv.DB_SSL).toBe(false);
    expect(freshEnv.PORT).toBe(3000);
    expect(freshEnv.NODE_ENV).toBe('development');
    expect(freshEnv.API_PREFIX).toBe('/api/v1');
    expect(freshEnv.JWT_SECRET).toBe('your_jwt_secret_key');
    expect(freshEnv.DEFAULT_PAGE_SIZE).toBe(20);
    expect(freshEnv.MONGO_URI).toBe('mongodb://localhost:27017/order_system');
  });

  it('should use values from process.env if provided', () => {
    process.env.DB_HOST = 'db.example.com';
    process.env.DB_PORT = '6543';
    process.env.DB_SSL = 'true';
    process.env.PORT = '8080';
    process.env.JWT_SECRET = 'super_secret';

    jest.spyOn(dotenv, 'config').mockImplementation(() => ({ parsed: process.env }));

    const freshEnv = require('./env').env;

    expect(freshEnv.DB_HOST).toBe('db.example.com');
    expect(freshEnv.DB_PORT).toBe(6543);
    expect(freshEnv.DB_SSL).toBe(true);
    expect(freshEnv.PORT).toBe(8080);
    expect(freshEnv.JWT_SECRET).toBe('super_secret');
  });

  it('should call dotenv.config', () => {
    const dotenvSpy = jest.spyOn(dotenv, 'config');

    require('./env');

    expect(dotenvSpy).toHaveBeenCalled();
  });
});
