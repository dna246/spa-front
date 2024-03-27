import styled from "styled-components";
import Center from "@/components/Center";
import ProductBox from "@/components/ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;

const Title =styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 500;
`;

export default function NewProducts ({latestProducts}) {
    return (
        <Center>
            <Title>Sản phẩm mới</Title>
            <ProductsGrid>
                {latestProducts?.length > 0 && latestProducts.map((latestProduct, index) => (
                    <ProductBox key={index} {...latestProduct} />
                ))}
            </ProductsGrid>
        </Center>

    )
}
