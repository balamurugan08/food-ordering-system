import React from 'react'
import '../styles/OrderStyle.css'
import Menu from '../components/Menu'
// import data from '../data/data.json'
import MyCart from '../components/MyCart'
import axios from "axios";

const eventBaseUrl = "http://localhost:8080/foodApp/restaurant";
class Orders extends React.Component {
    constructor(){
        super();
        this.state = {
            // list: data,
            id:'',
            newList:[],
            price:'',
            name:[],
            total:0,
            quantity:0,
            clickable: false,
            cartList:[]
            // restaurantName:this.props.history.location.pathname.slice(9)
        };
    }

    componentWillMount(){
        // const restaurantId = this.props.history.location.pathname.slice(7)
        // const List = this.state.list.filter(function (rec) { return rec.name === hotel})
        // this.setState({
        //     id:restaurantId,
        //     newList: List
        // })
        let value = this.props.history.location.pathname.split('/');
        const restaurantId = value[2]
        let url = eventBaseUrl + '/'+restaurantId + '/products';
        axios.get(url).then((res) => {
            this.setState({
                id:restaurantId,
                newList:res.data.products
            })
    })
    }

    childHandler = (ChildPrice,ChildName,ChildQuantity) => {
        const names = this.state.name; 
        names.push(ChildName);
        let totalPrice = this.state.total + ChildPrice*(ChildQuantity+1)
        this.setState(
            {price: ChildPrice,
            name: names,
            quantity : ChildQuantity+1,
            clickable: true,
            total:totalPrice }
        )};

    incrementQuantity = (incQuan) => {
        this.setState(
            {
                quantity: incQuan+1
                
            }
        )
    };

    decrementQuantity = (decQuan) => {
        if(this.state.quantity>=1){
            this.setState(
                {
                    quantity: decQuan-1
                    
                }
            )
        }
        
    };

    total = (p,q) => {
        this.setState(
            {
                total:p*q
            }
        )
    }
   

    render(){
        let value = this.props.history.location.pathname.split('/');
        
        return(
        <div>
            {/* <div className="nav">
                <div id="logo">
                    <h2>FOOD ORDERING SYSTEM</h2>
                </div>

               
            
                
            </div> */}

            <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-semibold text-blue-800">
            Food Ordering System
          </h2>
          <button
            class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            // onClick={this.handleLogout}
          >
            Logout
          </button>
        
        </div>

            <div id="content">
                <div id="head">
                    <h1 className='hname'>{value[3]}</h1>
                    <div id='items'>
                        <br/>
                        <div className='menuDetails'>
                        {this.state.newList.map (
                        item => <Menu id = {item.id} price={item.price} name={item.productName} action={this.childHandler} />) }
                        </div>
                    </div>
                </div>
                <div id="panel">
                    <div id="logo">               
                    </div> 
                    <div id="right">
                        <div id= "right-in">
                            <h4 style={{fontWeight: 700}}>Your Cart</h4>
                                
                            { this.state.clickable && 
                                <div>
                                    <MyCart 
                                        name={this.state.name}
                                        price={this.state.price}
                                        quantity={this.state.quantity} 
                                        increment={this.incrementQuantity} 
                                        decrement={this.decrementQuantity}>
                                    </MyCart>
                                </div>
                            }
    
                            <div id="total">
                                <p id="total"> Total amount: 
                                    <span className="spn">{'\u20B9'}  {this.state.total}</span>
                                </p>
                                {/* <input id="pay" type="button" value="Calculate"
                                onClick = {() => this.total(this.state.price,this.state.quantity)} /> */}
                                <br/>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                <input id="pay" type="button" value="Pay Now"/>
                                </div>
                                
                            </div>
                        </div>                
                    </div>
                </div>

            </div>
        </div>
        )
    };
}

export default Orders;