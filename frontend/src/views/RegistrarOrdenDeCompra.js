import React, { useContext, useEffect, useState } from 'react';
import '../styles/styles.css';
import { AppContext } from '../context/AppContext';
import { fetchProducts, createOrder } from '../services/api';
import { Grid, TextField, Select, MenuItem, Button, InputLabel, FormControl, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function RegistrarOrdenDeCompra() {
  const { products, setProducts } = useContext(AppContext);
  const [selectedProducts, setSelectedProducts] = useState([
    { id: null, name: '', quantity: 1, price: 0, iva: 0.19, total: 0 },
    { id: null, name: '', quantity: 1, price: 0, iva: 0.19, total: 0 },
  ]);
  const [subtotalSinIVA, setSubtotalSinIVA] = useState(0);
  const [totalGravadoConIVA, setTotalGravadoConIVA] = useState(0);
  const [totalNoGravadoConIVA, setTotalNoGravadoConIVA] = useState(0);
  const [totalIVA, setTotalIVA] = useState(0);
  const [valorTotalODC, setValorTotalODC] = useState(0);
  const [discount, setDiscount] = useState(0);

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

  useEffect(() => {
    const calculateTotals = () => {
      let subtotal = 0;
      let totalGravado = 0;
      let totalNoGravado = 0;
      let totalIVA = 0;

      selectedProducts.forEach((product) => {
        const productSubtotal = product.price * product.quantity;
        const productIVA = productSubtotal * product.iva;

        subtotal += productSubtotal;
        totalIVA += productIVA;

        if (product.iva > 0) {
          totalGravado += productSubtotal + productIVA;
        } else {
          totalNoGravado += productSubtotal;
        }
      });

      const discountValue = (subtotal + totalIVA) * (discount / 100);
      const totalWithDiscount = subtotal + totalIVA - discountValue;

      setSubtotalSinIVA(subtotal);
      setTotalGravadoConIVA(totalGravado);
      setTotalNoGravadoConIVA(totalNoGravado);
      setTotalIVA(totalIVA);
      setValorTotalODC(totalWithDiscount);
    };

    calculateTotals();
  }, [selectedProducts, discount]);

  const handleAddProduct = () => {
    setSelectedProducts((prev) => [
      ...prev,
      { id: null, name: '', quantity: 1, price: 0, iva: 0.19, total: 0 },
    ]);
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
            total: selectedProduct.price * updatedProducts[index].quantity * (1 + updatedProducts[index].iva),
          };
        }
      }

      if (field === 'quantity') {
        updatedProducts[index].total =
          updatedProducts[index].price * value * (1 + updatedProducts[index].iva);
      }

      return updatedProducts;
    });
  };

  const handleRemoveProduct = (index) => {
    setSelectedProducts((prev) => {
      if (prev.length > 1) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  };

  const handleCreateOrder = async () => {
    const orderData = {
      customerId: '12345', // Replace with actual customer ID
      items: selectedProducts.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
      discount,
      total: valorTotalODC,
    };

    console.log('Datos enviados al backend:', orderData);

    try {
      const response = await createOrder(orderData);
      console.log('Order created successfully:', response);
      alert('Orden de compra creada exitosamente');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al crear la orden de compra');
    }
  };

  return (
    <div className="page-container">
      <header>
        <Link to="/home" className="back-button">
          <FaArrowLeft /> Regresar al Home
        </Link>
      </header>

      <header className="page-header">
        <h1>Registrar Orden de Compra</h1>
      </header>

      <div className="product-section" style={{ maxHeight: '300px', overflowY: 'auto', padding: '16px', backgroundColor: '#f5f5f5 !important', borderRadius: '8px', marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '8px', color: '#888' }}>PRODUCTOS</h3>
        {selectedProducts.map((product, index) => (
          <Grid container spacing={1} alignItems="center" justifyContent="space-between" style={{ marginBottom: '16px' }} key={index} className="product-item">
            <Grid item xs={12} sm={12} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '300px', maxHeight: '56px' }}>
              <FormControl fullWidth>
                <InputLabel>Producto</InputLabel>
                <Select
                  value={product.id || ''}
                  onChange={(e) => handleProductChange(index, 'id', e.target.value)}
                  className="product-name-select"
                  style={{ height: '40px', display: 'flex', alignItems: 'center' }}
                >
                  <MenuItem value="" disabled>Producto</MenuItem>
                  {products.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={1} className="text-align-right" style={{ maxWidth: '120px' }}>
              <TextField
                type="number"
                label="Cantidad"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value, 10))}
                InputProps={{
                  style: { textAlign: 'right', backgroundColor: 'transparent' },
                  inputProps: { style: { textAlign: 'right', backgroundColor: 'transparent' } },
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={1} className="text-align-right" style={{ maxWidth: '120px' }}>
              <TextField
                label="% IVA"
                value={`${product.iva * 100}%`}
                InputProps={{
                  readOnly: true,
                  style: { textAlign: 'right', backgroundColor: 'transparent' },
                  inputProps: { style: { textAlign: 'right', backgroundColor: 'transparent' } },
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={1} className="text-align-right" style={{ maxWidth: '120px' }}>
              <TextField
                label="Valor unitario sin IVA"
                value={product.price}
                InputProps={{
                  readOnly: true,
                  style: { textAlign: 'right', backgroundColor: 'transparent' },
                  inputProps: { style: { textAlign: 'right', backgroundColor: 'transparent' } },
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={1} className="text-align-right" style={{ maxWidth: '120px' }}>
              <TextField
                label="Valor unitario con IVA"
                value={(product.price * (1 + product.iva)).toFixed(2)}
                InputProps={{
                  readOnly: true,
                  style: { textAlign: 'right', backgroundColor: 'transparent' },
                  inputProps: { style: { textAlign: 'right', backgroundColor: 'transparent' } },
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={0.8} className="text-align-right" style={{ maxWidth: '120px' }}>
              <TextField
                label="Valor total con IVA"
                value={product.total.toFixed(2)}
                InputProps={{
                  readOnly: true,
                  style: { textAlign: 'right', backgroundColor: 'transparent' },
                  inputProps: { style: { textAlign: 'right', backgroundColor: 'transparent' } },
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2} style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start' }}>
              <IconButton
                color="secondary"
                onClick={() => handleRemoveProduct(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </div>
      <Button
        variant="text"
        color="primary"
        onClick={handleAddProduct}
        startIcon={<AddIcon />}
        style={{ textTransform: 'none', color: '#6c757d', '&:hover': { color: '#495057' } }}
      >
        Agregar nuevo producto
      </Button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', marginTop: '16px' }}>
        <TextField
          label="Subtotal sin IVA"
          value={subtotalSinIVA.toFixed(3)}
          InputProps={{ readOnly: true, style: { textAlign: 'right' }, inputProps: { style: { textAlign: 'right' } } }}
        />
        <TextField
          label="Total gravado con IVA"
          value={totalGravadoConIVA.toFixed(3)}
          InputProps={{ readOnly: true, style: { textAlign: 'right' }, inputProps: { style: { textAlign: 'right' } } }}
        />
        <TextField
          label="Total no gravado con IVA"
          value={totalNoGravadoConIVA.toFixed(3)}
          InputProps={{ readOnly: true, style: { textAlign: 'right' }, inputProps: { style: { textAlign: 'right' } } }}
        />
        <TextField
          label="Total IVA"
          value={totalIVA.toFixed(3)}
          InputProps={{ readOnly: true, style: { textAlign: 'right' }, inputProps: { style: { textAlign: 'right' } } }}
        />
        <TextField
          label="Descuento"
          placeholder="Ingresar..."
          value={discount}
          onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
          InputProps={{
            style: { textAlign: 'right' },
            inputProps: { style: { textAlign: 'right' } },
            endAdornment: (
              <span style={{ backgroundColor: '#f0f0f0', padding: '0 4px', borderRadius: '4px' }}>%</span>
            ),
          }}
        />
        <TextField
          label="Valor total factura"
          value={valorTotalODC.toFixed(3)}
          InputProps={{ readOnly: true, style: { textAlign: 'right' }, inputProps: { style: { textAlign: 'right' } } }}
          style={{ border: '1px solid #9c27b0', borderRadius: '4px' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', padding: '16px', backgroundColor: 'transparent', borderRadius: '8px' }}>
        <div style={{ flex: 1, marginRight: '16px' }}>
          <h3 style={{ marginBottom: '8px', color: '#888' }}>OBSERVACIONES</h3>
          <TextField
            placeholder="Agregar observaciones..."
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '8px', color: '#888' }}>INFORMACIÓN DE FACTURACIÓN</h3>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <TextField
              label="Fecha facturación"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Forma de pago</InputLabel>
              <Select>
                <MenuItem value="">Seleccionar...</MenuItem>
                <MenuItem value="Efectivo">Efectivo</MenuItem>
                <MenuItem value="Transferencia">Transferencia</MenuItem>
                <MenuItem value="Tarjeta">Tarjeta</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            style={{ borderColor: '#007bff', color: '#007bff' }}
            onClick={handleCreateOrder}
          >
            Crear ODC
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegistrarOrdenDeCompra;

