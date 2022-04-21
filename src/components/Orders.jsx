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
import {Link} from 'react-router-dom';


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
            openProductDialog:false,
            isAdmin:false,
            // restaurantName:this.props.history.location.pathname.slice(9)
        };
    }

    componentWillMount(){
        
      this.getProductList();
    }

    getProductList=()=>{
        let value = this.props.history.location.pathname.split('/');
        const restaurantId = value[2]
        let url = eventBaseUrl + '/'+restaurantId + '/products';
        const isAdmin = this.props.match.params.isAdmin === "true" ? true : false;
        axios.get(url).then((res) => {
            this.setState({
                id:restaurantId,
                newList:res.data.products,
                isAdmin:isAdmin
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

    // handlePayment = ()=>{
    //     this.setState({
    //         open:true
    //     })
    // }



    handleClose = ()=>{
        const {
            history: { push },
          } = this.props;
        this.setState({
            open:false
        })

        if(this.state.isAdmin){
            push({
                pathname: "/admin",
              });

        }else{
            push({
                pathname: "/home",
              });
        }
    }

    handleLogout = () => {
        localStorage.removeItem("username");
        const {
          history: { push },
        } = this.props;
        push("/");
      };


      handleProductDialog = () =>{
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
        const {openProductDialog,id,isAdmin,cartList,total} = this.state;

        
        return(
        <div>
            <FormDialog updateProducts={this.getProductList} open={openProductDialog} handleClose={this.closeProductDialog} restaurantId={id}/>
            {/* <div className="nav">
                <div id="logo">
                    <h2>FOOD ORDERING SYSTEM</h2>
                </div>

               
            
                
            </div> */}

            {/* <div className="flex items-center mb-4">
          <h2 style={{flexGrow:'1'}}className="flex 1 text-4xl font-semibold text-blue-800">
            Food Ordering System
          </h2>
      
        7
        </div> */}

            <div id="content">
                <div id="head" className="bg-blue-700" style={isAdmin ? {width: '100%'} : {width:'75%'}}>
                    <div class="flex justify-between items-center">
                    <h1 className='hname'>{value[3]}</h1>
                <div>   
                <button
            class="bg-white text-blue-700 font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.handleClose}
          >
            Home
          </button>
                    {isAdmin && <button
            class="bg-white  text-blue-700 font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.handleProductDialog}>Add Items</button>}
          <button
            class="bg-white text-blue-700 font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.handleLogout}
          >
            Logout
          </button>
          </div> 
                    </div>
                    <div id='items'>
                        <br/>
                        <div className='menuDetails'>
                        {this.state.newList.map (
                        item => <Menu id = {item.id} price={item.price} image={item.image} name={item.productName} action={(e)=>this.childHandler(item)} isAdmin={isAdmin}/>) }
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
                                    <span className="spn">&#36;{this.state.total}</span>
                                </p>
                                {/* <input id="pay" type="button" value="Calculate"
                                onClick = {() => this.total(this.state.price,this.state.quantity)} /> */}
                                <br/>
                                <div style={{display:'flex',justifyContent:'center'}}>
                               { isDisplayPayment &&
                                        <Link to={{
                                            pathname:`/payment/${id}/${isAdmin}`,state:{cartList:cartList,total:total}}}>
                                <input  id="pay" type="button" value="Pay Now"/>
                                </Link>}
                               
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