import React, { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/utils';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
// import { Grid } from '@material-ui/core';
// import Alert from '@material-ui/lab/Alert';
import '@material-ui/icons';
import {
    ORDER_DELIVER_RESET,
    ORDER_PAY_RESET,
  } from "../constants/orderConstants";

  
const Editable = (props) => {
    const { useState } = React;
    const [data, setData] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
    const [iserror, setIserror] = useState(false)
    const [successMsg, setSuccessMsg] = useState([])
    const [issucc, setIssucc] = useState(false)
    const params = useParams();
    const [cashDetails, setCashDetails] = useState([]);
    useEffect(() => {
        retrieveCashDetails();
      }, []);
    
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const getFileList = async () => {
          try {
            const { data } = await axios.get(`${API_URL}/api/cash/getAllCashOn`);
            setErrorMsg('');
            setData(data);
            console.log(data);
          } catch (error) {
            error.response && setErrorMsg(error.response.data);
            console.log(error);
    
          }
        };
    
        getFileList();
    
        console.log(data);
      }, []);

      useEffect(() => {
        axios.get(`${API_URL}/api/orders/${params.id}`)
            .then(res => {
                console.log(res)
                setPosts(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
            console.log(params.id);
      }, [params.id]);
    
  
    const [columns, setColumns] = useState([
      { title: 'Recevier Name', field: 'receiverName' },
      { title: 'Email', field: 'email' },
      { title: 'Mobile Number', field: 'mobileNo' },
      { title: 'NIC', field: 'nic' },
      { title: 'Order ID', field: '_id',editable:'never' },
    //   { title: 'Order', field: 'price' },

    ]);


    /////////////////////////update rows
    const api = axios.create({
      baseURL: `http://localhost:5000`
    })

    //report retrive
    const retrieveCashDetails = () => {
        setCashDetails([]);
        axios.get(`${API_URL}/api/cash/getAllCashOn`).then((res) => {
            console.log(res.data);
            res.data.forEach((item) => {
              let object = {
                Name: item.receiverName,
                Email: item.email,
                Mobile: item.mobileNo,
                NIC: item.nic,
              };
              cashDetails.push(object);
            });
            setCashDetails(cashDetails);
          });
      };
    





    return (
      <div>
        <h1 id="h12" align="center">Cash On Delivery Report</h1>
        <div className="tbl">

        {/* <div>

          {iserror &&    
            <Alert severity="error">
                {errorMsg.map((msg, i) => {
                    return <div key={i}>{msg}</div>
                })}
            </Alert>      
          }   

          {issucc && 
            <Alert severity="success">
                {successMsg.map((msg, i) => {
                   return <div key={i}>{msg}</div>
               })}
            </Alert>
          }     
        </div> */}
        
      <MaterialTable
        title=''
        columns={columns}
        data={data}
        // editable={{
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       handleRowUpdate(newData, oldData, resolve);
        //     }),

        //   onRowDelete: oldData =>
        //     new Promise((resolve, reject) => {
        //       handleRowDelete(oldData, resolve)
        //     }),
        // }}
        options={{
          search: true,
          showTitle: false,
          actionsCellStyle:false,
          toolbar: true,
          headerStyle: {
            backgroundColor: 'rgba(9, 135, 224)',
            color: 'rgba(255, 255, 255)',
            fontSize: 18,
          },
          rowStyle: {
            fontSize: 12,
          },
          actionsColumnIndex: -1
        }}
      />
      {/* <div id="btncsv"> */}

      {/* Report  */}
          <Button id="btncsv">
                <CSVLink
                id="csv"
                  filename={"cashDetails.csv"}
                  data={cashDetails}
                //   className="btn btn-primary m-2"
                  data-toggle="tooltip"
                  data-placement="top"
                >
                  Generate Report
                </CSVLink>
                </Button>
              {/* </div> */}
      </div>
      
      </div>
    );
  }

export default Editable;