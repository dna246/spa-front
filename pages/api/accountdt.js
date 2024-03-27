import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {AccountDt} from "@/models/AccountDt";

export default async function handler(req, res) {
    await mongooseConnect();
    if (req.method === 'PUT') {
        const {user} = await getServerSession(req, res, authOptions);
        const accountdt = await AccountDt.findOne({userEmail:user.email})
        if (accountdt) {
            res.json(await AccountDt.findByIdAndUpdate(accountdt._id, req.body))

        } else {
            res.json(await AccountDt.create({userEmail:user.email, ...req.body}))
        }
    }
    if (req.method === 'GET') {
        const {user} = await getServerSession(req, res, authOptions);
        const accountdt = await AccountDt.findOne({userEmail:user.email})
        res.json(accountdt)
    }
}