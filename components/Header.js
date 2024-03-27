import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";

const StyledHeader = styled.header`
  background-color: #ffdbec;
`;
const Logo = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: #000;
  text-decoration: none;

`;


export default function Header() {
    const {cartProducts} = useContext(CartContext)
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>YLA Spa</Logo>
                    <StyledNav>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>Sản phẩm</NavLink>
                        <NavLink href={'/services'}>Dịch vụ</NavLink>
                        {/*<NavLink href={'/categories'}>Danh mục</NavLink>*/}
                        <NavLink href={'/booking'}>Đặt hẹn</NavLink>
                        <NavLink href={'/account'}>Tài khoản</NavLink>
                        <NavLink href={'/cart'}>Giỏ hàng ({cartProducts.length})</NavLink>
                    </StyledNav>
                </Wrapper>
            </Center>
        </StyledHeader>
    )
}