import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useEffect, useState} from "react";
import { fetchServices } from "@/lib/fetchServices";

import axios from "axios";
import BookingForm from "@/components/BookingForm";
import StyledInput from "@/components/Input"
import {useSession} from "next-auth/react";


const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;


const StyledLabel = styled.label`
  color: #BD195D;
`;

export default function BookingPage({services, initialSelectedServices}) {
    const {data:session} = useSession()
    const [selectedServices, setSelectedServices] = useState(initialSelectedServices || '');
    const [date, setDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [selectedDate, setSelectedDate] = useState('')
    const [isSuccess, setIsSuccess] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [accountdtLoaded, setAccountdtLoaded] = useState(true)

    useEffect(() => {
        if (!session) {
            return;
        }
        setAccountdtLoaded(false)
        axios.get('/api/accountdt').then(res => {
            setName(res.data.name)
            setEmail(res.data.email)
            setPhone(res.data.phone)
            setAccountdtLoaded(true)
        })
    }, [session])
    const handleServiceChange = (serviceId) => {
        setSelectedServices(prevSelectedServices => {
            const currentSelectedServices = Array.isArray(prevSelectedServices) ? prevSelectedServices : [];
            // Check serviceId co trong selectedServices array chua
            if (currentSelectedServices?.includes(serviceId)) {
                // Co r thi remove
                return currentSelectedServices?.filter(id => id !== serviceId);
            } else {
                // Chua thi add
                return [...currentSelectedServices, serviceId];
            }
        });
    };
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        console.log(setSelectedDate)
    };
    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (selectedServices.length === 0) {
            alert('Xin chọn ít nhất 1 dịch vụ để tiếp tục');
            return;
        }
        const bookingData = {
            name,
            email,
            phone,
            bookedServices: selectedServices.map(serviceId => {
                const service = services.find(s => s._id === serviceId);
                if (service) {
                    return {
                        serviceId,
                        name: service.title,
                        unit_amount: service.price
                    };
                }
                return null;
            }).filter(service => service !== null),
            date: selectedDate,
            timeSlot: selectedTimeSlot,
            status: 'Đang xử lý',
            isCompleted: false,
        };
        try {
            const response = await axios.post('/api/booking', bookingData);
            console.log('Booking successful', response.data);
            setIsSuccess(true);
            setSelectedServices([]);
            setDate('');
            setSelectedTimeSlot('');

        } catch (error) {
            console.error("Booking failed:", error);
        }
    };

    if (isSuccess) {
        return (
            <>
                <Header />
                <Center>
                    <Box>
                        <h1>Đặt lịch thành công</h1>
                        <p>YLA sẽ xác nhận lịch hẹn sớm nhất và thông báo đến bạn!</p>
                        <Button $outline={1} onClick={() => setIsSuccess(false)}>Đặt thêm hẹn</Button>
                    </Box>
                </Center>
            </>
        );
    }



    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>

                        <form onSubmit={handleBookingSubmit}>
                            <h2>Đặt hẹn dịch vụ spa</h2>

                            {accountdtLoaded && (
                                <>
                                    <StyledInput
                                        type="text"
                                        placeholder="Họ Tên"
                                        value={name}
                                        onChange={ev => setName(ev.target.value)}
                                        required
                                    />
                                    <StyledInput
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={ev => setEmail(ev.target.value)}
                                        required
                                    />
                                    <StyledInput
                                        type="text"
                                        placeholder="Số điện thoại"
                                        value={phone}
                                        onChange={ev => setPhone(ev.target.value)}
                                        required
                                    />
                                </>
                            )}
                            <hr/>
                            <StyledLabel>Chọn dịch vụ</StyledLabel>


                            <div>
                                {services?.map((service) => (
                                    <div key={service._id}>
                                        <input
                                            type="checkbox"
                                            id={`service_${service._id}`}
                                            name="services"
                                            value={service._id}
                                            checked={selectedServices?.includes(service._id)}
                                            onChange={() => handleServiceChange(service._id)}
                                        />
                                        <label htmlFor={`service_${service._id}`}>{service.title}</label>
                                    </div>
                                ))}
                            </div>


                            <BookingForm
                                selectedDate={selectedDate}
                                setDate={handleDateChange}
                                selectedTimeSlot={selectedTimeSlot}
                                setSelectedTimeSlot={setSelectedTimeSlot} />
                            <hr/>
                            <Button $primary={1} type="submit">Đặt hẹn</Button>
                        </form>

                    </Box>
                </ColumnsWrapper>
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    const services = await fetchServices();
    const { serviceId } = context.query;
    const initialSelectedServices = serviceId ? [serviceId] : [];

    return {
        props: {
            services: JSON.parse(JSON.stringify(services)),
            selectedServiceId: serviceId || null,
            initialSelectedServices,
        },
    };
}
