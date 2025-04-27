<<<<<<< HEAD
const BASE_URL = 'http://localhost:3000';

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error('Error en la petición');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
=======
const API_BASE_URL = 'http://localhost:3000/api';

export const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/productos');
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
  try {
    // Validate and preprocess orderData
    if (!orderData.customerId) {
      throw new Error('El campo customerId es obligatorio.');
    }

    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      throw new Error('La orden debe contener al menos un producto.');
    }

    // Ensure all items have valid productId, quantity, and price
    orderData.items = orderData.items.map((item) => {
      if (!item.productId) {
        throw new Error('Cada producto debe tener un productId válido.');
      }
      if (!item.quantity || item.quantity <= 0) {
        throw new Error('Cada producto debe tener una cantidad válida.');
      }
      if (!item.price || item.price < 0) {
        throw new Error('Cada producto debe tener un precio válido.');
      }
      return item;
    });

    // Calculate total if not provided
    if (!orderData.total || orderData.total <= 0) {
      orderData.total = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    const response = await fetch('http://localhost:3000/api/ordenes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Error al crear la orden de compra');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en createOrder:', error);
    throw error;
  }
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
  const response = await fetch('http://localhost:3000/api/productos', {
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

// Utility function to format numbers with thousand separators
export const formatNumberWithThousandSeparators = (number) => {
  return number.toLocaleString('es-ES');
>>>>>>> develop
};