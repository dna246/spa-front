import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/Cart";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import {formatCurrency} from "@/lib/utils";
import ButtonLink from "@/components/ButtonLink";

const ProductWrapper = styled.div`

`;


const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 140px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
  
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;  
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  
`;

export default function ProductBox({_id, title, description, price, images, itemType="product"}) {
    const {addProduct} = useContext(CartContext)
    const url = itemType === 'product' ? `/products/${_id}` : `/services/${_id}`;
    return (
        <ProductWrapper>
            <WhiteBox as="a" href={url}> {}
                <img src={images?.[0]} alt={title}/>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>
                        {formatCurrency(price)}
                    </Price>
                    {itemType === 'product' ? (
                        <Button onClick={() => addProduct(_id)} $primary={1} $outline={1}>
                            <CartIcon/>
                        </Button>
                    ) : (
                        <ButtonLink as="a" href={`/booking?serviceId=${_id}`} $primary={1} $outline={1}>
                            Đặt hẹn
                        </ButtonLink>
                    )}
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    )
}


