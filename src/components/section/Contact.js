import React, { Component } from 'react'
import '../css/Contact.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
export class Contact extends Component{
    render(){
        return(
            <div>
                <h1>About Us</h1>
                <p>Arumai is a pure-veg indian restaurant with many delicious food options. Our food spans multiple cuisines within indian including both North Indian and South Indian. Feel free to try our excellent food <Link to='/'><div id = "link">here</div></Link>
                </p>
            </div>
        )
    }
}