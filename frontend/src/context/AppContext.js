<<<<<<< HEAD
import React, { createContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
=======
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
>>>>>>> develop
