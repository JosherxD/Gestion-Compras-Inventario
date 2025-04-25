import mongoose from 'mongoose';
import { env } from '../../common/config/envs';
import { URL } from 'url';
import net from 'net';

class DatabaseConfig {
  private static instance: DatabaseConfig;

  private constructor() {

  }

  private validateMongoURI(uri: string): void {
    try {
      const parsedUrl = new URL(uri);
      if (parsedUrl.protocol !== 'mongodb:') {
        throw new Error('La URI de MongoDB debe comenzar con "mongodb://"');
      }
      if (!parsedUrl.hostname) {
        throw new Error('La URI de MongoDB debe contener un host válido');
      }
    } catch (error) {
      const parsedError = error as Error;
      throw new Error(`URI de MongoDB inválida: ${parsedError.message}`);
    }
  }

  private validateMongoPassword(password: string): void {
    if (!password || password.trim() === '') {
      throw new Error('La contraseña de MongoDB no puede estar vacía');
    }
  }

  private async isPortActive(host: string, port: number): Promise<boolean> {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      socket.setTimeout(5000); 

      socket.on('connect', () => {
        socket.destroy();
        resolve(true);
      });

      socket.on('timeout', () => {
        socket.destroy();
        resolve(false);
      });

      socket.on('error', () => {
        resolve(false);
      });

      socket.connect(port, host);
    });
  }

  public async connectToDatabase(): Promise<void> {
    try {
      const uri = env.MONGO_URI ?? 'mongodb://localhost:27017/DBCompras';
      const password = env.DB_PASSWORD;

      this.validateMongoURI(uri);
      this.validateMongoPassword(password);

      await mongoose.connect(uri, {});
      console.log('✅ Conexión exitosa a MongoDB: La base de datos está disponible y accesible.');
    } catch (error) {
      console.error('❌ Error al conectar a MongoDB:', error);
      process.exit(1);
    }
  }

  public async validateDatabaseConnection(): Promise<boolean> {
    try {
      const uri = env.MONGO_URI ?? 'mongodb://localhost:27017/DBCompras';
      this.validateMongoURI(uri);
      await mongoose.connect(uri, { connectTimeoutMS: 5000 }); 
      console.log('✅ Validación exitosa de la conexión a MongoDB');
      await mongoose.disconnect(); 
      return true;
    } catch (error) {
      console.error('❌ Error al validar la conexión a MongoDB:', error);
      return false;
    }
  }

  public async validatePortAndDatabaseConnection(): Promise<boolean> {
    const uri = env.MONGO_URI ?? 'mongodb://localhost:27017/DBCompras';
    const { hostname, port } = new URL(uri);

    const isPortActive = await this.isPortActive(hostname, parseInt(port, 10));
    if (!isPortActive) {
      console.error(`❌ El puerto ${port} en el host ${hostname} no está activo.`);
      return false;
    }

    console.log(`✅ El puerto ${port} en el host ${hostname} está activo.`);
    return this.validateDatabaseConnection();
  }

  public static getInstance(): DatabaseConfig {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new DatabaseConfig();
    }
    return DatabaseConfig.instance;
  }
}

const dbConfig = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  ssl: env.DB_SSL,
  pool: {
    max: env.DB_POOL_MAX,
    idleTimeoutMillis: env.DB_POOL_IDLE_TIMEOUT,
    connectionTimeoutMillis: env.DB_POOL_CONNECTION_TIMEOUT,
  },
};

export const db = DatabaseConfig.getInstance();