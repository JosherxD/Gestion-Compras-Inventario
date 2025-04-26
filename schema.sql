-- Script para crear el modelo relacional para órdenes de compra

-- Tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL CHECK (precio_unitario > 0)
);

-- Tabla de órdenes
CREATE TABLE ordenes (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL CHECK (total >= 0)
);

-- Tabla de detalles de órdenes
CREATE TABLE purchase_order (
    id SERIAL PRIMARY KEY,
    orden_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    FOREIGN KEY (orden_id) REFERENCES ordenes (id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos (id)
);

-- Índices para optimización
CREATE INDEX idx_orden_id ON purchase_order (orden_id);
CREATE INDEX idx_producto_id ON purchase_order (producto_id);