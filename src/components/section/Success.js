import React from "react";


function Success () {
  
  localStorage.setItem('paid', 'true')
  localStorage.setItem('dataCart', [])

    return (
      <div style = {{textAlign:"center"}}>
        <h1>Your order has been processed successfully!</h1>
      </div>
    );
  }
export default Success