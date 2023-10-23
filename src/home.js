import React, {useRef} from "react";
import axios from 'axios'
import { Route, Link, useNavigate } from "react-router-dom";
import ProductInfo from "./productinfo";
import './home.css'
import {PacmanLoader} from 'react-spinners';
import { GiCompass, GiMining } from "react-icons/gi";
import { BsNewspaper } from "react-icons/bs";
import emailjs from '@emailjs/browser';
const Home = () => {
    const navigate = useNavigate();
    const [products,setProducts] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const [message,setMessage] = React.useState('For Daily Updates');
    const [onChange,setOnChange] = React.useState('');
      const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_97ysktc', 'template_tr1ag88', form.current, 'nRV9hMiuGYB0B2Pbi')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
    const fetch = async () => {
        try {
            const {data} = await axios.get('https://tahaandsonsserver.vercel.app/api/products');
            setProducts(data.slice(0, 6));
            setLoading(false);
        } 
        catch (error) {
            console.log('ERROR FROM FRONTEND HOME.JS')
        }
    }
    React.useEffect(()=>{
        fetch();
    },[])
    return(
        <div className="home">
        <section className="mainCont">
          <h2>choose your desired furniture</h2>
          <button onClick={() => navigate("/api/products")} className="glow-on-hover">
            shop now
          </button>
      </section>
      {loading ? <div className="loader"><PacmanLoader color="rgb(196, 181, 61)" size='20px'/></div> :
        <div className="homepage">
            {products.map((items)=> {
                return (
                    <div key={items._id} className="homepageDiv">
                        <img src={items.img} height='150px' width='150px'/>
                        <h2><Link to={`/api/products/id/${items._id}`}>{items.name}</Link></h2>
                        <h3>{items.description}</h3>
                        <h3>{items.price}</h3>
                    </div>
                )
            })}
            <section>
        <div className="mission">
          <GiCompass
            style={{
              fontSize: "4rem",
              color: "rgb(145, 143, 88)",
            }}
          />
          <h2>Mission</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit
            autem unde numquam nisi
          </p>
        </div>
        <div className="vision">
          <GiMining
            style={{
              fontSize: "4rem",
              color: "rgb(145, 143, 88)",
            }}
          />
          <h2>Vision</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit
            autem unde numquam nisi
          </p>
        </div>
        <div className="history">
          <BsNewspaper
            style={{
              fontSize: "4rem",
              color: "rgb(145, 143, 88)",
            }}
          />
          <h2>History</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit
            autem unde numquam nisi
          </p>
        </div>
      </section>
      {/* <section className="EmailContact">
        <h3>For Daily Updates</h3>
        <form style={{
            marginTop:'0.4rem'
        }}>
            Email:
            <input 
            style={{
                marginLeft:'0.2rem',
                width:'260px',
                height:'23px',
            }}
            placeholder="Email"
            onChange={(e)=>setEmailInfo(e.target.value)}

            />
        </form>
      </section> */}
      <section className="EmailContact">
        <form style={{
          display:'flex',
          flexDirection:'column',
        }} ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea onChange={(e)=>setOnChange(e.target.value)} name="message" />
      <input onClick={()=>{
        if(onChange) {
          setMessage('ALL GOOD')
        }
      }} type="submit" value="Send" />
    </form>
    <h3 style={{
      marginBottom:'0.5rem',
    }}>{message}</h3>
      </section>
        </div>}
        </div>
    )
}
export default Home;
