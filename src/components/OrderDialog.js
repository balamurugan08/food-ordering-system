import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';


const addRestaurantUrl = "http://localhost:8080/foodApp/restaurant";
const addProductUrl = "http://localhost:8080/foodApp/restaurant";

class OrderDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
 
          };
    }

    render() {
        const {open,handleClose,orderDetails} = this.props;
        return (
<div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">Your Last Order</DialogTitle>
        <DialogContent className="flex flex-col">
          <div className="flex"> <p className="font-medium">Ordered ID : </p> <p className="ml-2"> {orderDetails.orderTracking.orderId}</p></div>
          <div className="flex"> <p className="font-medium">Total Price : </p> <p className="ml-2">{`${orderDetails.price}$`}</p></div>
          <div className="flex"> <p className="font-medium">Ordered Type : </p> <p className="ml-2">{orderDetails.orderType === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</p></div>
          <div className="flex"> <p className="font-medium">Ordered Date : </p> <p className="ml-2">{moment(orderDetails.orderTracking.deliveryTime).format("YYYY-MM-DD")}</p></div>
          <div className="flex"> <p className="font-medium">Estimated Delivery Time : </p> <p className="ml-2">{moment(orderDetails.orderTracking.deliveryTime).format("hh:mm")}</p> </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
          );
    }
  
}

export default OrderDialog;
