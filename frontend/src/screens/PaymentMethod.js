import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
      e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
  };

  return (
    <div>
      
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      
        <div id="hd12">
          <h1>Payment Method</h1>
        </div>
        <div className="payclass">
        <div>
          <div>
            <a href="/placeorder">
            <button
            className="button-73"
              id="ppB"
              onClick={(e) => setPaymentMethod(e.target.value)}
            >Online Payment</button></a>
          </div>
        </div>
        <div>
          <div>
          <a href="/placeCardorder">
            <button
            className="button-73"
              id="ccB"
              onClick={(e) => setPaymentMethod(e.target.value)}
            >Cash On Delivery</button></a>
          </div>
        </div>
        <div>
          <label />
        </div>
        </div>
    </div>
  );
}
