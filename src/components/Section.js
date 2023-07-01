import React, { Component } from 'react'
import Products from './section/Products'
import {Route} from 'react-router-dom'
import { Contact } from './section/Contact'
import Cart from './section/Cart'
import Success from './section/Success'
export class Section extends Component {
    render() {
        return(
            <section>
                <Route path="/" component={Products} exact/>
                <Route path="/products" component={Products} exact/>
                <Route path="/about-us" component={Contact}/> 
                <Route path = "/cart" component = {Cart} />
                <Route path = "/order-success" component = {Success} />
                <Route path = "/order-error" component = {Error} />

            </section>
        )
    }
}
export default Section