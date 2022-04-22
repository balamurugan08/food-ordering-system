import React from 'react';
import '../styles/RestaurantStyle.css'
// import User from '../images/kishan.jpg'
import data from '../data/data.json'
import RestaurantCard from '../components/RestaurantCard'
import axios from "axios";
import FormDialog from './FormDialog';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import UserProfileDialog from './UserProfileDialog'
import OrderDialog from './OrderDialog';


const eventBaseUrl = "http://localhost:8080/foodApp/restaurant";
class Restaurants extends React.Component {
    constructor(){
        super();
        this.state={
            // list: data
            list:[],
            openRestaurantDialog:false,
            anchorEl:null,
            openUserProfileDialog:false,
            openOrderDialog:false,
            orderDetails:{}
        };
    }

    

    sortMenu=(e)=>{
        if (e.target.value === 'rating'){
            this.setState({
                list: this.state.list.sort(function(a,b){return b.rating - a.rating})
            })
            
        }
        else if (e.target.value === 'review'){
            this.setState({
                list: this.state.list.sort(function(a,b){return b.reviews - a.reviews})
            })
            
        }
        else if (e.target.value === 'name'){
            function compareName  (a, b)  {
                // case-insensitive comparison
                a = a.toLowerCase();
                b = b.toLowerCase();
              
                return (a < b) ? -1 : (a > b) ? 1 : 0;
              }
            this.setState({
                list: this.state.list.sort(function(a,b){return compareName(a.restaurantName, b.restaurantName)})
            })
            
        }
        
    }

    openRestaurantDialog = () =>{
        this.setState({
            openRestaurantDialog:true
        })
    }

    closeRestaurantDialog = () =>{
        this.setState({
            openRestaurantDialog:false
        })
    }

    openOrderDialog = () =>{
        const orderUrl = `http://localhost:8080/foodApp/user/${localStorage.getItem("userId")}/order`;

        axios.get(orderUrl).then((res) => {
            console.log(res)

             this.setState({
                openOrderDialog:true,
                orderDetails:res.data.orders[res.data.orders.length - 1 ]
        })
    })
    }

    closeOrderDialog = () =>{
        this.setState({
            openOrderDialog:false
        })
    }

    componentWillMount(){
      this.getAllRestaurants();
}

getAllRestaurants = ()=>{
    axios.get(eventBaseUrl).then((res) => {
        this.setState({
            list:res.data.restaurants
        })
})
}

 handleProfileMenuOpen = (event) => {
     this.setState({
         anchorEl:event.currentTarget
     })
  };

  handleMenuClose = () => {
    this.setState({
        anchorEl:null
    })
  };

  handleProfile=()=>{
    this.setState({
        anchorEl:null,
        openUserProfileDialog:true,
    })
  }

  handleClose=()=>{
    this.setState({
        anchorEl:null,
        openUserProfileDialog:false,
    })
  }
  

    render(){
        const menuId = 'primary-search-account-menu';
        const isMenuOpen = Boolean(this.state.anchorEl);
  const renderMenu = (
    <Menu
      anchorEl={this.state.anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={this.handleMenuClose}
    >
      <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
      {/* <MenuItem onClick={this.handleMenuClose}>Orders</MenuItem> */}
    </Menu>
  );



        return(
        <div>
            {/* <div className="nav">
                <div id="logo">
                    <h2>FOODIE</h2>
                </div>

                <div id="user">
                    <div className="name">Hello, Kishan</div>
                    <div className="profile">
                        <img src={User} alt="profile" id="img" height="45" width="45"/>
                    </div>
                </div>
            </div> */}
            
            <div className="maincart">

            <div id="menubar" className="bg-blue-600">
                <h2 style={{display:'flex',flexGrow:'1'}}className="text-4xl font-semibold text-white">Choose Your Favourite One</h2>
                <p style={{marginRight:20}} id ="sort">  Sort by &nbsp; &nbsp;
                    <select id="sort-metrics" defaultValue={"none"} onChange={(e) => this.sortMenu(e)}>
                        <option value="none" disabled hidden>None</option>
                        <option class="sort-option" value="name">Name</option>
                        {/* <option class="sort-option" value="rating">Ratings</option>
                        <option class="sort-option" value="review">Reviews</option> */}
                    </select>
                   
                    

                </p>
                {!this.props.isAdmin &&
                <div>
                    <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
              style={{color:'white',marginRight:8}}
            >
              <AccountCircle />
            </IconButton>
            {renderMenu}
            <UserProfileDialog open={this.state.openUserProfileDialog} handleClose={this.handleClose}></UserProfileDialog>
            </div>
    }
               
            </div>
            <div className="self-end">
            {this.props.isAdmin && <button
            class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.openRestaurantDialog}>Add Restaurant</button>}
            {!this.props.isAdmin && <button
            class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.openOrderDialog}>Order</button>}
            <button
            class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.props.handleLogout}>Logout</button>
            </div>
            <FormDialog open={this.state.openRestaurantDialog} updateRestaurants={this.getAllRestaurants} handleClose={this.closeRestaurantDialog} isRestaurant/>
            {this.state.openOrderDialog && <OrderDialog open={this.state.openOrderDialog} handleClose={this.closeOrderDialog} orderDetails={this.state.orderDetails}/>}

            <div className="flex flex-wrap ml-4">
            {this.state.list && this.state.list.map(
                x => 
                    <RestaurantCard thumbnail_image={x.image} name = {x.restaurantName} address={x.address} id={x.id} isAdmin={this.props.isAdmin ? true : false}/>
                    // cuisines = {x.cuisines} rating = {x.rating} reviews = {x.reviews}/>
                    
            )}
            </div>

        
            
            </div>
        </div>
        )
    };
}

export default Restaurants;