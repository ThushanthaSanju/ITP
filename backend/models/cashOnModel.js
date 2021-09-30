import mongoose from 'mongoose';

const CashOnSchema = new mongoose.Schema({
    receiverName:{type:String, required: true},
    email:{type:String, required: true},
    mobileNo:{type:String, required: true},
    nic:{type:String, required: true},
},
{
    timestamps: true,
  }
);

const CashOn = mongoose.model('CashOn', CashOnSchema);
export default CashOn;