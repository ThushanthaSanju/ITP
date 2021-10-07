import express from "express";
import expressAsyncHandler from "express-async-handler";
import Coupon from "../models/couponModel.js";
import { isAdmin, isAuth } from "../utils.js";

const couponRouter = express.Router();

couponRouter.post(
  "/createcoupon",
  expressAsyncHandler(async (req, res) => {
    console.log("test");

    const coupon = new Coupon({ //assign values to coupon model from ui
      name: req.body.name,
      code: req.body.code,
      amount: req.body.amount,
      count: req.body.count,
      expireDate: req.body.expireDate,
    });
    const createdCoupon = await coupon.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(600).json({
          message: "Error happended when creating coupon.",
          error: err
        });
      }

      return res.status(201).json({
        message: "Coupon created successfully.",
        success: true
      });
    });
  })
);

couponRouter.get(
  "/get/:id",
  expressAsyncHandler(async (req, res) => {
    let query = { code: req.params.id }
    const coupon = await Coupon.findOne(query);
    if (coupon) {
      res.send(coupon);
    } else {
      res.status(404).send({ message: "Coupon Not Found" });
    }
  })
);

couponRouter.get(
  "/getall",
  expressAsyncHandler(async (req, res) => {
    const coupons = await Coupon.find({});
    console.log(coupons);

    res.send(coupons);
  })
);

couponRouter.delete(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      const deleteCoupon = await coupon.remove();
      res.send({ message: "Coupon Deleted", coupon: deleteCoupon });
    } else {
      res.status(404).send({ message: "Coupon Not Found" });
    }
  })
);

couponRouter.patch(
  "/update/:id",
  expressAsyncHandler(async (req, res) => {
    let query = { code: req.params.id }
    const coupon = await Coupon.findOne(query);
    if (coupon) {
      if (req.body.name) { coupon.name = req.body.name }
      if (req.body.code) { coupon.code = req.body.code }
      if (req.body.count) { coupon.count = req.body.count }
      if (req.body.amount) { coupon.amount = req.body.amount }
      if (req.body.expireDate) { coupon.expireDate = req.body.expireDate }
      if (req.body.usageCount) { coupon.usageCount = req.body.usageCount }
      if (coupon.expireDate < Date.now() || coupon.usageCount >= coupon.count) { coupon.isValid = false } //validate coupn with date and count

      const updatedCoupon = await coupon.save((err, updated_object) => { //save the updated coupn in db
        if (err) { return next(err) }
        res.status(200).json({
          success: true,
          code: 200,
          data: updated_object,
        });
      });
    } else {
      res.status(404).send({ message: "Coupon Not Found" });
    }
  })
);

export default couponRouter;
