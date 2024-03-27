import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {CartContext} from "@/components/CartContext";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Table from "@/components/Table";
import {formatCurrency} from "@/lib/utils";
import Input from "@/components/Input";
import {useSession} from "next-auth/react";


const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  background-color: #fff;
  //border: .5px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100px;
    max-height: 100px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;


export default function CartPage() {
    const {data:session} = useSession();
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [isSuccess,setIsSuccess] = useState(false);
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', {ids:cartProducts})
                .then(response => {
                    setProducts(response.data)
                })
        } else {
            setProducts([])
        }
    }, [cartProducts])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
        }, []);
    useEffect(() => {
        if (!session) {
            return;
        }
        axios.get('/api/accountdt').then(res => {
            setName(res.data.name)
            setEmail(res.data.email)
            setPhone(res.data.phone)
            setAddress(res.data.address)
        });
    }, [session]);

    function addQuantity(id) {
        addProduct(id)
    }

    function minusQuantity(id) {
        removeProduct(id)
    }

    let total = 0
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    async function goToPayment() {
        const res = await axios.post('/api/checkout', {
            name, email, phone, address,
            cartProducts,
        })
        if (res.data.url) {
            window.location = res.data.url
        }
    }

    if (isSuccess) {
        return(
            <>
                <Header />
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Cảm ơn bạn đã mua hàng</h1>
                            <p>YLA sẽ gửi thông báo qua email khi đơn hàng bạn được giao.</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        )
    }

    return (
       <>
           <Header />
           <Center>
               <ColumnsWrapper>
                   <Box>
                       <h2>Giỏ Hàng</h2>
                       {!cartProducts?.length && (
                           <div>Giỏ hàng của bạn đang trống</div>
                       )}
                       {products?.length > 0 && (
                           <Table>
                               <thead>
                                   <tr>
                                       <th>Sản phẩm</th>
                                       <th>Số lượng</th>
                                       <th>Giá</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   {products.map(product => (
                                       <tr key={product._id}>
                                           <ProductInfoCell>
                                               <ProductImageBox>
                                                   <img src={product.images?.[0]} alt=""/>
                                               </ProductImageBox>
                                               {product.title}
                                           </ProductInfoCell>
                                           <td>
                                               <Button
                                                   onClick={() => minusQuantity(product._id)
                                                   }>-</Button>
                                               <QuantityLabel>
                                                   {cartProducts.filter(id => id === product._id).length}
                                               </QuantityLabel>
                                               <Button
                                                   onClick={() => addQuantity(product._id)
                                               }>+</Button>
                                           </td>
                                           <td>
                                               {formatCurrency(cartProducts.filter(id => id === product._id).length * product.price)}
                                           </td>
                                       </tr>
                                   ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>{formatCurrency(total)}</td>
                                    </tr>
                               </tbody>
                           </Table>
                       )}
                   </Box>
                   {!!cartProducts?.length && (
                       <Box>
                           <h2>Thông tin đơn hàng</h2>
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
                                       onClick={goToPayment} >Thanh toán</Button>
                       </Box>
                   )}

               </ColumnsWrapper>
           </Center>
       </>
    )
}