import React, { useState, useEffect, useContext } from "react";
import "../css/Details.css";
import "../css/Cart.css"
import {DataContext} from '../Context'
import add from "../svg/add.svg"
import subtract from "../svg/subtraction.png"
const ProductDisplay = () => {
  
  const value = useContext(DataContext)
  const {cart, increase, reduction, removeProduct, total} = value;
  const tax = ((total * 8.25)/100);
  localStorage.setItem('totalCost', (total+tax).toFixed(2));
  const totalDisplayCost = JSON.parse(localStorage.getItem('totalCost'))
  if(cart.length === 0){
    return <h2 style={{textAlign:"center"}}>There are currently no items in cart</h2>
  } else{
    return (
      <>
      {
        cart.map(item => (
          <div className="all_prods">
          <div className="product">
            <img
              src={item.src}
            />
            <div className="description">
            <h3>{item.title}</h3>
            <h5>${item.price}</h5>
            </div>
          </div>
          <div className="amount">
              <button className="count" onClick={() => reduction(item._id)}>
                <img src={subtract} width={20} height={21.5}></img>
              </button>
                  <span>{item.count}</span>
              <button className="count" onClick={() =>increase(item._id)}>
                  <img src={add} height={20} width={20} />
              </button>
         </div>
            <div className="delete" onClick = {() => removeProduct(item._id)}>
              <button className="cart">
               Remove from Cart
              </button>
            </div>
            </div>
        ))
      }
    
      </>
)}};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}