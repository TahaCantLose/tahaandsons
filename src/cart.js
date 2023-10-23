import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Checkout from './checkout';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [prevCart, setPrevCart] = useState(null);
  const { cart } = useParams();
  const navigate = useNavigate();
  const prevCartRef = useRef();
  const removeFromCart = (item) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find((i) => i._id === item._id);
    if (existingItem.quantity > 1) {
      // Decrease the quantity of the existing item
      existingItem.quantity -= 1;
    } else {
      // Remove the item from the cart
      prevItems = prevItems.filter((i) => i._id !== item._id);
    }
    localStorage.setItem('cartItems', JSON.stringify(prevItems));
    return [...prevItems];
  });
};
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems && savedCartItems !== 'undefined') {
      setCartItems(JSON.parse(savedCartItems));
    }
    const fetch = async () => {
      try {
        const resp = await axios.get(`https://tahaandsonsserver.vercel.app/${cart}`);
        const newItem = resp.data;

        setCartItems((prevItems) => {
          const existingItem = prevItems.find((item) => item._id === newItem._id);
          if (existingItem && cart !== prevCartRef.current) {
            // Increase the quantity of the existing item
            existingItem.quantity += 1;
            prevCartRef.current = cart;
          } else if (!existingItem) {
            // Add the new item to the cart
            const newItems = [...prevItems, { ...newItem, quantity: 1 }];
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            return newItems;
          }
          localStorage.setItem('cartItems', JSON.stringify(prevItems));
          return [...prevItems];
        });
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetch();
  }, [cart]);
const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2 style={{
        fontFamily: 'Open Sans, sans-serif',
      }}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
  <section
    key={item._id}
    style={{
      fontFamily: 'Open Sans, sans-serif',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
  >
    <img src={item.img} height="100px" width="100px" />
    - {item.name} - {item.price}
    <input type="number" min="0" max="10" value={item.quantity} readOnly />
    <span>{item.price * item.quantity}</span>
    <button onClick={() => removeFromCart(item)}>Remove</button>
  </section>
))}
<div style={{
  fontFamily: 'Open Sans, sans-serif',
  textAlign:'right',
 }}>
 <h3>Total: {totalPrice}</h3>
 <button onClick={()=>navigate(`/checkout/${totalPrice}`)}>Checkout</button>
 </div>
        </ul>
      )}
    </div>
  );
};

export default CartScreen;
