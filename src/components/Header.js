import React, { Component } from 'react'
import Menu from './svg/bars-solid.svg'
import Close from './svg/times-solid.svg'
import Cart from './svg/shopping-cart-solid.svg'
import {Link} from 'react-router-dom'
import './css/Header.css'
import { DataContext } from './Context';


export class Header extends Component {
    static contextType = DataContext;

    state = {
        toggle:false
    }

    menuToggle = () => {
        this.setState({toggle:!this.state.toggle})
    }
    
    
    render() {
        const {toggle} = this.state;
        const {cart} = this.context;
        var sum = 0
        cart.forEach((product) => {
            sum += product.count
        })
        return(
            <header>
                <div className="menu" onClick={this.menuToggle}>
                    <img src = {Menu} width="20" alt=""/>
                    </div>
                    <div className="logo">
                        <h1><Link to="/"><img src = "https://logos.textgiraffe.com/logos/logo-name/22420010-designstyle-balance-l.png" alt = ""/></Link></h1>
                    </div>
                <nav>
                    <ul className={toggle ? "toggle" : ""}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li className="close" onClick={this.menuToggle}>
                            <img src={Close} width="20" alt=""/>
                        </li>
                    </ul>           
                    <div className = "nav-cart">
                        <span>{sum}</span>
                        <Link to="/cart">
                            <img src ={Cart} alt="" width = "20"/>
                        </Link>
                    </div>
                </nav>
            </header>
        )
    }
}
export default Header