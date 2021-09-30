import React, { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/utils';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
// import { Grid } from '@material-ui/core';
// import Alert from '@material-ui/lab/Alert';
import '@material-ui/icons';


const Editable = (props) => {
    const { useState } = React;
    const [data, setData] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
    const [iserror, setIserror] = useState(false)
    const [successMsg, setSuccessMsg] = useState([])
    const [issucc, setIssucc] = useState(false)

    useEffect(() => {
        const getFileList = async () => {
          try {
            const { data } = await axios.get(`${API_URL}/api/card/getAllCard`);
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
    
  
    const [columns, setColumns] = useState([
      { title: 'Card Number', field: 'cardNumber' },
      { title: 'Expire Date', field: 'expDate' },
      { title: 'CV', field: 'cvCode' },
      { title: 'Card Owner', field: 'cardOwner' },
    ]);


    /////////////////////////update rows
    const api = axios.create({
      baseURL: `http://localhost:5000`
    })

    const handleRowUpdate = (newData, oldData, resolve) => {
      //validation
      let errorList = []
    if(newData.cardNumber === ""){
      errorList.push("Please enter cardNumber")
    }
    if(newData.expDate === ""){
      errorList.push("Please enter expDate")
    }

    if(errorList.length < 1){
  
        api.put("/api/card/"+newData._id, newData)
        .then(res => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve()
          setIserror(false)
        })
        .catch(error => {
          setErrorMsg(["Update failed! Server error"])
          setIserror(true)
          resolve()
          
        })  
    }else{
      setErrorMsg(errorList)
      setIserror(true)
      resolve()

    }
  }
  
////////////Delete Row

  const handleRowDelete = (oldData, resolve) => {
    
    api.delete("/api/card/"+oldData._id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
        setSuccessMsg(["Delete success"])
        setIssucc(true)
      })
      .catch(error => {
        setErrorMsg(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }


    return (
      <div>
        <h1 id="h12" align="center">Credit Card Details</h1>
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
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleRowUpdate(newData, oldData, resolve);
            }),

          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              handleRowDelete(oldData, resolve)
            }),
        }}
        options={{
          search: false,
          showTitle: false,
          toolbar: false,
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
      </div>
      </div>
    );
  }

export default Editable;