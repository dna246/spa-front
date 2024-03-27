import styled, {css} from "styled-components";
import {primary} from "@/lib/colors";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  svg {
    height: 18px;
    margin-left: 5px;
  }
  ${props => props.$block && css`
    display: block;
    width: 100%;
  `}
  //box-sizing: border-box;
  ${props => props.$white && !props.$outline && css`
    background-color: #fff;
    color: #000;
  `}

  ${props => props.$white && props.$outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}

  ${props => props.$primary &&  !props.$outline && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color: #fff;
  `}

  ${props => props.$primary && props.$outline && css`
    background-color: transparent;
    border: 1px solid ${primary};
    color: ${primary};
  `}
  
  ${props => props.$size === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 25px;
    svg{
      height: 22px;
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;
export default function Button({children, ...etc}) {
    return (
        <StyledButton {...etc}>
            {children}
        </StyledButton>
    )
}