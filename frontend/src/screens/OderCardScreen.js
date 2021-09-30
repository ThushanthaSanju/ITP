import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link ,useParams} from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

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


  //Card Submit

  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvCode, setCvCode] = useState("");
  const [cardOwner, setCardOwner] = useState("");
  const params = useParams();
    
    const [posts, setPosts] = useState([])

  const onSubmit = () => {
    const cardDetails = {
      cardNumber: cardNumber,
      expDate: expDate,
      cvCode: cvCode,
      cardOwner: cardOwner,
    };
    Axios
      .post("http://localhost:5000/api/card/addCard", cardDetails)
      .then((res) => {
        if (res.data.success) {
          setCardNumber("");
          setExpDate("");
          setCardOwner("");
          setCvCode("");
          alert("Successfully inserted");
        } else {
          alert("Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardNumber = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpDate = (e) => {
    setExpDate(e.target.value);
  };

  const handleCvCode = (e) => {
    setCvCode(e.target.value);
  };

  const handleCardOwner = (e) => {
    setCardOwner(e.target.value);
  };


  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
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
                    Delivered at {order.deliveredAt}
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
                  <strong>Method:</strong> Card
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
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
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <div class="row1">
  <div class="col-75">
    <div class="containerq">
                      <form>
                        <div className="col-50">
                          <div className="frmcard">
            <label htmlFor="fname" id="Nms">Accepted Cards</label>
            <div className="icon-container">
              <i className="fa fa-cc-visa" id="visa"></i>
              <i className="fa fa-cc-amex" id="amex"></i>
              <i className="fa fa-cc-mastercard" id="mastercard"></i>
              <i className="fa fa-cc-discover"id="discover"></i>
            </div>
            <div className="row1">
            <div className="col-50">
            <label htmlFor="ccnum" id="Nms">Credit card number</label>
            <input 
            className="inpt"
            type="text" 
            id="ccnum" 
            name="cardnumber" 
            onChange={(e) => handleCardNumber(e)}
            placeholder="1111-2222-3333-4444"/>
            </div>
              <div className="col-50">
                <label htmlFor="expyear" id="Nms">Exp Year</label>
                <input 
                className="inpt"
                type="text" 
                id="expyear" 
                name="expyear" 
                onChange={(e) => handleExpDate(e)}
                placeholder="2018"/>
              </div>
              <div className="col-50">
                <label htmlFor="cvv" id="Nms">CVV</label>
                <input 
                className="inpt"
                type="text" 
                id="cvv" 
                name="cvv"
                onChange={(e) => handleCvCode(e)}
                placeholder="352"/>
              </div>
              <div className="col-50">
              <label htmlFor="cname" id="Nms">Name on Card</label>
            <input 
            className="inpt"
            type="text" 
            id="cname" 
            name="cardname" 
            onChange={(e) => handleCardOwner(e)}
            placeholder="John More Doe"/>
            </div>
            </div>
            </div>
            </div>
            <div className="row1">
            <div className="col-25">
            <Link to={`/ViewCard/${params.id}`}>
            <a href="/ViewCards">
            
            <button
            id="btns2"
                    type="button"
                    className="primaryblock1"
                  >
                    View Card Details
                  </button>
                  </a>
                  </Link>
            </div>
            <div className="col-25">
            
                  <button
                    id="btns1"
                    type="button"
                    className="primaryblock"
                    onClick={() => onSubmit()}
                  >
                    Save
                  </button>
                  
                  
            </div>
            </div>


            </form>
            </div>
  </div>
</div>
            {/* <a href="/ViewCards">
            <label
                    className="primary block"
                  >
                    View
                  </label>
                  </a> */}
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
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
