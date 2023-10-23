// CartContext.js

import { createContext, useReducer } from 'react';

export const CartContext = createContext();

const initialState = {
  cart: {}  
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.item._id]: action.item 
        }
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{...state, dispatch}}>{children}</CartContext.Provider>
  );
};