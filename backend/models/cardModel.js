import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    cardNumber:{type:String, required: true},
    expDate:{type:String, required: true},
    cvCode:{type:String, required: true},
    cardOwner:{type:String, required: true},
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{
    timestamps: true,
  }
);

const Card = mongoose.model('Card', CardSchema);
export default Card;