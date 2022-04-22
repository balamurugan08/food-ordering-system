import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import axios from "axios";


const addRestaurantUrl = "http://localhost:8080/foodApp/restaurant";
const addProductUrl = "http://localhost:8080/foodApp/restaurant";

class OrderDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
 
          };
    }

    render() {
        const {open,handleClose} = this.props;
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
          <div className="flex"> <p className="font-medium">Product Name : </p> <p className="ml-2"> Soup</p></div>
          <div className="flex"> <p className="font-medium">Price : </p> <p className="ml-2">15$</p></div>
          <div className="flex"> <p className="font-medium">Estimated Delivery : </p> <p className="ml-2"> 30min</p> </div>
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
