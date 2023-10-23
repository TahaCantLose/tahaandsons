import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sign, setSign] = useState(false);
    const [error, setError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("https://tahaandsonsserver.vercel.app/api/signup", { email, password });
          setError(response.data);
           if (response.status === 200) {
            setError(response.data);
            }
            if (response.status === 201) {
                setError(response.data);
                setSign(true);
            }
        } catch (error) {
          console.log(error.response)
        }
      };

return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '250px',
            fontFamily: 'Open Sans, sans-serif'
        }}>
        {/* <Navbar sign={sign} /> */}
        <form
          style={{
            paddingBottom: "0.5rem",
          }}
        >
          Email:
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="Enter Email"
          ></input>
        </form>
        <form
          style={{
            paddingBottom: "0.5rem",
          }}
        >
          Password:
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Enter Password"
          ></input>
        </form>
                    {error && (
                <div style={{ padding: '0.3rem' , color: "red" }}>{error}</div>
                
            )}
        <button onClick={submitHandler} type="submit">
          Create Your Account
        </button>
        {error && (<div><Link to={'/'}>Back To Home</Link></div>)}
        <div
          style={{
            paddingTop: "0.5rem",
          }}
        >
        </div>
        </div>
)};
export default SignUp;
