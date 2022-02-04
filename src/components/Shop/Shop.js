import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    const firstData = fakeData.slice(0,10);
    const[products,setProducts] = useState(firstData);
console.log(products);
    const [cart,setCart] = useState([]);

    const addHandleProduct=(product) => {
    
        const newCart = [...cart,product];
        setCart(newCart);

    }
   
//   console.log(firstData);  
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(pd => <Product addHandleProduct ={addHandleProduct}product = {pd}></Product>)
                }
           
            </div>
         <div className='cart-container'>
             <Cart cart={cart}></Cart>
         </div>
        </div>
    );
};

export default Shop;