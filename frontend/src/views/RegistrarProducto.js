import React, { useState, useEffect } from 'react';
import { createProduct, fetchProducts } from '../services/api';
import '../styles/styles.css';

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
    } catch (error) {
      console.error('Error al registrar el producto:', error);
      alert('Hubo un error al registrar el producto');
    }
  };

  return (
    <div className="registrar-producto-container">
      <h1>Gestión de Productos</h1>

      <div className="registrar-producto-sections">
        {/* Search Section */}
        <section className="search-section">
          <h2>Buscar Producto</h2>
          <div className="form-group">
            <label htmlFor="search">Seleccionar Producto:</label>
            <select
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="product-select"
            >
              <option value="">-- Seleccione un Producto --</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.id} - {product.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSearch} className="search-button">Buscar</button>

          {searchResult && (
            <div className="search-result">
              <h3>Resultado de la Búsqueda:</h3>
              <p><strong>ID:</strong> {searchResult.id}</p>
              <p><strong>Nombre:</strong> {searchResult.name}</p>
              <p><strong>Descripción:</strong> {searchResult.description}</p>
              <p><strong>Precio:</strong> ${searchResult.price}</p>
              <p><strong>Cantidad:</strong> {searchResult.quantity}</p>
              {searchResult.imageUrl && (
                <p><strong>Imagen:</strong> <img src={searchResult.imageUrl} alt={searchResult.name} style={{ maxWidth: '200px' }} /></p>
              )}
            </div>
          )}
        </section>

        {/* Register Section */}
        <section className="register-section">
          <h2>Registrar Producto</h2>
          <form className="registrar-producto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="productId">ID del Producto:</label>
              <input type="text" id="productId" name="productId" placeholder="Ingrese el ID del producto" required />
            </div>
            <div className="form-group">
              <label htmlFor="productName">Nombre del Producto:</label>
              <input type="text" id="productName" name="productName" placeholder="Ingrese el nombre del producto" required />
            </div>
            <div className="form-group">
              <label htmlFor="productDescription">Descripción:</label>
              <input type="text" id="productDescription" name="productDescription" placeholder="Ingrese la descripción del producto" required />
            </div>
            <div className="form-group">
              <label htmlFor="productQuantity">Cantidad:</label>
              <input type="number" id="productQuantity" name="productQuantity" placeholder="Ingrese la cantidad disponible" required />
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Precio:</label>
              <input type="number" id="productPrice" name="productPrice" placeholder="Ingrese el precio del producto" required />
            </div>
            <div className="form-group">
              <label htmlFor="productImageUrl">URL de la Imagen (opcional):</label>
              <input type="text" id="productImageUrl" name="productImageUrl" placeholder="Ingrese la URL de la imagen" />
            </div>
            <button type="submit" className="submit-button">Registrar Producto</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default RegistrarProducto;