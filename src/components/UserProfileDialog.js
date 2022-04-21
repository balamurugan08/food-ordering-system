import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";


const addRestaurantUrl = "http://localhost:8080/foodApp/restaurant";
const addProductUrl = "http://localhost:8080/foodApp/restaurant";

class UserProfileDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          username: "",
          email: "",
          phoneNumber:"",
          password: "",
          address:"",
          };
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
      };

      handleAddressChange = (e) => {
        this.setState({ address: e.target.value });
      };

    handleSumbit = () => {
      let url = 'http://localhost:8080/foodApp/user';
      const json={
        id:localStorage.getItem('userId'),
        userName:this.state.username,
        password:this.state.password,
        email:this.state.email,
        phoneNumber:this.state.phoneNumber,
        addressName:this.state.address
      }
      axios.put(url,json).then((res) => {
       console.log('put response',res);
       this.props.handleClose();
 })
    }

    componentWillMount(){
     
      let url = 'http://localhost:8080/foodApp/user/'+localStorage.getItem("userId");
      axios.get(url).then((res) => {
         this.setState({
           username:res.data.user.userName,
           password:res.data.user.password,
           email:res.data.user.email,
           phoneNumber:res.data.user.phoneNumber,
           address:res.data.user.addressName
         })
  })
  }

    render() {
        const {open,handleClose,isRestaurant} = this.props;
        const {restaurantName,imageUrl,locationName,productName,productImageUrl,productPrice} = this.state;
        return (
            <div>
              <Dialog open={open} onClose={handleClose}  maxWidth="md">
                <DialogTitle>{`User Profile`}</DialogTitle>
                <DialogContent>
                   
                           <React.Fragment>
                           <div style={{marginTop:'1rem'}}className="flex flex-col space-y-5 max-w-md mx-auto min-w-500">
                           <TextField
          required
          id="outlined-username"
          value={this.state.username}
          label="Username"
          autoComplete="off"
          disabled
          // onChange={(e) => this.handleUsernameChange(e)}
        />
        <TextField
          value={this.state.password}
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => this.handlePasswordChange(e)}
        />
        <TextField
          // error={isEmailError}
          required
          id="outlined-email"
          value={this.state.email}
          label="Email"
          disabled
          // onChange={(e) => this.handleEmailChange(e)}
          // helperText={isEmailError ?"Invalid Email":''}
        />
        <TextField
          // error={isNumberError}
          required
          id="outlined-phone"
          value={this.state.phoneNumber}
          label="Phone Number"
          disabled
          // onChange={(e) => this.handlePhoneNumberChange(e)}
          // helperText={isNumberError?"Invalid Phone Number":''}
        />
        <TextField
          required
          id="outlined-phone"
          value={this.state.address}
          onChange={(e) => this.handleAddressChange(e)}
        />    </div>
               </React.Fragment>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={this.handleSumbit}>Update</Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }
  
}

export default UserProfileDialog;
