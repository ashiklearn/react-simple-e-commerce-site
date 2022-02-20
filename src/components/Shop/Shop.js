import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import './Shop.css';
const Shop = () => {
    const firstData = fakeData.slice(0,20);
    const[products,setProducts] = useState(firstData);
// console.log(products);
    const [cart,setCart] = useState([]);
useEffect(() =>{
const saveCart = getDatabaseCart();
const productkeys = Object.keys(saveCart);
 const previousCart = productkeys.map(existingkey => {
     const product = fakeData.find(pd => pd.key=== existingkey);
     product.quantity =saveCart[existingkey];
     return product;
// console.log(existingkey,saveCart[existingkey]);
 })
 setCart(previousCart);
// console.log(previousCart);
},[])



    const addHandleProduct=(product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1;
        let newCart;
        if(sameProduct) {
             count = sameProduct.quantity + 1;
            sameProduct.quantity= count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others,sameProduct];
        }
        else{
            product.quantity =1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
   
//   console.log(firstData);  
    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    products.map(pd => <Product key={pd.key} showAddToCart={true} 
                        addHandleProduct ={addHandleProduct}product = {pd}></Product>)
                }
           
            </div>
         <div className='cart-container'>
             <Cart cart={cart}>
             <Link to="/review">
          <button className="review-button"> Review Order</button>
          </Link>
             </Cart>
         </div>
        </div>
    );
};

export default Shop;