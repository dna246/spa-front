import styled from "styled-components";
import {formatDate} from "@/lib/utils";
import axios from "axios";
import Button from "@/components/Button";


const StyledOrder = styled.div`
  margin: 10px 0;
  padding:10px 0;
  border-bottom: 1px solid #ddd;
  display: grid;
  grid-template-columns: 1.5fr .5fr 1fr;
  gap: 20px;
  align-items: center;
  
  time {
    font-size: .8rem;
    font-weight: bold;
    color: #555;
  }
`;

const ServiceMapping = styled.div`
  font-size: .9rem;
  margin-top: 5px;
  line-height: 1rem;
  padding: 5px 0;
  font-style: italic;
`;

const AccountDt = styled.div`
  font-size: .8rem;
  margin-top: 5px;
  line-height: 1rem;
  color: #555
`;


export default function SingleBooking({bookedServices, createdAt, ...props}) {
    const handleUserCancel = async () => {
        try {
            const response = await axios.post(`/api/bookings/${props._id}/cancel`);
            console.log('Booking cancelled by user', response.data);
            props.onCancel(props._id);
        } catch (error) {
            console.error("Failed to cancel booking:", error);
        }
    };
    return (
        <StyledOrder>
            <div>
                <time>{formatDate(createdAt)}</time>
                <ServiceMapping>
                    {bookedServices?.map((service, index) => (
                        <div key={index}>
                            {service.name}
                        </div>
                    ))}
                </ServiceMapping>
            </div>
            <div>
                <AccountDt>
                    {props.name} <br/>
                    {formatDate(props.date, 'vn-VN', false)} <br/>
                    {props.timeSlot}

                </AccountDt>
            </div>
            <div>
                <>
                    {props.status === 'Đang xử lý' ? (
                        <Button $outline={1} $primary={1}
                                onClick={handleUserCancel}
                        >
                            Huỷ hẹn
                        </Button>
                    ) : (
                        <>
                            {props.status === 'Xác nhận' && (
                                <span className="text-green-600">
                                    Đã xác nhận
                                </span>
                            )}
                            {props.status === 'Huỷ bởi YLA' && (
                                <span className="text-red-600">
                                    Huỷ bởi YLA
                                </span>
                            )}
                            {props.status === 'Đã Huỷ' && (
                                <span className="text-red-600">
                                    Đã huỷ
                                </span>
                            )}
                        </>
                    )}
                </>
            </div>

        </StyledOrder>
    );
}