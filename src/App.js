import React from "react";
import {Routes, Route} from 'react-router-dom';
import Navbar from "./navbar";
import Home from "./home";
import About from "./about";
import Products from "./products";
import ContactUs from "./contactUs";
import ProductInfo from "./productinfo";
import Cart from "./cart";
import SignIn from "./signin";
import SignUp from "./signup";
import Checkout from "./checkout";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactinfo" element={<ContactUs />}/>
         <Route path="/api/products" element={<Products />}/>
          <Route path="/api/products/id/:id" element={<ProductInfo />} />
          <Route path="/cart/:cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout/:checkout" element={<Checkout />} />
      </Routes>
      <footer className="footer">Taha & Sons. All Rights Reserved</footer>
    </React.Fragment>
  );
}

export default App;
