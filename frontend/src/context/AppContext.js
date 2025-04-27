import React, { createContext, useState, useEffect, useMemo } from 'react';
import { fetchProducts, fetchOrders } from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const productsData = await fetchProducts();
        const ordersData = await fetchOrders();
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  const contextValue = useMemo(() => ({ products, orders, setProducts, setOrders }), [products, orders]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};