import React, { useEffect, useRef , useState} from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../components/ComponentToPrint";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import jsPDF from 'jspdf';
import { USER_DETAILS_RESET } from "../constants/userConstants";

export default function UserListScreen(props) {
  //report
  const componentRef = useRef();
 


  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(listUsers());
  //   dispatch({
  //     type: USER_DETAILS_RESET,
  //   });
  // }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(user._id));
    }
  };

  const [usersProfile,setUserList] = useState([])
   useEffect(() => {
       axios.get("http://localhost:5000/userModel")
       .then(res => setUserList(res.data))
       .catch(error => console.log(error));
   },[])

  const [searchName,setNameSearch] = useState("");
  function searchUsingName()
  {
    axios.get("http://localhost:5000/userModel/"+searchName)
    .then(res => setUserList(res.data))
    .catch(error => console.log(error));
  }

  
  function cancelSearch()
  {
      setNameSearch("");
      axios.get("http://localhost:5000/userModel")
      .then(res => setUserList(res.data))
      .catch(error => console.log(error));
  }


  console.log(usersProfile);
  function handlePrint()
  {
    axios.get("http://localhost:5000/userModel")
    .then(res => setUserList(res.data))
    .catch(error => console.log(error));

    var doc = new jsPDF('p', 'pt');
    doc.setTextColor(254, 8, 8 );
    doc.text(20, 20, "User List")
    doc.text(25, 30, '---------------------------')
    doc.addFont('helvetica', 'normal')
    doc.setFontSize(12);
    doc.setTextColor(3, 3, 3);
    // eslint-disable-next-line no-lone-blocks
    localStorage.setItem("usersProfile", JSON.stringify(usersProfile));
    
    // retrieving our data and converting it back into an array
    var usersProfileData = localStorage.getItem("usersProfile");
    var profile = JSON.parse(usersProfileData);

    let count = 90;
    doc.text(25, 50, "Total Users : "+profile.length)
    doc.text(25, 80, "Data Structure : Name\t-\tEmail\t-\tIs Seller\t-\tIs Admin")
    
    doc.setFontSize(11);
   for(var i = 0; i < profile.length; i++)
   {
       count = count+20;
      doc.text(25, count, profile[i].name+" - "+profile[i].email+" - "+profile[i].isSeller+" - "+profile[i].isAdmin)
   }
   
    doc.save('Users List.pdf')
  }
  return (
    <div>
      <h1>Users</h1>
      <div class="mb-3 mt-5 row container">
        <div class="col-10">
            <div class="input-group mb-3">
            &nbsp;&nbsp;<input type="text" class="form-control" placeholder="Type Name.."  aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) =>{
                setNameSearch(e.target.value);
            }}/>
            <button class="btn btn-dark" type="button" id="button-addon2" style={{backgroundColor:'black', color:'white'}} onClick={cancelSearch}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        </div>
        <div class="col-2">
        <button class="btn btn-dark" type="button" id="button-addon2" style={{backgroundColor:'green', color:'white'}}  onClick={searchUsingName}>Search</button>
        </div>
     </div>
      {/* {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : ( */}
       
        <table className="table " style={{marginTop:'2%'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
          {usersProfile.map((user,key) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? "YES" : " NO"}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* )} */}
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
          Generate Report User List
        </button>
        <br />
      </div>
    </div>
  );
}
