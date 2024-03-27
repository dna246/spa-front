import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Booking} from "@/models/Booking";
import { Service } from "@/models/Service";


export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'GET') {
        const {user} = await getServerSession(req, res, authOptions);
        try {
            const bookings = await Booking.find({userEmail:user.email});
            return res.status(200).json(bookings);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            return res.status(500).json({ message: 'Failed to fetch bookings' });
        }

    } else if (req.method === 'POST') {
        const {
            name, email, phone, bookedServices,
            date, timeSlot, status, isCompleted
        }
            = req.body;

        console.log('Booking data from api/booking:', req.body);
        const session = await getServerSession(req, res, authOptions)
        try {
            const serviceDetails = await Service.find({
                '_id': { $in: bookedServices.map(bs => bs.serviceId) }
            });

            const updatedBookedServices = bookedServices.map(bs => {
                const serviceDetail = serviceDetails.find(sd => sd._id.toString() === bs.serviceId);
                return {
                    ...bs,
                    unit_amount: serviceDetail?.price || 0,
                };
            });

            const booking = await Booking.create({
                name,
                email,
                phone,
                userEmail: session?.user?.email,
                bookedServices: updatedBookedServices,
                date,
                timeSlot,
                status,
                isCompleted,
            });
            return res.status(200).json({ success: true, booking });
        } catch (error) {
            console.error('Booking creation failed:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} not allowed`);
    }
}