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

class FormDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            restaurantName: "",
            imageUrl: "",
            locationName: "",
            productName:"",
            productImageUrl:"",
            productPrice:""
          };
    }

    handleRestaurantNameChange = (e) => {
        this.setState({ restaurantName: e.target.value });
      };

      handleImageUrlChange = (e) => {
        this.setState({ imageUrl: e.target.value });
      };

      handleLocationNameChange = (e) => {
        this.setState({ locationName: e.target.value });
      };

      
    handleProductNameChange = (e) => {
        this.setState({ productName: e.target.value });
      };

      handleProductImageUrlChange = (e) => {
        this.setState({ productImageUrl: e.target.value });
      };

      handleProductPriceChange = (e) => {
        this.setState({ productPrice: e.target.value });
      };


    handleSumbit = () => {
        if(this.props.isRestaurant){
            const {restaurantName,imageUrl,locationName} = this.state;
            const reqJson={
                restaurantName:restaurantName,image:imageUrl,address:locationName
              }

            axios.post(addRestaurantUrl,reqJson).then((res) => {
                console.log(res);
                this.setState({restaurantName: "",imageUrl: "",locationName: ""})
                this.props.handleClose();
               });

        }else{
            const {productName,productImageUrl,productPrice} = this.state;
            const reqJson={
                productName:productName,image:productImageUrl,price:productPrice
              }
              const url = addProductUrl + '/'+this.props.restaurantId + '/products';

              axios.post(url,reqJson).then((res) => {
                console.log(res);
                this.setState({productName: "",productImageUrl: "",productPrice: ""})
                this.props.handleClose();
               });

        }
    }

    render() {
        const {open,handleClose,isRestaurant} = this.props;
        const {restaurantName,imageUrl,locationName,productName,productImageUrl,productPrice} = this.state;
        return (
            <div>
              <Dialog open={open} onClose={handleClose}  maxWidth="md">
                <DialogTitle>{`${isRestaurant ? 'Add Restaurant': 'Add Product'} `}</DialogTitle>
                <DialogContent>
                    {isRestaurant ? 
                           <React.Fragment>
                           <TextField
                            value={restaurantName}
                             autoFocus
                             margin="dense"
                             id="name"
                             label="Restaurant Name"
                             type="text"
                             fullWidth
                             variant="standard"
                             onChange={(e) => this.handleRestaurantNameChange(e)}
                           />
         
                           <TextField
                            value={imageUrl}
                             autoFocus
                             margin="dense"
                             id="imageUrl"
                             label="Image Url"
                             type="text"
                             fullWidth
                             variant="standard"
                             onChange={(e) => this.handleImageUrlChange(e)}
                           />
         
                                    <TextField
                             value={locationName}
                             autoFocus
                             margin="dense"
                             id="location"
                             label="Location"
                             type="text"
                             fullWidth
                             variant="standard"
                             onChange={(e) => this.handleLocationNameChange(e)}
                           />
                     </React.Fragment>
                     : 
                     <React.Fragment>
                     <TextField
                      value={productName}
                       autoFocus
                       margin="dense"
                       id="productName"
                       label="Product Name"
                       type="text"
                       fullWidth
                       variant="standard"
                       onChange={(e) => this.handleProductNameChange(e)}
                     />
   
                     <TextField
                      value={productImageUrl}
                       autoFocus
                       margin="dense"
                       id="productImage"
                       label="Image Url"
                       type="text"
                       fullWidth
                       variant="standard"
                       onChange={(e) => this.handleProductImageUrlChange(e)}
                     />
   
                              <TextField
                       value={productPrice}
                       autoFocus
                       margin="dense"
                       id="price"
                       label="Price"
                       type="text"
                       fullWidth
                       variant="standard"
                       onChange={(e) => this.handleProductPriceChange(e)}
                     />
               </React.Fragment>
                     
                     }
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={this.handleSumbit}>OK</Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }
  
}

export default FormDialog;
