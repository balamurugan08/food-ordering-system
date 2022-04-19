import React from 'react'

class MyCart extends React.Component{
    render(){
        return(
            <div>
                
                    <p  id="pitem"> 
                        {this.props.name}
                    <br/><br/>
                    <input disabled={ this.props.quantity===0} className="ip" style={{cursor:'pointer'}} type="button" value="-" onClick={()=>this.props.decrement(this.props.id)}/>
                    <input className="ip" id="tx-w" type="text" value={this.props.quantity}/>
                    <input className="ip" style={{cursor:'pointer'}} type="button" value="+" onClick={()=>this.props.increment(this.props.id)}/>
                    </p>
            </div>
        )
    }
}

export default MyCart