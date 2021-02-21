import React, {Component} from 'react'
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import '../css/Details.css'
import '../css/Cart.css'
class Cart extends Component{
    static contextType = DataContext;
    componentDidMount(){
        this.context.getTotal();
    }
    render(){
        const {cart, increase, reduction, removeProduct, total} = this.context;
        const tax = ((total * 8.25)/100);
        localStorage.setItem('totalCost', (total+tax).toFixed(2));
        const totalDisplayCost = JSON.parse(localStorage.getItem('totalCost'))
        if(cart.length === 0){
            return <h2 style={{textAlign:"center"}}>There are currently no items in cart</h2>
        } else{
        return(
            <>
                {
                    cart.map(item => (
                        <div className="details cart" key={item._id}>
                            <img src={item.src} alt=""/>
                            <div className="box">
                                <div className="row">
                                    <h2>{item.title}</h2>
                                    <span className="price">Price: ${(item.price * item.count).toFixed(2)}</span>
                                </div>
                                <div className="amount">
                                    <button className="count" onClick={() => reduction(item._id)}>-</button>
                                    <span>{item.count}</span>
                                    <button className="count" onClick={() =>increase(item._id)}>+</button>
                                </div>
                                <div className="delete" onClick ={()=>removeProduct(item._id)}>
                                <br></br>
                                <br></br>
                                    <button className="cart">
                                        Remove from Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            <div className="total">
               <h2 className = "subtotal">Subtotal: ${total.toFixed(2)}</h2> 
               <h2 className = "tax">Tax: ${tax.toFixed(2)}</h2>
               <h2 className="totals">Total: ${totalDisplayCost}</h2>
               <br></br>
               <Link to = "/checkout">Checkout</Link>
            </div>            
                </>
            )
        }
    }
}
export default Cart
