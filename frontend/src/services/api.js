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
};