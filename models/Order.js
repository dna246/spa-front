import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema ({
    userEmail: String,
    line_items: Object,
    name: String,
    email: String,
    phone: String,
    address: String,
    paid:Boolean
}, {
    timestamps: true,
})

export const Order = models?.Order || model('Order', OrderSchema)