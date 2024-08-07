import React, { Component } from 'react'

export const DataContext = React.createContext();
export class DataProvider extends Component{
    state = {
        products:[
            {
            "_id":"price_1MueYDJo31NhKOMDYhEtCrQ2",
            "title": "Sambar",
            "src":"https://t4.ftcdn.net/jpg/00/53/84/51/240_F_53845173_DcSSmXY3vo6KEBRRMA7IfAkYQLBSIt7M.jpg",
            "price": 8.99,
            "count":1 
            },
            {
                "_id":"price_1Mum0EJo31NhKOMDzHjKKC5b",
                "title": "Masala Dosa",
                "src":"https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/masala-dosa-recipe-1.jpg",
                "price": 8.99,
                "count":1 
            },
            {
                "_id":"price_1NSk2JJo31NhKOMDnADTOvAz",
                "title": "Idli",
                "src": "https://shwetainthekitchen.com/wp-content/uploads/2022/01/Idli.jpg",
                "price": 8.99,
                "count":1 
            }
        ],
        cart: [],
        total:0        
    };
    addCart = (id)=>{
        const {products, cart, total} = this.state;
        const check = cart.every(item=>{
            return item._id !== id;
        })
        const data = products.filter(product => {
            return product._id === id
        })
        if(check){
           
            this.setState({cart: [...cart, ...data], total: ((Number(total)+data[0].price).toFixed(2))})
            alert(data[0].title + " has been added to the cart")
        }else{
            this.increase(id)
            alert(data[0].title + " has been added to the cart")

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
            if(item._id === id && item.count <=9){
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
    if(localStorage.getItem('paid') !== 'true') {
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    }};
    componentDidMount(){
        
        if(localStorage.getItem('paid') !== 'true') {
            const dataCart = JSON.parse(localStorage.getItem('dataCart'));
            if(dataCart !== null){
                this.setState({cart: dataCart});
            }
            const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
            if(dataTotal !== null){
                this.setState({total: dataTotal});
            }
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