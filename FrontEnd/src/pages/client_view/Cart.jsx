import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Navbarr from "../../components/Navbar";
import { mobile } from "../../responsive";
import CartItem from "../../components/CartItem"
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import "../../css/cart.css"
import Header from '../../components/Header';
const Container = styled.div`
  background-color: rgb(245, 245, 250);
  padding-bottom:10px;
`;

const Wrapper = styled.div`
  background-color: #fff;
  margin-left:5%;
  margin-top:15px;
  width:60%;
  border: 1px solid #dadce0;
  border-radius: 5px;
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

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 40vh;
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
const Cart = () => {

    const nagivate = useNavigate();
    let user = JSON.parse(localStorage.getItem("user-info"))
    let jwtToken = JSON.parse(localStorage.getItem("jwtToken"))
    const [page, setPage] = useState(0);
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buttonLoad, setButtonLoad] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)
    const [item, setItem] = useState({});

    const handleSetItem = item => {
        setItem(item);
    }
    const handlePickItem = item => {
        console.log(item)
        if (item.isSelected && myArr.indexOf(item.id) === -1) {
            // myArr.push(...myArr,...[item.id])
            myArr.push(item.id)

        }
        else if (!item.isSelected && myArr.indexOf(item.id) >= 0) {
            myArr.splice(myArr.indexOf(item.id), 1)
        }
    }
    useEffect(() => {
        console.log(item)
        handlePickItem(item);
    }, [item])

    useEffect(() => {
        console.log(myArr);
        const getTotalPrice = () => {
            axios.get(`http://localhost:8080/api/v1/orders/ord-detail?ords=${myArr.join(",")}`,
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
    }, [item])
    useEffect(() => {
        const getOrder = () => {
            axios.get(`http://localhost:8080/api/v1/carts/all?pageNo=${page}&username=${user.username}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    Accept: "application/json"
                }
            }).then(response => {
                setLoading(false);
                setOrderList([...orderList, ...response.data.cartItemDto]);
                setButtonLoad(response.data.last);
            })
        }
        if(user){
            getOrder();
        }
        // setTimeout(() => {
        //   getOrder();
        // }, 1000);
    }, [page])

    return (
        <Container>
            <Header />
            <Title>GIỎ HÀNG</Title>
            <div style={{ display: "flex", marginLeft: "auto", marginRight: "auto", justifyContent: "center" }}>
                <Wrapper>
                    <div className="group">
                        <Bottom>
                            <Info>
                                {orderList.map((ordItem, index) =>
                                    (<CartItem handlePickItem={handleSetItem} orderItem={ordItem} key={ordItem.id} />)
                                )}
                            </Info>
                        </Bottom>

                    </div>
                    {!buttonLoad && orderList.length > 0 && <button className="btn btn-outline-danger" onClick={() => setPage(page + 1)}>{loading ? 'Đang tải...' : 'Xem thêm'}</button>}
                </Wrapper>
                <div className="wrapperr">
                    <div>
                        <div className="section__container">
                            <div className="block-header">
                                <h3 className="block-header__title">Giao tới</h3>
                                <a class="block-header__nav" href="/cart">Thay đổi</a>
                            </div>
                            <div className="customer_info">
                                <p className="customer_info__name">Trương Như Đạt</p>
                                <i></i>
                                <p className="customer_info__phone">0393856999</p>
                            </div>
                            <div className="address">
                                <span className="address__type address__type--home">số 2 bùi ngọc dương, Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội</span>
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
                                <SummaryItem type="total">
                                    <SummaryItemText>Tổng tiền</SummaryItemText>
                                    <SummaryItemPrice>
                                        <NumericFormat value={totalPrice} displayType={'text'} thousandSeparator={true} suffix={'₫'} />
                                    </SummaryItemPrice>
                                </SummaryItem>
                                <Button className="btn btn-danger">{myArr.length ? `Mua hàng (${myArr.length})` : "Mua hàng"}</Button>
                            </Summary>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Cart;