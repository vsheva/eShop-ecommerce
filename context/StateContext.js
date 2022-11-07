import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import product from '../sanity_ecommerce/schemas/product';

const context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quanty, setQuanty] = useState(1);

  let foundProduct;
  let index;

  const increaseQuantity = () => {
    setQuanty(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuanty(prev => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  const onAdd = (product, quantity) => {
    if (cartItems.find(item => item._id === product.id)) {
      setTotalPrice(prevPrice => prevPrice + quantity * product.price);
      setTotalQuantities(prevQuantities => prevQuantities + quantity);

      const updateCartItems = cartItems.map(cartProduct => {
        if (cartProduct._id === product.id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updateCartItems);
    } else {
      setTotalPrice(prevPrice => prevPrice + quantity * product.price);
      setTotalQuantities(prevQuantities => prevQuantities + quantity);

      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${quanty} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find(item => item._id === id);
    index = cartItems.findIndex(item => product._id === id);

    if (value === 'inc') {
      setCartItems([...cartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
      setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...cartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
      }
    }
  };

  return (
    <context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        quanty,
        toggleCartItemQuantity,
        onAdd,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useStateContext = () => useContext(context);
