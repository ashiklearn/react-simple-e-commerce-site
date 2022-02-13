import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import happyImageGif from '../../images/giphy.gif';

import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Reviewitem from "../Reviewitem/Reviewitem";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced,setOrderPlaced] = useState(false);
const handlePlaceOrder = () => {
setCart([]);
setOrderPlaced(true);
    processOrder();
    console.log('Order Place');
}

  const removeProduct = (productkey) => {
    // console.log('remove clicked',productkey);
    const newCart = cart.filter((pd) => pd.key !== productkey);
    setCart(newCart);
    removeFromDatabaseCart(productkey);
  };
  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productkeys = Object.keys(saveCart);
    const cartProducts = productkeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = saveCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  let thankyou;
  if(orderPlaced){
thankyou =  <img src={happyImageGif} alt="" />
  } 
  return (
    <div className="twin-container">
      <div className="product-container">
        {
        cart.map(pd =>
          <Reviewitem
            key={pd.key}
            removeProduct={removeProduct}
            product={pd}
          ></Reviewitem>
        )
        }
        {
           thankyou
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handlePlaceOrder} className="review-button">Place Order</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
