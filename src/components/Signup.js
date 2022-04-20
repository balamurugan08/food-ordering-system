import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import Alert from "@mui/material/Alert";
import { withRouter } from "react-router";
import axios from "axios";

const eventBaseUrl = "http://localhost:8080/foodApp/user";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phoneNumber:"",
      password: "",
      address:"",
      shouldAlertDisplay: false,
      shouldErrorMessageDisplay: false,
      signupErrorMessage:"",
      isEmailError:false,
      isNumberError:false,


    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  };

  handleSubmit = () => {
    const { username, email, password,address,phoneNumber } = this.state;
    const {
      history: { push },
    } = this.props;
    if (
      username === "" ||
      email === "" ||
      password === "" || address=== "" || phoneNumber==="" 
    ) {
      this.setState({ shouldAlertDisplay: true });
      return;
    }
    const isEmailError = this.checkEmailError(email);
    const isPhoneError = this.checkPhoneError(phoneNumber);
    if(!isEmailError){
      this.setState({isEmailError: true});
    }else{
      this.setState({isEmailError: false});
    }
    if(!isPhoneError){
      this.setState({isNumberError: true});
    }else{
      this.setState({isNumberError: false});
    }

    if(!isEmailError){
      return;
    }

    const reqJson={
     userName:username,
     password:password,
     email:email,
     phoneNumber:phoneNumber,
     addressName: address
    }
   
    axios.post(eventBaseUrl,reqJson).then((res) => {
      if(!res.data.isValidUser){
       this.setState({
        signupErrorMessage:res.data.error,
        shouldErrorMessageDisplay:true
       }) 
      }else{
        push('/');
       }
    });
  };

  checkEmailError =(email) =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkPhoneError =(number) =>{
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(number).toLowerCase());
  }


  render() {
    const { username,address,phoneNumber, email, password, shouldAlertDisplay,shouldErrorMessageDisplay,signupErrorMessage, isEmailError,isNumberError} =
      this.state;
      
    return (
      <div className="flex flex-col space-y-5 max-w-md mx-auto my-16 min-w-500">
        <h2 className="text-4xl font-semibold text-blue-800">Signup</h2>
        <TextField
          required
          id="outlined-username"
          value={username}
          label="Username"
          autoComplete="off"
          onChange={(e) => this.handleUsernameChange(e)}
        />
        <TextField
          value={password}
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => this.handlePasswordChange(e)}
        />
        <TextField
          error={isEmailError}
          required
          id="outlined-email"
          value={email}
          label="Email"
          onChange={(e) => this.handleEmailChange(e)}
          helperText={isEmailError ?"Invalid Email":''}
        />
        <TextField
          error={isNumberError}
          required
          id="outlined-phone"
          value={phoneNumber}
          label="Phone Number"
          onChange={(e) => this.handlePhoneNumberChange(e)}
          helperText={isNumberError?"Invalid Phone Number":''}
        />
        <TextField
          required
          id="outlined-phone"
          value={address}
          label="Address"
          onChange={(e) => this.handleAddressChange(e)}
        />
        
        <div className="flex items-center justify-between">
          <Button variant="contained" onClick={this.handleSubmit}>
            Submit
          </Button>
          <div className="flex">
            <p className="text-lg">Existing User?</p>
            <Link to="/" className="text-blue-500 font-semibold text-lg px-1">
              Login
            </Link>
          </div>
        </div>
        {shouldAlertDisplay &&
          <Alert severity="error">Field cannot be empty</Alert>
        }
         {shouldErrorMessageDisplay &&
          <Alert severity="error"> {signupErrorMessage} </Alert>
        }
        
      </div>
    );
  }
}

export default withRouter(Signup);
