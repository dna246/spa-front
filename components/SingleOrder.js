import styled from "styled-components";
import {formatCurrency, formatDate} from "@/lib/utils";


const StyledOrder = styled.div`
  margin: 10px 0;
  padding:10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 20px;
  align-items: center;
  time {
    font-size: .8rem;
    font-weight: bold;
    color: #555;
  }
`;

const ProductRow = styled.div`
  span {
    font-size: 0.8rem;
    color: #777;
  }
  em{
    font-size: 0.6rem;
  }
`;

const AccountDt = styled.div`
  font-size: .7rem;
  margin-top: 5px;
  line-height: 1rem;
  color: #555
`;


export default function SingleOrder({line_items, createdAt, ...rest}) {

    const calculateOrderTotal = (line_items) => {
        return line_items.reduce((total, item) => {
            const itemTotal = item.quantity * (item.price_data.unit_amount || 0);
            return total + itemTotal;
        }, 0);
    };

    return (
        <StyledOrder>
            <div>
                <time>{formatDate(createdAt)}</time>
                <AccountDt>
                    {rest.name}<br />
                    {rest.phone}<br />
                    {rest.email}<br />
                    {rest.address}
                </AccountDt>
            </div>
            <div>
                {line_items?.map((item, index) => (
                    <ProductRow key={`${item._id}-${index}`}>
                        <span>{item.quantity} x </span>
                        <em>{item.price_data.product_data.name}</em>
                    </ProductRow>
                ))}
            </div>
            <div>
                <small>{formatCurrency(calculateOrderTotal(line_items))}</small>
            </div>
        </StyledOrder>
    );
}