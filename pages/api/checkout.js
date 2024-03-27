import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Order} from "@/models/Order";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async function handler(req, res){
    if (req.method !== 'POST') {
        res.json('should be a POST request')
        return;
    }
    const {
        name, email,
        phone, address,
        cartProducts,
    } = req.body;
    await mongooseConnect()
    const productIds = cartProducts;
    const uniqueIds = [...new Set(productIds)];
    const productInfos = await Product.find({_id: uniqueIds})

    let line_items = [];
    for (const productId of uniqueIds) {
        const productInfo = productInfos.find(p => p._id.toString() === productId);
        const quantity = productIds.filter(id => id === productId)?.length || 0
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'VND',
                    product_data: {name:productInfo.title},
                    unit_amount: productInfo.price,
                }
            })
        }
    }

    const session = await getServerSession(req, res, authOptions)

    const orderDoc = await Order.create({
        line_items, name, email, phone, address, paid:false,
        userEmail: session?.user?.email,
    })

    const stripeSession = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
        metadata: {orderId:orderDoc._id.toString()},
    })

    res.json({
        url: stripeSession.url,
    })

}

