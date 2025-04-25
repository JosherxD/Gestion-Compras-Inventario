// Archivo inicial para la capa de dominio
export const core = () => {
  console.log('Core module initialized');
};

export class Producto {
  id: number;
  nombre: string;
  precioUnitario: number;
}

export class DetalleOrden {
  id: number;
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

export class Orden {
  id: number;
  detalles: DetalleOrden[];
  total: number;
}