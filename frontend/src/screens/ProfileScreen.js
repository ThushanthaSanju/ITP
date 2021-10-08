import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../components/ComponentToPrint";

import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import background from "../img/regScreen1.jpg";
import passwordValidator from 'password-validator';
import axios from 'axios';
import Swal from 'sweetalert2';

var schema = new passwordValidator();

export default function ProfileScreen() {

  schema
  .is().min(4)                               
  .is().max(100)                           
  .has().lowercase()                         
  .has().digits(2)       
  .has().not().spaces()  
  .is().not().oneOf(['Passw0rd', 'Password123']); 
  //report
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile

    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
    }
  };

  const [isValidCFpassword, setIsValidCfpassword] = useState(false);
  const [messagepassword, setmessagepassword] = useState('');

  function set_Password(e)
  {
    const typedPass =e;
    if(schema.validate(typedPass) === false) {
      setIsValidCfpassword(false);
      setmessagepassword('Password is not strong');
    }else{
          setIsValidCfpassword(true);
          setmessagepassword('Password is strong');
    }
    setPassword(typedPass)
  }

  const emailSeller = localStorage.getItem("email");
  function profileDelete(){
    axios.delete("http://localhost:5000/deleteProfile/"+emailSeller).then(() =>{

      Swal.fire({  
      title: "Success!",
      text: "Profile Delete Success!",
      icon: 'success',
      confirmButtonText: "OK",
      type: "success"}).then(okay => {
          if (okay) {
              window.location.href = "/";
          }
      });
      }).catch((err)=>{

        Swal.fire({  
        title: "Error!",
        text: "Profile Delete Not Success",
        icon: 'error',
        confirmButtonText: "OK",
        type: "success"})
      })
  }
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
      }}
    >
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required="true"
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                required="true"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required="true"
                placeholder="Enter password"
                onChange={(e) => set_Password(e.target.value)}
              ></input>
             <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                            {messagepassword}
              </span>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                required="true"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            {user.isSeller && (
              <>
                <h2>Seller</h2>
                <div>
                  <label htmlFor="sellerName">Seller Name</label>
                  <input
                    id="sellerName"
                    type="text"
                    placeholder="Enter Seller Name"
                    value={sellerName}
                    required="true"
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">Seller Logo</label>
                  <input
                    id="sellerLogo"
                    type="text"
                    required="true"
                    placeholder="Enter Seller Logo"
                    value={sellerLogo}
                    onChange={(e) => setSellerLogo(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerDescription">Seller Description</label>
                  <input
                    id="sellerDescription"
                    type="text"
                    required="true"
                    placeholder="Enter Seller Description"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )}
            <div >
              <label />

              <button className="primary" type="submit">
                Update
              </button>
              <button className="danger" style={{marginTop:'2%', alignItems:'end'}} onClick={profileDelete} type="submit">
                Delete
              </button>
            </div>
            <div>
              <ComponentToPrint ref={componentRef} />
              <br />

              <br />
            </div>
          </>
        )}
      </form>
    </div>
  );
}
