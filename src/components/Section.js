import React, { Component } from 'react'
import Products from './section/Products'
import {Route} from 'react-router-dom'
import { Contact } from './section/Contact'
import Cart from './section/Cart'
import Checkout from './section/Checkout'
export class Section extends Component {
    render() {
        return(
            <section>
                <Route path="/" component={Products} exact/>
                <Route path="/products" component={Products} exact/>
                <Route path="/about-us" component={Contact}/> 
                <Route path = "/cart" component = {Cart} />
                <Route path = "/checkout" component = {Checkout} />
            </section>
        )
    }
}
export default Section