import React from "react";
import { useParams } from "react-router-dom";

const Checkout = () => {
    const {checkout} = useParams();
    const [message,setMessage] = React.useState(''); 
    React.useEffect(()=>{
        const timer = setTimeout(()=>{
            setMessage('');
        },2000)
        return () => clearTimeout(timer);
    },[message])
    return (
        <div style={{
            fontFamily: 'Open Sans, sans-serif',
            height:'200px',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
        }}>
            <h2>Price: ${checkout}</h2>
            <button style={{
                marginBottom:'1rem',
                marginTop:'1rem',
            }}
            onClick={()=>setMessage('Order Placed')}
            >Cash On Delivery</button>
            <button style={{
                marginBottom:'1rem',
            }}
            onClick={()=>setMessage('Feature Not Available Yet')}
            >Payment By Card</button>
            <h3>{message}</h3>
        </div>
    )
}
export default Checkout;