import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({products, services}) {
    return (
        <StyledProductsGrid>
            {products?.map(product => (
                <ProductBox key={product._id} {...product} itemType="product" />
            ))}
            {services?.map(service => (
                <ProductBox key={service._id} {...service} itemType="service" />
            ))}
        </StyledProductsGrid>
    );
}

