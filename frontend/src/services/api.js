const API_BASE_URL = 'http://localhost:3000/api';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    console.log('Estado de la respuesta:', response.status);
    console.log('Encabezados de la respuesta:', response.headers);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const data = await response.json();
    console.log('Datos recibidos:', data);
    return data;
  } catch (error) {
    console.error('Error en fetchProducts:', error);
    throw error;
  }
};

export const fetchOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/ordenes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error al obtener las órdenes');
  }
  return response.json();
};

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/ordenes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Error al crear la orden');
  }
  return response.json();
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar el producto');
  }
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el producto');
  }
  return response.json();
};

export const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/test-connection`);
    if (!response.ok) {
      throw new Error('Error al probar la conexión');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en testConnection:', error);
    throw error;
  }
};

export async function createProduct(productData) {
  const response = await fetch(`${API_BASE_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error('Error al crear el producto');
  }

  return await response.json();
}