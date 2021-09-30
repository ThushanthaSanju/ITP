import express from "express";
import Card from "../models/cardModel.js";
import bcrypt from "bcryptjs";
const Router = express.Router();
  
Router.post(  '/addCard' , async (req, res) => {
    try { 
      const { cardNumber,expDate, cvCode, cardOwner} = req.body;

      const salt = await bcrypt.genSalt();
      const cvHash = await bcrypt.hash(cvCode, salt);

      const barrow = new Card({
        cardNumber,
        expDate,  
        cvCode: cvHash,
        cardOwner        
      });
    await barrow.save().then
    res.send('successfully added card Details');
    } catch (error) {
      res.status(400).send('Error while uploading card details. Try again later.');
    }
  },
  (error, req, res) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get('/getAllCard', async (req, res) => {
  try {
    const card = await Card.find({}).sort({$natural:-1}).limit(1);
    const sortedByCreationDate = card.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of Cards. Try again later.');
  }
});
 

//Delete
Router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const removed = await Card.deleteOne({ _id: req.params.id});
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
    let card = await Card.findById(req.params.id);
    const data = {
      cardNumber: req.body.cardNumber || card.cardNumber,
      expDate: req.body.expDate || card.expDate,
      cvCode: req.body.cvCode || card.cvCode,
      cardOwner: req.body.cardOwner || card.cardOwner
    };
    card = await Card.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(card);
    res.send('successfully update card Details');
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});


export default Router;



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import express from "express";
// import expressAsyncHandler from "express-async-handler";
// import Card from "../models/cardModel.js";
// // import User from '../models/userModel.js';
// import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

// const cardRouter = express.Router();

// cardRouter.get(
//   "/",
//   isAuth,
//   isSellerOrAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const seller = req.query.seller || "";
//     const sellerFilter = seller ? { seller } : {};

//     const cards = await Card.find({ ...sellerFilter }).populate(
//       "user",
//       "name"
//     );
//     res.send(cards);
//   })
// );

// cardRouter.get(
//   "/getAllCard",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const cards = await Card.find({ user: req.user._id });
//     res.send(cards);
//   })
// );

// cardRouter.post(
//   "/addCard",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//       const card = new Card({
//         seller: req.body.cardNumber[0].seller,
//         cardNumber: req.body.cardNumber,
//         expDate: req.body.expDate,
//         cvCode: req.body.cvCode,
//         cardOwner: req.body.cardOwner,
//         user: req.user._id,
//       });
//       const createdOrder = await card.save();
//       res
//         .status(201)
//         .send({ message: "New Card Created", card: createdOrder });
    
//   })
// );

// cardRouter.get(
//   "/:id",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const card = await Card.findById(req.params.id);
//     if (card) {
//       res.send(card);
//     } else {
//       res.status(404).send({ message: "Card Not Found" });
//     }
//   })
// );

// cardRouter.put(
//   "/:id/pay",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const card = await Card.findById(req.params.id);
//     if (card) {
//       card.isPaid = true;
//       card.paidAt = Date.now();
//       card.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.email_address,
//       };
//       const updatedOrder = await card.save();
//       res.send({ message: "Card Paid", card: updatedOrder });
//     } else {
//       res.status(404).send({ message: "Card Not Found" });
//     }
//   })
// );
// cardRouter.delete(
//   "/:id",
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const card = await Card.findById(req.params.id);
//     if (card) {
//       const deleteOrder = await card.remove();
//       res.send({ message: "Card Deleted", card: deleteOrder });
//     } else {
//       res.status(404).send({ message: "Card Not Found" });
//     }
//   })
// );

// export default cardRouter;
