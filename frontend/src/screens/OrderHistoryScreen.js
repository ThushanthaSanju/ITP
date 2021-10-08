import React, {  useState , useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../components/ComponentToPrint";

import {  useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import axios from 'axios';
import jsPDF from 'jspdf';

export default function OrderHistoryScreen(props) {
  //report
  const componentRef = useRef();
 

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(listOrderMine());
  // }, [dispatch]);

  const [AllOrders,setAllOrders] = useState([])
   useEffect(() => {
       axios.get("http://localhost:5000/getAllOrders")
       .then(res => setAllOrders(res.data))
       .catch(error => console.log(error));
   },[])

  const [start,setStart] = useState("");
  const [end,setEnd] = useState("");
    function searchUsingName()
    {
        axios.get("http://localhost:5000/getAllOrders/"+start+"/"+end)
        .then(res => setAllOrders(res.data))
        .catch(error => console.log(error));
    }

    function cancelSearch()
    {
        
        axios.get("http://localhost:5000/getAllOrders")
       .then(res => setAllOrders(res.data))
       .catch(error => console.log(error));
    }

    function handlePrint()
 {
  var doc = new jsPDF('p', 'pt');
  doc.setTextColor(254, 8, 8 );
  doc.text(20, 20, "Order History")
  doc.text(25, 30, '---------------------------')
  doc.addFont('helvetica', 'normal')
  doc.setFontSize(12);
  doc.setTextColor(3, 3, 3);
  // eslint-disable-next-line no-lone-blocks
  localStorage.setItem("AllOrders", JSON.stringify(AllOrders));
  
  // retrieving our data and converting it back into an array
  var AllOrdersData = localStorage.getItem("AllOrders");
  var orders = JSON.parse(AllOrdersData);

  let count = 60;
  doc.text(25, 50, "\t\tID\t\t\t\t\tTOTAL PRICE\t\tPAID\t\tDELIVERY")
  doc.setFontSize(11);
 for(var i = 0; i < orders.length; i++)
 {
     count = count+20;
     
    doc.text(25, count, orders[i]._id+"\t\tRS."+ orders[i].totalPrice.toFixed(2)+"\t\t\t"+orders[i].isDelivered+"\t\t\t"+orders[i].isPaid)
 }
 
  doc.save('Order List.pdf')
 }


  return (
    <div style={{margin:'4%'}}>
      <h1>Order History</h1>
      <div class="mb-3 mt-5 row container">
        <div class="col-10">
            <div class="input-group mb-3">
            <input type="number" class="form-control" placeholder="Start Price"  aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) =>{
                setStart(e.target.value);
            }}/>&nbsp;&nbsp;
              <input type="number" class="form-control" placeholder="End Price"  aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) =>{
                setEnd(e.target.value);
            }}/>
            <button class="btn btn-dark" type="button" id="button-addon2" onClick={cancelSearch}>Cancel</button>&nbsp;&nbsp;&nbsp;
            </div>
        </div>
        <div class="col-2">
            <button className="shadow-0 mx-2" size="sm" style={{fontSize:'14px', letterSpacing:'2px'}} color='danger' onClick={searchUsingName}>Search</button>
        </div>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table" style={{marginTop:'3%'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {AllOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <ComponentToPrint ref={componentRef} />
        <br />
        <button
          style={{
            background: "deepskyblue",
            float: "right",
            padding: "20px 20px",
          }}
          onClick={handlePrint}
        >
          Generate Report Order History
        </button>
        <br />
      </div>
    </div>
  );
}
