import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart = props.cart; 
    //  console.log(cart);

    let total = 0;
    for(let i = 0; i<cart.length;i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
        
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99
    }

    const tax = (total /10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num=> {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
           <h2>Order Summary</h2> 
           <h3>Items Ordered:{cart.length}</h3>
           <p>Product Price: {formatNumber(total)}</p>
           <p>Shipping Cost: {shipping}</p>
           <p><small>Tax + Vat: {tax}</small></p>
           <p>Total Price:{grandTotal}</p>
         {
             props.children
         }
           
        </div>
    );
};

export default Cart;