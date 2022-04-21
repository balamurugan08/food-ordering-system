import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import Alert from "@mui/material/Alert";
import { withRouter } from "react-router";
import CardPayment from "./CardPayment";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        expanded:'panel1',
        open:false
    };
  }

  handleChange = (panel)=>{
      this.setState({expanded:panel})

  }

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

    const isAdmin = this.props.match.params.isAdmin === "true" ? true : false;

    // if(isAdmin){
    //     push({
    //         pathname: "/admin",
    //       });

    // }else{
        push({
            pathname: "/home",
          });
    // }
}

  render() {
      const {expanded,open} = this.state;
    return (
        <div >
                 <div id="menubar" className="bg-blue-600">
                <h2 className="text-4xl font-semibold text-white">Choose Your Payment</h2>
            </div>
     <Accordion expanded={expanded === 'panel1'} onChange={e=>this.handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p className="text-2xl font-semibold">Card Payment</p>
        </AccordionSummary>
        <AccordionDetails>
            <CardPayment handlePayment={this.handlePayment}/>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={e=>this.handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <p className="text-2xl font-semibold">Cash On Delivery</p>
        </AccordionSummary>
        <AccordionDetails>
        <button class="block w-full max-w-xs mx-auto bg-blue-700 hover:bg-blue-800 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" onClick={this.handlePayment}><i class="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
        </AccordionDetails>
      </Accordion>

      <Dialog
        open={open}
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
    );
  }
}

export default withRouter(Payment);
