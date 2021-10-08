import express from "express";
import CashOn from "../models/cashOnModel.js";
const Router = express.Router();
  
//insert
Router.post(  '/addCashOn' , async (req, res) => {
    try { 
      const { receiverName, email, mobileNo, nic} = req.body;


      const cash = new CashOn({
        receiverName,
        email,  
        mobileNo,
        nic        
      });
    await cash.save().then
    res.send('successfully added Cash On Delivery Details');
    } catch (error) {
      res.status(400).send('Error while uploading  cash on delivery details. Try again later.');
    }
  },
  (error, req, res) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

//get all details
Router.get('/getAllCashOn', async (req, res) => {
  try {
    const cash = await CashOn.find({});
    const sortedByCreationDate = cash.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of cash on details. Try again later.');
  }
});
 

//Delete
Router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const removed = await CashOn.deleteOne({ _id: req.params.id});
    if (!removed)
      throw Error('Something went wrong while trying to delete the file');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

//Update
Router.put('/:id', async (req, res) =>{
  try {
    let cash = await CashOn.findById(req.params.id);
    const data = {
      receiverName: req.body.receiverName || cash.receiverName,
      email: req.body.email || cash.email,
      mobileNo: req.body.mobileNo || cash.mobileNo,
      nic: req.body.nic || cash.nic
    };
    cash = await CashOn.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(cash);
    res.send('successfully update cash on Details');
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});


export default Router;
