<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> master
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido al Frontend</h1>
    </div>
  );
};

<<<<<<< HEAD
export default Home;
=======
export default Home;
=======
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { fetchProducts } from '../services/api';
import { FaBox, FaShoppingCart } from 'react-icons/fa';
import '../styles/styles.css';

function Home() {
  return (
    <div className="home-container" style={{
      background: 'linear-gradient(to right, #4facfe, #00f2fe)',
      minHeight: '80vh', // Adjusted height to not cover the entire page
      width: '80%', // Added width to center the container
      margin: 'auto', // Center the container horizontally
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '10px', // Added border radius for a rounded look
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Added shadow for better visual separation
    }}>
      <header className="home-header" style={{ textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', color: '#000' }}>Bienvenido a la Gestión de Compras e Inventario</h1>
        <p>Seleccione una opción para continuar:</p>
      </header>

      <main className="home-main" style={{ marginTop: '20px' }}>
        <section className="banner" style={{ display: 'flex', gap: '20px' }}>
          <div className="banner-item">
            <button className="banner-button" style={{ padding: '10px 20px', borderRadius: '5px', background: '#fff', border: 'none', cursor: 'pointer' }}>
              <Link to="/registrar-producto" className="banner-link" style={{ textDecoration: 'none', color: '#4facfe', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaBox className="banner-icon" /> Registrar Producto
              </Link>
            </button>
          </div>
          <div className="banner-item">
            <button className="banner-button" style={{ padding: '10px 20px', borderRadius: '5px', background: '#fff', border: 'none', cursor: 'pointer' }}>
              <Link to="/registrar-orden" className="banner-link" style={{ textDecoration: 'none', color: '#4facfe', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaShoppingCart className="banner-icon" /> Generar Orden de Compra
              </Link>
            </button>
          </div>
        </section>
      </main>

      <footer className="home-footer" style={{ marginTop: '20px', color: '#fff', textAlign: 'center' }}>
        <p>© 2025 Gestión de Compras e Inventario. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;

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

export { OrderForm };

>>>>>>> develop
>>>>>>> master
