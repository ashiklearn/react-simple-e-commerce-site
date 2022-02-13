import React from 'react';
import './Reviewitem.css';
const Reviewitem = (props) => {
    // console.log(props);
    const {name,quantity,key,price}= props.product;
    return (
        <div className="remove-product">
            <h4>{name}</h4>
            <p> Quantity: {quantity}</p>
            <p><small>Tk.{price}</small></p>
            
            <button onClick={() => props.removeProduct(key)}>Remove</button>
           
        </div>
    );
};

export default Reviewitem;