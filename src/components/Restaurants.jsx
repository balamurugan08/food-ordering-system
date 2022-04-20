import React from 'react';
import '../styles/RestaurantStyle.css'
// import User from '../images/kishan.jpg'
import data from '../data/data.json'
import RestaurantCard from '../components/RestaurantCard'
import axios from "axios";
import FormDialog from './FormDialog';

const eventBaseUrl = "http://localhost:8080/foodApp/restaurant";
class Restaurants extends React.Component {
    constructor(){
        super();
        this.state={
            // list: data
            list:[],
            openRestaurantDialog:false
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

    componentWillMount(){
        axios.get(eventBaseUrl).then((res) => {
            this.setState({
                list:res.data.restaurants
            })
    })
    console.log('res',this.state.list)
}

    render(){
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
                <h2 className="text-4xl font-semibold text-white">Choose Your Favourite One</h2>
                <p id ="sort">  Sort by &nbsp; &nbsp;
                    <select id="sort-metrics" defaultValue={"none"} onChange={(e) => this.sortMenu(e)}>
                        <option value="none" disabled hidden>None</option>
                        <option class="sort-option" value="name">Name</option>
                        {/* <option class="sort-option" value="rating">Ratings</option>
                        <option class="sort-option" value="review">Reviews</option> */}
                    </select>
                </p>
            </div>
            <div className="self-end">
            {this.props.isAdmin && <button
            class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.openRestaurantDialog}>Add Restaurant</button>}
            <button
            class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.props.handleLogout}>Logout</button>
            </div>
            <FormDialog open={this.state.openRestaurantDialog} handleClose={this.closeRestaurantDialog} isRestaurant/>
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