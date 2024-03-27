import {mongooseConnect} from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SECRET);
import {buffer} from 'micro';
import {Order} from "@/models/Order";

const endpointSecret = "whsec_865e98f82f0795a31c444a07447646d8f62cd280b7027b9ea596b2b67a0d0a00";

export default async function handler(req, res){
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metadata.orderId;
            const paid = data.payment_status === 'paid';
            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId,{
                    paid:true,
                })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('ok');
}

export const config = {
    api: {bodyParser:false,}
};


// grace-works-wisely-easier