import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import CartItem from "../../components/CartItem"
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import "../../css/cart.css"
import Header from '../../components/Header';
import PaymentItem from "../../components/PaymentItem"
import FormDialog from "../../components/Dialog";
import { Dialog } from "@mui/material";
const Container = styled.div`
  background-color: rgb(245, 245, 250);
  padding-bottom:10px;
`;

const Wrapper = styled.div`
    background-color: #fff;
    margin-right:5%;
    // margin-left:5%;
    // margin-top:15px;
    width:60%;
    border: 1px solid #dadce0;
    border-radius: 10px;
    padding: 30px;
    display: block;
  ${mobile({ padding: "10px", flexDirection: "column" })}
  // ${mobile({ padding: "10px" })}
`;

const Title = styled.h4`
  font-weight: 500;
  font-size:20px;
  line-height:28px;
  flex-basis: calc(797px);
   text-align: left; 
   margin-top:10px;
   margin-left:5%;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
//   flex: 1;
//   border: 1px solid lightgray;
//   border-radius: 10px;
//   padding: 20px;
//   height: 40vh;
    padding: 16px;
    // margin-left:100px;
    flex: 1;
    border: 1px solid lightgray;
    border-radius: 10px;
    height: 25vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  font-weight: 600;
`;


let myArr = []
const Payment = () => {
    const [addressClient, setAddressClient] = useState({});
    let arrTotalPrice = []
    const [openPopup, setOpenPopup] = useState(false)
    const openInPopup = item => {
        setOpenPopup(true)
    }
    const nagivate = useNavigate();
    const handleDialogAddress = e => {
        setAddressClient(e);
    }
    let user = JSON.parse(localStorage.getItem("user-info"))
    let jwtToken = JSON.parse(localStorage.getItem("jwtToken"))
    const [page, setPage] = useState(0);
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buttonLoad, setButtonLoad] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)
    let orderId = localStorage.getItem("orderId");
    console.log(orderId.split(",").join(","))
    useEffect(() => {
        const getOrderLis = () => {
            axios.get(`http://localhost:8080/api/v1/orders/ord-details?ords=${orderId.split(",").join(",")}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        Accept: "application/json"
                    }
                }).then(response => {
                    setOrderList(response.data)
                }).catch(console.error())
        }
        setTimeout(() => {
            getOrderLis();
        }, 1000);
    }, [page])
    useEffect(() => {
        const getTotalPrice = () => {
          axios.get(`http://localhost:8080/api/v1/orders/ord-detail?ords=${orderId.split(",").join(",")}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json"
              }
            }).then(response => {
              setTotalPrice(response.data);
            }).catch(console.error())
        }
        setTimeout(() => {
          getTotalPrice();
        }, 1000);
      }, [page])

    const createBill = () => {
        const data = {
            username: user.username,
            listOrderDetailId: orderId.split(","),
            phone: addressClient['phone'],
            address: addressClient['address']
        }
        axios.post("http://localhost:8080/api/v1/bills/create", data, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json"
            }
        }).then((response) => {
            window.location.href = "http://localhost:3000/history"
        })
    }
    return (
        <Container>
            <Header />
            <Title>THANH TOÁN</Title>
            <div style={{ display: "flex", marginLeft: "auto", marginRight: "auto", justifyContent: "space-between" , width: "70%"}}>
                <Wrapper>
                    <div className="group">
                        <Bottom>
                            <Info>
                                {orderList.map((ordItem, index) =>
                                    (<PaymentItem  orderItem={ordItem} key={ordItem.id} />)
                                )}
                            </Info>
                        </Bottom>

                    </div>
                </Wrapper>
                <div className="wrapperr">
                    <div>
                        <div className="section__container">
                            <div className="block-header">
                                <h3 className="block-header__title">Giao tới</h3>
                                <a class="block-header__nav" href="#" onClick={() => setOpenPopup(true)}>Thay đổi</a>
                            </div>
                            <div className="customer_info">
                                <p className="customer_info__name">{addressClient ? addressClient['name'] : "Trương Như Đạt"}</p>
                                <i></i>
                                <p className="customer_info__phone">{addressClient ? addressClient['phone'] : "0390856999"}</p>
                            </div>
                            <div className="address">
                                <span className="address__type address__type--home">{addressClient ? addressClient['address'] : "165 Ngõ 20, Cự Lộc, Hà Nội"}</span>
                            </div>
                        </div>
                        <div>
                            <Summary>
                                <SummaryTitle>TỔNG HOÁ ĐƠN</SummaryTitle>
                                <SummaryItem>
                                    <SummaryItemText>Tạm tính</SummaryItemText>
                                    <SummaryItemPrice>
                                        <NumericFormat value={totalPrice} displayType={'text'} thousandSeparator={true} suffix={'₫'} />
                                    </SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Chi phí vận chuyển</SummaryItemText>
                                    <SummaryItemPrice>
                                        <NumericFormat value={0} displayType={'text'} thousandSeparator={true} suffix={'₫'} />
                                    </SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Giảm giá</SummaryItemText>
                                    <SummaryItemPrice>
                                        <NumericFormat value={0} displayType={'text'} thousandSeparator={true} suffix={'₫'} />
                                    </SummaryItemPrice>
                                </SummaryItem>
                                {console.log(arrTotalPrice)}
                                <SummaryItem type="total">
                                    <SummaryItemText>Tổng tiền</SummaryItemText>
                                    <SummaryItemPrice>
                                        <NumericFormat value={totalPrice} displayType={'text'} thousandSeparator={true} suffix={'₫'} />
                                    </SummaryItemPrice>
                                </SummaryItem>
                                <Button className="btn btn-danger" onClick={() => createBill()}>Thanh toán</Button>
                            </Summary>
                        </div>
                        <Dialog open={openPopup}>
                            <FormDialog onDialog={setOpenPopup} handleDialogAddress={handleDialogAddress}/>
                        </Dialog>
                    </div>
                </div>
            </div>
        </Container>

    );
};

export default Payment;