import Header from "@/components/Header";
import Title from "@/components/Title";
import Center from "@/components/Center";
import {signIn, signOut, useSession} from "next-auth/react";
import Button from "@/components/Button";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import Input from "@/components/Input";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";
import SingleBooking from "@/components/SingleBooking";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin: 40px 0 ;
`;

export default function AccountPage() {
    const {data:session} = useSession()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [accountdtLoaded, setAccountdtLoaded] = useState(true)
    const [orderLoaded, setOrderLoaded] = useState(true)
    const [bookingLoaded, setBookingLoaded] = useState(true)
    const [activeTab, setActiveTab] = useState('Đơn Hàng')
    const [orders, setOrders] = useState([])
    const [bookings, setBookings] = useState([])

    async function logout() {
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        });
    }

    async function login() {
        await signIn('google', {
            callbackUrl: process.env.NEXT_PUBLIC_URL
        })
    }

    function saveAccountDt() {
        const data = {name, email, phone, address}
        axios.put('/api/accountdt', data)
    }

    const handleBookingCancellation = (cancelledBookingId) => {
        setBookings(currentBookings =>
            currentBookings.map(booking =>
                booking._id === cancelledBookingId ? { ...booking, status: 'Đã Huỷ' } : booking
            )
        );
    };

    useEffect(() => {
        if (!session) {
            return;
        }
        setAccountdtLoaded(false)
        setOrderLoaded(false)
        setBookingLoaded(false)
        axios.get('/api/accountdt').then(res => {
            setName(res.data.name)
            setEmail(res.data.email)
            setPhone(res.data.phone)
            setAddress(res.data.address)
            setAccountdtLoaded(true)
        })
        axios.get('/api/orders').then(res => {
            setOrders(res.data)
            setOrderLoaded(true)
        })
        axios.get('/api/booking').then(res => {
            setBookings(res.data)
            setBookingLoaded(true)
        })
    }, [session])


    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <div>
                        <WhiteBox>
                            <Title>Lịch sử</Title>
                            <Tabs tabs={['Đơn Hàng', 'Đặt Hẹn']}
                                  isActive={activeTab}
                                  onChange={setActiveTab}
                            />
                            <>
                                {activeTab === 'Đơn Hàng' && (
                                    <>
                                        {!orderLoaded && (
                                            <Spinner fullWidth={true}/>
                                        )}
                                        {orderLoaded && (
                                            <div>
                                                {orders?.length === 0 && (
                                                    <p>Không có lịch sử đơn hàng.</p>
                                                )}
                                                {orders?.length > 0 && orders.map(order => (
                                                    <SingleOrder key={order._id} {...order} />
                                                ))}
                                            </div>
                                        )}

                                    </>
                                ) }
                                {activeTab === 'Đặt Hẹn' && (
                                    <>
                                        {!bookingLoaded && (
                                            <Spinner fullWidth={true}/>
                                        )}
                                        {bookingLoaded && (
                                            <div>
                                                {bookings?.length === 0 && (
                                                    <p>Chưa có lịch sử đặt hẹn.</p>
                                                )}
                                                {bookings?.length > 0 && bookings.map(booking => (
                                                    <SingleBooking
                                                        key={booking._id}
                                                        {...booking}
                                                        onCancel={handleBookingCancellation}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) }
                            </>
                        </WhiteBox>
                    </div>
                    <div>
                        <WhiteBox>
                            <h2>Thông tin tài khoản</h2>
                            {!accountdtLoaded && (
                                <Spinner fullWidth={true} />
                            )}
                            {accountdtLoaded && (
                                <>
                                    <Input type="text"
                                           placeholder="Họ Tên"
                                           value={name}
                                           name="name"
                                           onChange={ev => setName(ev.target.value)}
                                    />
                                    <Input type="text"
                                           placeholder="Email"
                                           value={email}
                                           name="email"
                                           onChange={ev => setEmail(ev.target.value)}
                                    />
                                    <Input type="text"
                                           placeholder="SĐT"
                                           value={phone}
                                           name="phone"
                                           onChange={ev => setPhone(ev.target.value)}
                                    />
                                    <Input type="text"
                                           placeholder="Địa chỉ"
                                           value={address}
                                           name="address"
                                           onChange={ev => setAddress(ev.target.value)}
                                    />

                                    <Button $block={1} $primary={1}
                                            onClick={saveAccountDt}
                                    >
                                        Lưu thông tin
                                    </Button>
                                    <hr/>
                                </>
                            )}


                            {session && (
                                <Button $primary={1} onClick={logout}>Đăng xuất</Button>
                            )}
                            {!session && (
                                <Button $primary={1} onClick={login}>Đăng nhập</Button>
                            )}
                        </WhiteBox>
                    </div>
                </ColWrapper>


            </Center>
        </>
    )
}