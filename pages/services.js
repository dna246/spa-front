import Header from "@/components/Header";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { fetchServices } from "@/lib/fetchServices";

export default function ServicesPage({services}) {
    return (
        <>
            <Header />
            <Center>
                <Title>Toàn bộ Dịch vụ</Title>
                <ProductsGrid services={services} />
            </Center>
        </>
    );
}

export async function getServerSideProps() {
    const services = await fetchServices();
    return {
        props: {
            services: JSON.parse(JSON.stringify(services)),
        },
    };
}