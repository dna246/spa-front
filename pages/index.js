import Header from "@/components/Header";
import Featured from "@/components/Featured";
import {mongooseConnect} from "@/lib/mongoose";
import {Service} from "@/models/Service";
import {Product} from "@/models/Product";
import NewProducts from "@/components/NewProducts";


export default function HomePage({service, latestProducts}) {
    return (
        <div>
            <Header />
            <Featured service={service} />
            <NewProducts latestProducts={latestProducts} />

        </div>
    );
}

export async function getServerSideProps() {
    const featuredServiceId = '65f6c3c5e200b53c09e10808';
    const featuredProductId = '65850529f203fe41f6b203d4'
    await mongooseConnect()
    const service = await Service.findById(featuredServiceId)
    const product = await Product.findById(featuredProductId)
    const latestProducts = await Product.find({}, null, {sort: {'_id':-1}})
    return {
        props: {
            service: service ? JSON.parse(JSON.stringify(service)) : null,
            product: product ? JSON.parse(JSON.stringify(product)) : null,
            latestProducts: latestProducts ? JSON.parse(JSON.stringify(latestProducts)) : null,
        },
    }
}