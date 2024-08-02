import React, { useState, useEffect, useContext } from "react";
import "../css/Details.css";
import "../css/Cart.css"
import {DataContext} from '../Context'
import add from "../svg/add.svg"
import subtract from "../svg/subtraction.png"
import trash from "../svg/trash-bin.svg"
import axios from "axios";
function ProductDisplay(){

  const value = useContext(DataContext)
  const {cart, increase, reduction, removeProduct, total} = value;
  const tax = ((total * 8.25)/100);
  localStorage.setItem('totalCost', ((Number(total)+Number(tax)).toFixed(2)));
  localStorage.setItem('paid', 'false')

  const cart_object = {
    cart:cart,
    total: total
  }


  function handleSubmit(event) {
    event.preventDefault()
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post('http://192.168.1.169:4242/create-checkout-session', cart_object)
    .then(response => {
      console.log(response);
      window.location.assign(response.data)
  })
    .catch(error => console.error(error))
  }



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
              src={item.src} alt=""
            />
            <div className="description">
            <h3>{item.title}</h3>
            <h5>${item.price}</h5>
            </div>
          </div>
          <div className="amount">
              <button className="count" onClick={() => reduction(item._id)}>
                <img src={subtract} width={20} height={21.5} alt=""></img>
              </button>
                  <span>{item.count}</span>
              <button className="count" onClick={() =>increase(item._id)}>
                  <img src={add} height={20} width={20} alt=""/>
              </button>
         </div>
            <div className="delete" onClick = {() => removeProduct(item._id)}>
              <button className="cart">
                <img src = { trash } width={30} height={30} alt=""/>
              </button>
            </div>
            </div>
        ))}
        <button className="submit" onClick={handleSubmit}>Checkout: ${Number(total).toFixed(2)}</button>
      </>
        
)}};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Cart() {
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