import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './products.css';
import {PacmanLoader} from 'react-spinners';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [formInput, setFormInput] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [row,setRow]= useState(false);
    const [column,setColumn] = useState(false);
    const [advSearch,setAdvSearch] = useState(false);
    const [advSearchForm,setAdvSearchForm] = useState('');
    const [advCategory,setAdvCategory] = useState('');
    const [advCompany,setAdvCompany] = useState('');
    const [advColor,setAdvColor] = useState('');
    const [advPrice,setAdvPrice] = useState('');
    const [advShipping,setAdvShipping] = useState('');
    const [advClearFilter,setAdvClearFilter] = useState(false);

    const fetchData = async () => {
        try {
            const resp = await axios.get('http://localhost:5000/api/products');
            setLoading(false);
            return resp.data;
        } catch (error) {
            console.log('ERROR FROM FRONTEND PRODUCTS.JS');
            throw error;
        }
    };

    useEffect(() => {
        fetchData()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
  let newItems = [...products];

  if (formInput || advSearchForm || advCategory) {
    newItems = newItems.filter(
      (item) =>
        item.category === formInput ||
        item.category === advSearchForm ||
        item.category === advCategory
    );
  }

  if (advCompany) {
    console.log(advCompany);
    newItems = newItems.filter((item) => item.company === advCompany);
  }

  if (advColor) {
    newItems = newItems.filter((item) => item.color === advColor);
  }

  if (advPrice) {
    newItems = newItems.filter((item) => item.price <= advPrice);
  }

  if (advShipping) {
    newItems = newItems.filter((item) => item.shipping === advShipping);
  }

  setFilteredProducts(newItems);

  if (advClearFilter) {
    setAdvSearchForm('');
    setAdvCategory('');
    setAdvCompany('');
    setAdvColor('');
    setAdvPrice('');
    setAdvShipping('');
    setAdvClearFilter(false);
  }
}, [
  formInput,
  products,
  advSearchForm,
  advCategory,
  advCompany,
  advColor,
  advPrice,
  advShipping,
  advClearFilter,
]);

    return (
        <div className="productsMain">
            <div className="productsFilters">
                <form className="productsForm">
                    <input
                    style={{width:'230px'}}
                        placeholder="Search"
                        value={formInput}
                        onChange={(e) => setFormInput(e.target.value)}
                    />
                </form>
                <div className="section1">
                    <button className="advSearch" onClick={()=>setAdvSearch(true)}>Advanced Filter</button>
                </div>
                <div className="section">
                    <div className="decorLine"></div>
                    <button className="row" onClick={()=>{setRow(true)
                    setColumn(false)} }>|||</button>
                    <button className="column" onClick={()=>{setColumn(!column)
                    setRow(false)}}>---</button>
                </div>
            </div>
            {loading ? <div className="loader"><PacmanLoader color="rgb(196, 181, 61)" size='20px'/></div> :
            filteredProducts.length === 0 ? (
                <div style={{
                    textAlign:'center',
                    marginTop:'1rem'
                    }}>
                <p>NO PRODUCTS FOUND</p>
                </div>
            ) : (
                <div className={row & !column ? 'productsPageCol' : 'productspage'}>
                    {filteredProducts.map((item) => {
                        return (
                            <div key={item._id} className="productspageDiv">
                                <img src={item.img} height='150px' width='150px' alt={item.name} />
                                <h2><Link to={`/api/products/id/${item._id}`}>{item.name}</Link></h2>
                                <h3>{item.description}</h3>
                                <h3>{item.price}</h3>
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="advSearchPositioning">
                <div className={advSearch ? "greyBackground" : 'advSearchBoxNONE'}></div>
            <div className={advSearch ? 'advSearchBox' : 'advSearchBoxNONE'}>
                <button className="closeAdvSearch" onClick={()=>setAdvSearch(false)}>close</button>
                <form>
                    <input
                    placeholder="Search"
                    onChange={(e)=>setAdvSearchForm(e.target.value)}
                    style={{
                        width:'270px',
                        height:'25px',
                    }}
                    />
                </form>
                <article className="category">
                    Categories
                    <button className="categoryBtn" onClick={()=>setAdvCategory('sports')}>Sports</button>
                    <button className="categoryBtn" onClick={()=>setAdvCategory('outdoors')}>Outdoors</button>
                    <button className="categoryBtn" onClick={()=>setAdvCategory('indoors')}>Indoors</button>
                </article>
                <article className="company">
                    Company
                    <select name="company" onChange={(e)=>setAdvCompany(e.target.value)}>
                    <option value="Nike">Nike</option>
                    <option value="Addidas">Addidas</option>
                    <option value="Puma">Puma</option>
                    </select>
                </article>
                <article className="colorsSec">
                    All
                    <button className="red" onClick={()=>setAdvColor('red')}></button>
                    <button className="green" onClick={()=>setAdvColor('green')}></button>
                    <button className="purple" onClick={()=>setAdvColor('purple')}></button>
                    <button className="grey" onClick={()=>setAdvColor('grey')}></button>
                    <button className="yellow" onClick={()=>setAdvColor('yellow')}></button>
                </article>
                <article className="priceSec">
                    price ${advPrice}
                    <form>
                        <input 
                        type="range"
                        onChange={(e)=>setAdvPrice(e.target.value)}
                        min={100}
                        max={5000}
                        />
                    </form>
                </article>
                <article className="clrFilters">
                    <div>Free Shipping 
                        <input style={{marginLeft:'0.6rem'}} type="checkbox" onChange={()=>setAdvShipping(true)}/>
                    </div>
                    <button className="clearFilterBtn" onClick={()=>setAdvClearFilter(true)}>clear filters</button>
                </article>
            </div>
            </div>
        </div>
    );
};

export default Products;
