import React, { useState, useEffect } from "react";
import './navbar.css'
import { Link } from 'react-router-dom';

const Navbar = ({ signStatus }) => {
  const [status, setStatus] = useState(false);
  const [slider, setSlider] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(signStatus);

  useEffect(() => {
    // This effect will run whenever signStatus changes
    setToggleStatus(signStatus);
  }, [signStatus]);

  return (
    <div className="navbar">
      <h2 className="navbarHeading">TAHA & SONS</h2>
      <ul className={toggleStatus ? "hideNavLinks" : "navbarLinks"}>
        <li><Link to="/" className="navbarAnchor">home</Link></li>
        <li><Link to="/about" className="navbarAnchor">about</Link></li>
        <li><Link to="/api/products" className="navbarAnchor">products</Link></li>
        <li><Link to="/contactinfo" className="navbarAnchor">contact us</Link></li>
        <li onClick={()=>{setSlider(!slider)}}>{status ? <Link to="/signin" className="navbarAnchor">signIn</Link> : <Link className="navbarAnchor">signed</Link> }</li>
      </ul>
      <div className={slider & !status ? 'signinBox' : 'signoutBox'}>
        <a onClick={()=>setStatus(true)}>Sign Out</a>
      </div>
      <button className="toggle" onClick={()=>setToggleStatus(!toggleStatus)}>|||</button>
    </div>
  )
}
export default Navbar;