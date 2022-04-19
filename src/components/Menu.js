import React from 'react'
import '../styles/OrderStyle.css'

class Menu extends React.Component{

    constructor(){
        super();
        this.state = {
            price: '',
            quantity:0
        }
    }

    render(){
        return(
            // <div>
            //     <h3 className='fname'>
            //     {this.props.name}
            //     </h3>
            //         <div className='desc'>
            //             <p>{this.props.desc}</p>
            //             <button className="btn" value={this.props.price} onClick={()=>this.props.action(this.props.price,this.props.name,this.state.quantity)}>Add</button>
            //         </div>
            //         <br/> 	
            //         <p className='amount'>{'\u20B9'}  {this.props.price} </p>
                    
            // </div>



<div className="menuCard d-flex justify-content-between flex-wrap">
           <div className="d-flex flex-column itemDescription">
               <div style={{display:'flex',flexDirection:'column',flexGrow:'1'}}>
               <div className="h5">{this.props.name}</div>
               {/* <div>{colorCircle}{' '}{data.vegan}</div> */}
               {/* <div>Descriprion</div> */}
               <div className="py-2">&#8377;{this.props.price}</div>
               </div>
               <div style={{display:'flex',alignItems:'center'}}><button className="addCartBtn" onClick={()=>this.props.action()}>Add to cart</button></div>
              
                {/* <button type="button" className="btn btn-outline-warning mt-auto p-2 w-50 addCart" >Add to cart</button> */}
    </div>
           {/* <div className="menuCardImg position-relative">
               
               <img alt="" className="img-fluid img-rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVua1higrnAKxEJ8ufI9iIJ8Y3_-DGUBEoA&usqp=CAU"/>
               <span className="position-absolute top-0 end-0 bg-primary badge" style={{padding:"5px"}}>tag</span>
           </div> */}
       </div>
            
        )
    }
}

export default Menu;