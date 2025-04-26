import React, { useContext, useEffect, useState } from 'react';
import '../styles/styles.css';
import { AppContext } from '../context/AppContext';
import { fetchProducts } from '../services/api';

function RegistrarOrdenDeCompra() {
  const { products, setProducts } = useContext(AppContext);
  const [searchResult, setSearchResult] = useState(null);

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
  }, [setProducts]);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Lista de Productos</h1>
      </header>

      <div className="product-selector">
        <label htmlFor="product-select">Seleccionar Producto por ID:</label>
        <select
          id="product-select"
          onChange={(e) => {
            const selectedProduct = products.find(
              (product) => product.id === parseInt(e.target.value, 10)
            );
            setSearchResult(selectedProduct || null);
          }}
        >
          <option value="">-- Seleccione un Producto --</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.id} - {product.name}
            </option>
          ))}
        </select>
      </div>

      {searchResult ? (
        <section className="product-details">
          <h2>Detalles del Producto</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{searchResult.id}</td>
                <td>{searchResult.name}</td>
                <td>{searchResult.description}</td>
                <td>{searchResult.quantity}</td>
                <td>{searchResult.price}</td>
                <td>
                  {searchResult.imageUrl ? (
                    <img src={searchResult.imageUrl} alt={searchResult.name} />
                  ) : (
                    'No disponible'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      ) : (
        <section className="product-section">
          <h2>Todos los Productos</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      'No disponible'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

function OrderForm() {
  const { products, setProducts } = useContext(AppContext);
  const [selectedProducts, setSelectedProducts] = useState([]);

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
  }, [setProducts]);

  const handleAddProduct = () => {
    setSelectedProducts((prev) => [...prev, { id: null, name: '', quantity: 1, price: 0, description: '', available: false }]);
  };

  const handleProductChange = (index, field, value) => {
    setSelectedProducts((prev) => {
      const updatedProducts = [...prev];
      updatedProducts[index][field] = value;

      if (field === 'id') {
        const selectedProduct = products.find((p) => p.id === parseInt(value, 10));
        if (selectedProduct) {
          updatedProducts[index] = {
            ...updatedProducts[index],
            name: selectedProduct.name,
            price: selectedProduct.price,
            description: selectedProduct.description,
            available: true,
          };
        }
      }

      return updatedProducts;
    });
  };

  const handleRemoveProduct = (index) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="order-form">
      <h2>Registrar Orden de Compra</h2>

      <div className="product-section">
        <h3>Productos</h3>
        {selectedProducts.map((product, index) => (
          <div key={index} className="product-item">
            <label>Nombre:</label>
            <select
              value={product.id || ''}
              onChange={(e) => handleProductChange(index, 'id', e.target.value)}
              className="product-name-select"
            >
              <option value="">-- Seleccione un Producto --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {product.available && (
              <>
                <label>Descripción:</label>
                <input
                  type="text"
                  value={product.description}
                  readOnly
                  className="product-description-input"
                />
                <label>Cantidad:</label>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value, 10))}
                  className="product-quantity-input"
                />
                <label>Precio:</label>
                <input
                  type="number"
                  value={product.price}
                  readOnly
                  className="product-price-input"
                />
              </>
            )}

            <button onClick={() => handleRemoveProduct(index)} className="remove-product-button">
              Eliminar
            </button>
          </div>
        ))}
        <button onClick={handleAddProduct} className="add-product-button">
          + Agregar nuevo producto
        </button>
      </div>
    </div>
  );
}

export default RegistrarOrdenDeCompra;
export { OrderForm };

