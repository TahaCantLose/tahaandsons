import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signStatus, setSignStatus] = useState(
    JSON.parse(localStorage.getItem("signStatus"))
  );
    const signFunc = (signInfo) => {
    localStorage.setItem("signStatus", signInfo);
    setSignStatus(signInfo);
  }
  useEffect(() => {
    signFunc(false);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tahaandsonsserver.vercel.app/api/users', {
        email,
        password,
      });
       if (response.status === 200) {
        signFunc(true)
        // navigate('/');
        window.location.reload(navigate('/'))
            }
            if (response.status === 201) {
                setError(response.data);
            }
        } catch (error) {
          console.log(error)
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
      }}
    > <div style={{display: 'none'}}>
        <Navbar signStatus={signStatus} />
    </div>
        <form onSubmit={submitHandler} style={{
           textAlign: 'center'
        }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor='email'>Email: </label>
          <input
            id='email'
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor='password'>Password: </label>
          <input
            id='password'
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Sign In</button>
      </form>
      {error && 
        <div style={{ marginTop: '1rem', color: 'red' }}>{error}</div>}
      <div style={{ marginTop: '1rem' }}>
        New Customer? <Link to={'/signup'}>Create your account</Link>
      </div>
    </div>
  );
};

export default SignIn;
