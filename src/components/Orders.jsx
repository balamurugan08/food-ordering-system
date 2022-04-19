import React from 'react'
import '../styles/OrderStyle.css'
import Menu from '../components/Menu'
// import data from '../data/data.json'
import MyCart from '../components/MyCart'
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FormDialog from './FormDialog';


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
            quantity:1,
            clickable: false,
            cartList:[],
            open:false,
            openProductDialog:false
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

    childHandler = (item) => {
        console.log('item',item)
        let cartListDetails = this.state.cartList;
        let quantity = 1;
        item.quantity = quantity;
        cartListDetails.push(item);
        this.setState({
            cardList:cartListDetails
        })
        this.state.cartList.map(item=>{
          let totalPrice = item.price * item.quantity + this.state.total
          this.setState({
              total:totalPrice
          })
        })
    };

    incrementQuantity = (productId) => {
        this.state.cartList.map(item=>{
            if(item.id==productId){
                item.quantity =  item.quantity+1;
                let totalPrice = item.price  + this.state.total
                this.setState({
                    total:totalPrice
                })
            }
        })
       this.setState({
           cartList:this.state.cartList
       })
          
    };

    decrementQuantity = (productId) => {
         this.state.cartList.map(item=>{
            if(item.id==productId){
                item.quantity =  item.quantity-1;
                let totalPrice = this.state.total - item.price
                this.setState({
                    total:totalPrice
                })
            }
        })
        this.setState({
            cartList:this.state.cartList
        })
    };

    handlePayment = ()=>{
        this.setState({
            open:true
        })
    }

    handleClose = ()=>{
        const {
            history: { push },
          } = this.props;
        this.setState({
            open:false
        })
        push({
            pathname: "/home",
          });
    }

    handleLogout = () => {
        localStorage.removeItem("username");
        const {
          history: { push },
        } = this.props;
        push("/");
      };


      openProductDialog = () =>{
        this.setState({
            openProductDialog:true
        })
    }
      closeProductDialog = () =>{
        this.setState({
            openProductDialog:false
        })
      }
   

    render(){
        let value = this.props.history.location.pathname.split('/');
        let isDisplayPayment = this.state.total>0;
        const isAdmin = this.props.match.params.isAdmin === "true" ? true : false;
        
        return(
        <div>
            {/* <div className="nav">
                <div id="logo">
                    <h2>FOOD ORDERING SYSTEM</h2>
                </div>

               
            
                
            </div> */}

            <div className="flex items-center mb-4">
          <h2 style={{flexGrow:'1'}}className="flex 1 text-4xl font-semibold text-blue-800">
            Food Ordering System
          </h2>
          <button
            class="bg-blue-800 hover:bg-blue text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.handleClose}
          >
            Home
          </button>
          <button
            class="bg-blue-800 hover:bg-blue text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.handleLogout}
          >
            Logout
          </button>
        
        </div>

            <div id="content">
                <div id="head" style={isAdmin ? {width: '100%'} : {width:'75%'}}>
                    <div class="flex justify-between">
                    <h1 className='hname'>{value[3]}</h1>
                    {isAdmin && <button
            class="bg-blue-800 hover:bg-blue text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.openProductDialog}>Add Products</button>}
                    </div>
                    <div id='items'>
                        <br/>
                        <div className='menuDetails'>
                        {this.state.newList.map (
                        item => <Menu id = {item.id} price={item.price} name={item.productName} action={(e)=>this.childHandler(item)} />) }
                        </div>
                    </div>
                </div>
                {!isAdmin && <div id="panel">
                    <div id="logo">               
                    </div> 
                    <div id="right">
                        <div id= "right-in">
                            <h4 style={{fontWeight: 700}}>Your Cart</h4>
                                
                            {/* { this.state.clickable &&  */}
                           
                                <div>
                               {this.state.cardList && this.state.cardList.map(product=>
                            //    {product.quantity === 1 &&
                                 <MyCart 
                                 name={product.productName}
                                 price={product.price}
                                 quantity={product.quantity} id = {product.id}
                                 increment={this.incrementQuantity} 
                                 decrement={this.decrementQuantity}
                                >
                             </MyCart>
                            //  }
                             
                             )}
                                   
                                </div>
                            {/* } */}
    
                            <div id="total">
                                <p id="total"> Total amount: 
                                    <span className="spn">{'\u20B9'}  {this.state.total}</span>
                                </p>
                                {/* <input id="pay" type="button" value="Calculate"
                                onClick = {() => this.total(this.state.price,this.state.quantity)} /> */}
                                <br/>
                                <div style={{display:'flex',justifyContent:'center'}}>
                               { isDisplayPayment &&
                                <input  id="pay" type="button" value="Pay Now" onClick={this.handlePayment}/>}
                               
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Order Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Thanks For Your Order. We will reach you soon with your delicious food.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <FormDialog open={this.state.openProductDialog} handleClose={this.closeProductDialog} restaurantId={this.state.id}/>
                                </div>
                                
                            </div>
                        </div>                
                    </div>
                </div>}

            </div>
        </div>
        )
    };
}

export default Orders;