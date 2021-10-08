import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";//import user router
import couponRouter from "./routers/couponRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import cashOnDelivery from "./routers/cashOnRouter.js";
import userModel from "./models/userModel.js";
import productModel from "./models/productModel.js";
import oderModel from "./models/orderModel.js";
import cardRouter from "./routers/cardRouter.js";//import card router
import cors from "cors"



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URL ||
  "mongodb+srv://it20281564:it20281564@kingship.qd1bs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', "Content-Type");
  next();
})


app.use("/api/card", cardRouter);
//cash on router
app.use("/api/cash", cashOnDelivery);
//paypal
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});

// app.route('/getUser').get((req,res) => {
//   Users.find()
//   .then( User => res.json( User))
//   .catch(err => res.status(400).json('Error: '+err));
// });

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("/", (req, res) => {
  res.send("Server is Ready");
});

app.get("/getAllOrders", (req, res) => {
  oderModel.find()
  .then(order => res.json(order))
  .catch(err => res.status(400).json('Error: '+err));
});


app.delete("/deleteProfile/:email", (req, res) => {
  const email = req.params.email;
  userModel.findOneAndDelete({email : email})
  .then(() => {
      res.status(200).send({status :"Profile Deleted"});
  }).catch((err) => {
      console.log(err);
      res.status(500).send({status: "Error with Deleting Data",error: err.message});
  });
});

app.get("/getAllOrders/:start/:end", (req, res) => {
  const startPrice = req.params.start;
  const endPrice = req.params.end;
  oderModel.find({totalPrice : {$gte:startPrice,$lt:endPrice}})
  .then(order => res.json(order))
  .catch(err => res.status(400).json('Error: '+err));
});

app.get("/getAllProducts", (req, res) => {
  productModel.find()
  .then(product => res.json(product))
  .catch(err => res.status(400).json('Error: '+err));
});

app.get("/getAllOrders/:name", (req, res) => {
  const name = req.params.name;
  oderModel.find({'shippingAddress.fullName' : { $regex: ".*" + name + ".*", $options: 'i' }})
  .then(order => res.json(order))
  .catch(err => res.status(400).json('Error: '+err));
});

app.get("/getAllProducts/:name", (req, res) => {
  const name = req.params.name;
  productModel.find({name : { $regex: ".*" + name + ".*", $options: 'i' }})
  .then(product => res.json(product))
  .catch(err => res.status(400).json('Error: '+err));
});

app.get("/userModel", (req, res) => {
  userModel.find()
    .then( User => res.json( User))
    .catch(err => res.status(400).json('Error: '+err));
});

app.get("/userModel/:name", (req, res) => {
  const name = req.params.name;
  userModel.find({name : { $regex: ".*" + name + ".*", $options: 'i' } })
    .then( User => res.json( User))
    .catch(err => res.status(400).json('Error: '+err));
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
