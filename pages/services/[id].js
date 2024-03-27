import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import {mongooseConnect} from "@/lib/mongoose";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/Cart";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import {formatCurrency} from "@/lib/utils";
import {Service} from "@/models/Service";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ServicePage({service}) {
    const {addProduct} = useContext(CartContext);
    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={service.images} />
                    </WhiteBox>
                    <div>
                        <Title>{service.title}</Title>
                        <p>{service.description}</p>
                        <PriceRow>
                            <div>
                                <Price>{formatCurrency(service.price)}</Price>
                            </div>
                            <div>
                                <Button as="a" href={`/booking`} $primary={1}>
                                    Đặt hẹn
                                </Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const service = await Service.findById(id);
    return {
        props: {
            service: JSON.parse(JSON.stringify(service)),
        }
    }
}