import React from "react";
import axios from 'axios'
import './productinfo.css'
import { Link, useParams } from "react-router-dom";

const ProductInfo = () => {
    const [products,setProducts] = React.useState("");
    const { id } = useParams();
    const fetch = async () => {
        try {
            const resp = await axios.get(`https://tahaandsonsserver.vercel.app/api/products/id/${id}`);
            setProducts(resp.data)

        } catch (error) {
            console.log(error.response);
        }
    }
    React.useEffect(()=>{
        fetch();
    },[id])
    return (
        <div className="productsInfo">
            <img src={products.img} height='250px' width='250px' />
            <h2>{products.name}</h2>
            <h3>{products.description}</h3>
            <h3>${products.price}</h3>
            <Link to='/' className="prodInfoBtn">back to home</Link>
            <Link to={`/cart/${products._id}`} className="prodInfoBtn">Add To Cart</Link>
        </div>
    )
}
export default ProductInfo;
