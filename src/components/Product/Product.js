import React from 'react';
import './Product.css';
import { BsFillCartPlusFill } from "react-icons/bs";

const Product = (props) => {
    // console.log(props);
    const {img,name,seller,price,stock} = props.product
    return (
        <div className='product'>
            <div>
                 <img src={img} alt="" />
            </div>
            <div>
            <h4 className='product-name'>{name}</h4>
            <br />
            <p><small>By:{seller}</small></p>
            <p>Price:Tk. {price}</p>
            <p><small>Only: {stock} left in stock- order soon</small></p>

            <button className='cart-button' onClick={()=> props.addHandleProduct(props.product)}><BsFillCartPlusFill/>add to cart</button>
            
            </div>

           
          
        </div>
    );
};

export default Product;