import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";

const Bg = styled.div`
  background-color: #ffdbec;
  color: #000;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color: #000;
  font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;



export default function Featured({service}) {

    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{service.title}</Title>
                            <Desc>{service.description}</Desc>
                            <ButtonsWrapper>
                                <ButtonLink href={'/services/' + service._id} $outline={1} $white={1}>Tìm hiểu thêm</ButtonLink>
                                <Button as="a" href={`/booking?serviceId=${service._id}`} $primary={1}>
                                    Đặt hẹn ngay
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </Button>

                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src="https://next-yla-spa.s3.amazonaws.com/1710670755157.png" alt=""/>
                    </Column>
                </ColumnsWrapper>

            </Center>
        </Bg>
    )
}