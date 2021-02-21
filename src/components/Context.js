import React, { Component } from 'react'
export const DataContext = React.createContext();
export class DataProvider extends Component{
    state = {
        products:[
            {
            "_id":"1",
            "title": "Vada Pav",
            "src":"https://www.thespruceeats.com/thmb/XDWIAuDFfHo4oNpM5M9dPYsn4nI=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vadapav-56ac12145f9b58b7d00a409e.jpg",
            "description":"This is what a Vada Pav looks like",           
            "price": 3.49,
            "count":1 
            },
            {
                "_id":"2",
                "title": "Pav Bhaji",
                "src":"https://pipingpotcurry.com/wp-content/uploads/2017/04/Pav-Bhaji-Recipe-in-Instant-Pot.-Stovetop.jpg",
                "description":"This what Pav Bhaji looks like",
                "price": 8.99,
                "count":1 
            },
            {
                "_id":"3",
                "title": "Misal Pav",
                "src": "https://3.bp.blogspot.com/-M7hTCRmQsbk/XAI2jN4oW0I/AAAAAAAAOjA/wxOm7NtOqWQMTWE5WX-FceX1SI5HSF9YgCLcBGAs/s1600/Misal_Pav_6.jpg",
                "description":"This is what Misal Pav looks like",
                "price": 8.99,
                "count":1 
            }
        ],
        cart: [],
        total:0        
    };
    addCart = (id)=>{
        const {products, cart} = this.state;
        const check = cart.every(item=>{
            return item._id !== id;
        })
        if(check){
            const data = products.filter(product => {
                return product._id === id
            })
            this.setState({cart: [...cart, ...data]})
        }else{
            alert("This item is already in the cart")
        }
    }
    reduction = id=>{
        const {cart} = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart:cart})
        this.getTotal();
    };
    increase = id=>{
        const {cart} = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count +=1;
            }
        })
        this.setState({cart:cart})
        this.getTotal()
    };
    removeProduct = id => {
        const {cart} = this.state;
        cart.forEach((item, index) => {
           if(item._id === id){
               cart.splice(index, 1)
           }
        })
        this.setState({cart:cart})
        this.getTotal();
    };
    getTotal = ()=>{
        const {cart} = this.state;
        const res = cart.reduce((prev, item) =>{
            return prev + (item.price * item.count)
        },0)
        this.setState({total: res})
    };
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))

    };
    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }        
        render() {
            const {products, cart, total} = this.state;
            const {addCart, reduction, increase, removeProduct, getTotal} = this;
            return(
            <DataContext.Provider value={{products, addCart, cart, reduction, increase, removeProduct, total, getTotal}}>
                {this.props.children}
            </DataContext.Provider>
            )
        }
    }