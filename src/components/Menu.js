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



        <div className="menuCard d-flex justify-content-between flex-wrap" style={this.props.isAdmin ? {width:'240px'} : {}}>
           <div className="d-flex flex-column itemDescription">
               <div style={{display:'flex',flexDirection:'column',flexGrow:'1',padding:20}}>
               <div className="h5">{this.props.name}</div>
                <div className="py-2">&#36;{this.props.price}</div>
                {!this.props.isAdmin && <div style={{display:'flex',alignItems:'center'}}><button className="addCartBtn" onClick={()=>this.props.action()}>Add to cart</button></div>}
               </div>
               <div>
               <img style={{maxHeight:134,minHeight:134,minWidth:130,maxWidth:130,borderTopRightRadius:10,borderBottomRightRadius:10}}src={this.props.image}/>
        </div>
         </div>
         
       </div>
            
        )
    }
}

export default Menu;