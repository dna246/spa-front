import {mongooseConnect} from "@/lib/mongoose";
import {Service} from "@/models/Service";

export async function fetchServices() {
    await mongooseConnect();
    const services = await Service.find({}, null, {sort:{'_id': -1}}).lean();
    return services;
}
