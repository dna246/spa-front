import mongoose, {model, models, Schema} from "mongoose";

const AccountDtSchema = new Schema({
    userEmail: {type:String, unique:true, required:true},
    name: String,
    email: String,
    phone: String,
    address: String,
})

export const AccountDt = models?.AccountDt || model('AccountDt', AccountDtSchema)