import React from 'react'
import {Link} from 'react-router-dom'
class RestaurantCard extends React.Component{
    constructor(){
        super();
       
    }

    render(){
        return(
            // <div className="cart">
            //     <Link to={{
            //         pathname:`/order/${this.props.id}/${this.props.name}/${this.props.isAdmin}`}}>
            //         <center><img src={this.props.thumbnail_image} alt={this.props.name}/></center>
            //     </Link>
            //         <h3 id="hotel-title">{this.props.name}</h3>
            //         <p>{this.props.cuisines}</p>
            //         <p>Rating: {'★'.repeat(this.props.rating)}</p>s
            //         {/* <p>Reviews: {this.props.reviews}</p> */}
            // </div>200
            <div class=" bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mr-4 mt-4 min-w" style={{maxWidth:'200px' , maxHeight:'300px'}}>
    {/* <a href="#"> */}
        <img class="rounded-t-lg object-cover" src={this.props.thumbnail_image} alt="Food Image" style={{maxWidth:'200px',minHeight:'150px',maxHeight:'150px',minWidth:'200px'}}/>
    {/* </a> */}
    <div class="p-5">
    <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{this.props.name}</h5>
        {/* <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
           <Link to={{
                 pathname:`/order/${this.props.id}/${this.props.name}/${this.props.isAdmin}`}}>
        <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            View Products
            <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
                </Link>
    </div>
</div>
        );
    }
}

export default RestaurantCard