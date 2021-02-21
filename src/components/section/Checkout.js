import React, {useState} from "react";
import ReactDOM from "react-dom"
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
const totalCost = JSON.parse(localStorage.getItem('totalCost'))
console.log(totalCost)
function Checkout() {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null)
  const createOrder = (data, actions) =>{
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalCost,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture()
    setPaidFor(true)
    console.log('ORDER', order)
  };
  const onError = (err) => {
    setError(err)
    console.error('ERROR', err)
  }
  if(paidFor){
      return(
          <h1>
              Thanks for making the purchase. If you have questions, visit the Additional Information page.
          </h1>
      )
  }
  if(error){
    return(
      <h1>There has been an error in proccessing your payment. Please try again later.</h1>
    )
  }
  return (
      <div style = {{textAlign:"center"}}>
          <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onError = {(err) => onError(err)}
    /> 
      </div>
  );
}
export default Checkout