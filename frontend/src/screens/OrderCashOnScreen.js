import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link ,useParams} from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { makeStyles } from '@material-ui/core/styles';
//dialog box import
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'; 
import { API_URL } from '../constants/utils';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export default function OrderCashOnScreen(props) {


  /**
 * draggable dialog component
 * @param {*} props 
 * @returns 
 */
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[className*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
 

  const useStyles = makeStyles((theme) => ({
    alert: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  
  const classes = useStyles();
  //Cash Submit

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  const [errorMsg, setErrorMsg] = useState('');
  const[successMsg, setSuccessMsg] = useState('');
  const [open, setOpen] = useState(false);
  // const [state, setState] = useState({
  //   receiverName: '',
  //   email: '',
  //   mobileNo:'',
  //   nic:'',
  //   errors: {
  //     receiverName: '',
  //     email: '',
  //     mobileNo:'',
  //     nic:'',
  //   }
  // });

  // const handleOnSubmit = async (event) => {
  //   event.preventDefault();
  //   setOpen(true);
  //   try {
  //     const { receiverName, email, mobileNo, nic} = state;
  //   if(validateForm(state.errors)){
  //     // const isEmailValid = this.emailValidation();
  //     console.info('Valid Form')
  //     if (receiverName.trim() !== '' && email.trim() !== '' && mobileNo.trim() !== ''  && nic.trim() !== '') {

  //         const formData = new FormData();
  //         formData.append('receiverName', receiverName);
  //         formData.append('email', email);
  //         formData.append('mobileNo', mobileNo);
  //         formData.append('nic', nic);

  //         setErrorMsg('');
  //         await Axios.post(`${API_URL}api/cash/addCashOn`, state, {
  //           headers: {
  //             'Content-Type': 'application/json'
  //           }
  //         });
  //         setSuccessMsg('upload Success')
  //     } else {
  //       setErrorMsg('Please enter all the field values.');
  //       // setOpenErr(true);
  //     }
  //   }else{
  //     setErrorMsg('Please enter valid field values.');
  //   }
  //   } catch (error) {
  //     error.response && setErrorMsg(error.response.data);
  //     // setOpenErr(true);
  //   }
  // };
  //const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  // const handleChange = (event) =>{
  //   event.preventDefault();
  //   const { name, value } = event.target;
  //   let errors = state.errors;

  //   switch (name) {
  //     case 'email': 
  //       errors.email = 
  //       validEmailRegex.test(value)
  //       ? ''
  //       : 'Invalid Email';
  //       break;
  //       case 'mobileNo': 
  //       errors.mobileNo = 
  //         value.length < 10
  //           ? 'Mobile number must be 10 numbers long!'
  //           : '';
  //       break;
  //     case 'nic': 
  //       errors.nic = 
  //       value.length < 10
  //           ? 'NIC must be 10 digits'
  //           : '';
  //       break;
  //     default:
  //       break;
  //   }
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.value,
  //     errors, [name]: value
      
  //   });
  // }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  //Validation
  const [errors, setErrors] = useState({receiverName: '', email:'', mobileNo:'', nic:''});
  const validate = () =>{
    let errors = {};
    let isValid = true;

    if (typeof receiverName !== "undefined") {
      var patt = new RegExp(/^[a-z ,.'-]+$/i);
      if (!patt.test(receiverName)) {
      isValid = false;
       errors["receiverName"] = "Please enter valid receiver name";
      }
    }

    if (mobileNo.length !== 10) {
      isValid = false;
       errors["mobileNo"] = "Please enter valid Mobile Number code";
    }

    if (nic.length !==10 ) {
      isValid = false;
       errors["nic"] = "Please enter valid NIC code";
    }

    if (typeof email !== "undefined") {
        
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }
    setErrors(errors);

    return isValid;
}

  const [receiverName, setReceiverName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");

  //insert
  const OnSubmit = () => {
    if(validate()){
      setOpen(true);
    const cashOnDetails = {
      receiverName: receiverName,
      email: email,
      mobileNo: mobileNo,
      nic: nic,
    };
    Axios
      .post("http://localhost:5000/api/cash/addCashOn", cashOnDetails)
      .then((res) => {
        if (res.data.success) {
          setReceiverName("");
          setEmail("");
          setNic("");
          setMobileNo("");
          alert("Successfully inserted");
        } else {
          alert("Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const handleReceiverName = (e) => {
    setReceiverName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileNo = (e) => {
    setMobileNo(e.target.value);
  };

  const handleNic = (e) => {
    setNic(e.target.value);
  };
  // const {errors} = state;

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger"></MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>

      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
              <h2>Shippring</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    {/* Delivered at {order.deliveredAt} */}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger"></MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> Cash
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    {/* Paid at {order.paidAt} */}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger"></MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x Rs.{item.price}.00 = Rs.
                          {item.qty * item.price}.00
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>Rs.{order.itemsPrice.toFixed(2)}.00</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>Rs.{order.shippingPrice.toFixed(2)}.00</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>Rs.{order.taxPrice.toFixed(2)}.00</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>Rs.{order.totalPrice.toFixed(2)}.00</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger"></MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <div className="row1">
  <div className="col-75">
    <div className="containerq">
                      {/* <form> */}

                      <div className={classes.alert}>
              <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
        <DialogTitle style={{ cursor: 'move',backgroundColor:'rgb(108, 218, 255)',color:'#ffffff' }} id="draggable-dialog-title">
        Kingship
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {successMsg!=''?(
             <>
              <div style={{color:'#008000'}}>
                  <CheckIcon  />
                  {successMsg}
                </div>
             </>
            ):(
              <>
              <div style={{color:'#008000'}}>
                  <CheckIcon  />
                  Upload Success
                  {/* {errorMsg} */}
                </div>
             </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions> 
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
{/* Cash On Insert */}
          </div>
                        <div className="col-50">
                          <div className="frmcash">
            <div className="row1">
            <div className="col-50">
            <label htmlFor="ccnum" id="Nms">Receiver Name</label>
            <input 
                className="inpt"
                required
                type="text" 
                id="receiverName" 
                name="receiverName" 
                value={receiverName}
                onChange={(e) => handleReceiverName(e)}
                placeholder="Jhon More"/>
                 {errors.receiverName ? (
                <span className='error'>{errors.receiverName}</span>):(<></>)}
            </div>
              <div className="col-50">
                <label htmlFor="email" id="Nms">Email</label>
                <input 
                className="inpt"
                required
                type="text" 
                id="email" 
                name="email" 
                value={email} 
                onChange={handleEmail}
                placeholder="kingship@gmail.com"/>
                {errors.email ? (
                <span className='error'>{errors.email}</span>):(<></>)}
              </div>
              <div className="col-50">
                <label htmlFor="cvv" id="Nms">Mobile Number</label>
                <input 
                className="inpt"
                required
                type="number" 
                id="mobileNo" 
                name="mobileNo"
                value={mobileNo} 
                onChange={handleMobileNo}
                placeholder="071 25485352"/>
               {errors.mobileNo ? (
                <span className='error'>{errors.mobileNo}</span>):(<></>)}
              </div>
              
              <div className="col-50">
              <label htmlFor="cname" id="Nms">NIC</label>
            <input 
            className="inpt"
            type="text" 
            id="nic" 
            name="nic" 
            value={nic} 
            onChange={handleNic}
            placeholder="985184122514V"/>
            {errors.nic ? (
                <span className='error'>{errors.nic}</span>):(<></>)}
            </div>
            </div>
            </div>
            </div>
            <div className="row1">
            <div className="col-25">
              {/* View Button */}
            <a href="/ViewCash">
            <button
            id="btns2"
                    type="view"
                    className="primaryblock1"
                  >
                    View Details
                  </button>
                  </a>
            </div>
            <div className="col-25">
            {/* Save Button */}
                  <button
                    id="btns1"
                    type="submit"
                    className="primaryblock"
                    onClick={() => OnSubmit()}
                  >
                    Save
                  </button>
                  
            </div>
            </div>


            {/* </form> */}
            {/* <div className="row1">
            <div className="col-25">
            <a href="/ViewCash">
            <button
                    id="btns2"
                    type="submit"
                    className="primaryblock1"
                  >
                    View Details
                  </button>
                  </a>
            </div> */}
           
            {/* </div> */}

            </div>
  </div>
</div>
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger"></MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        



        {/* <div className="col-1">
          <div className="card card-body">
         
          </div>
        </div> */}
      </div>
    </div>
  );
}
