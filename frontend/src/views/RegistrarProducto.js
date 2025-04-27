import React, { useState, useEffect } from 'react';
import { createProduct, fetchProducts } from '../services/api';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Select from 'react-select';
import '../styles/styles.css';

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '8px',
    borderColor: '#007bff',
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
    '&:hover': {
      borderColor: '#0056b3',
    },
    padding: '5px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#e9f7ff' : '#fff',
    color: state.isSelected ? '#fff' : '#333',
    fontSize: '16px',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: state.isSelected ? 'bold' : 'normal',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    '&:hover': {
      backgroundColor: '#f0f8ff',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '5px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#007bff',
    fontWeight: 'bold',
    fontFamily: 'Roboto, sans-serif',
  }),
};

function RegistrarProducto() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    loadProducts();
  }, []);

  const handleSearch = () => {
    const selectedProduct = products.find((product) => product.id === parseInt(searchTerm, 10));
    if (selectedProduct) {
      setSearchResult(selectedProduct);
    } else {
      alert('Producto no encontrado');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      id: e.target.productId.value,
      name: e.target.productName.value,
      description: e.target.productDescription.value,
      quantity: parseInt(e.target.productQuantity.value, 10),
      price: parseFloat(e.target.productPrice.value),
      imageUrl: e.target.productImageUrl.value || '',
    };

    try {
      await createProduct(productData);
      alert('Producto registrado con éxito');
      window.location.reload(); // Recargar la página después de registrar el producto
    } catch (error) {
      if (error.response && error.response.json) {
        const errorData = await error.response.json();
        alert(`Error: ${errorData.error || 'Ocurrió un error inesperado'}`);
      } else {
        alert('Hubo un error al registrar el producto');
      }
      console.error('Error al registrar el producto:', error);
    }
  };

  return (
    <div className="registrar-producto-container">
      <header>
        <Link to="/home" className="back-button">
          <FaArrowLeft /> Regresar al Home
        </Link>
      </header>

      <h1>Gestión de Productos</h1>

      <div className="registrar-producto-sections">
        {/* Search Section */}
        <section className="search-section">
          <h2>Buscar Producto</h2>
          <div className="form-group">
            <label htmlFor="search">Seleccionar Producto:</label>
            <Select
              id="search"
              options={products.map((product) => ({
                value: product.id,
                label: `ID: ${product.id} - ${product.name}`,
              }))}
              getOptionLabel={(e) => e.label} // Asegurar que el formato sea consistente
              onChange={(selectedOption) => setSearchTerm(selectedOption?.value || '')}
              className="product-select"
              styles={customStyles} // Aplicar estilos personalizados
            />
          </div>
          <button onClick={handleSearch} className="search-button">Buscar</button>

          {searchResult && (
            <div className="search-result">
              <h3>Resultado de la Búsqueda:</h3>
              <table className="search-result-table">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{searchResult.id}</td>
                  </tr>
                  <tr>
                    <th>Nombre</th>
                    <td>{searchResult.name}</td>
                  </tr>
                  <tr>
                    <th>Descripción</th>
                    <td>{searchResult.description}</td>
                  </tr>
                  <tr>
                    <th>Precio</th>
                    <td>${searchResult.price}</td>
                  </tr>
                  <tr>
                    <th>Cantidad</th>
                    <td>{searchResult.quantity}</td>
                  </tr>
                  {searchResult.imageUrl && (
                    <tr>
                      <th>Imagen</th>
                      <td><img src={searchResult.imageUrl} alt={searchResult.name} style={{ maxWidth: '200px', borderRadius: '8px' }} /></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Register Section */}
        <section className="register-section">
          <h2>Registrar Producto</h2>
          <form className="registrar-producto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="productId">ID del Producto:</label>
              <input
                type="text"
                id="productId"
                name="productId"
                placeholder="Ingrese el ID del producto"
                required
                style={{ backgroundColor: 'transparent', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productName">Nombre del Producto:</label>
              <input
                type="text"
                id="productName"
                name="productName"
                placeholder="Ingrese el nombre del producto"
                required
                style={{ backgroundColor: 'transparent', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productDescription">Descripción:</label>
              <input
                type="text"
                id="productDescription"
                name="productDescription"
                placeholder="Ingrese la descripción del producto"
                required
                style={{ backgroundColor: 'transparent', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productQuantity">Cantidad:</label>
              <input
                type="number"
                id="productQuantity"
                name="productQuantity"
                placeholder="Ingrese la cantidad disponible"
                required
                style={{ backgroundColor: 'transparent', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Precio:</label>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                placeholder="Ingrese el precio del producto"
                required
                style={{ backgroundColor: 'transparent', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productImageUrl">URL de la Imagen (opcional):</label>
              <input
                type="text"
                id="productImageUrl"
                name="productImageUrl"
                placeholder="Ingrese la URL de la imagen"
                style={{ backgroundColor: 'transparent', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
              />
            </div>
            <button type="submit" className="submit-button">Registrar Producto</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default RegistrarProducto;