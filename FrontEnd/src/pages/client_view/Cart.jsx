import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import CartItem from "../../components/CartItem"
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import "../../css/cart.css"
import Header from '../../components/Header';
import Dialog from "../../components/Dialog";
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
   margin-left:15%;
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
background-color: #fff;
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
    if (user) {
      getOrder();
    }
    // setTimeout(() => {
    //   getOrder();
    // }, 1000);
  }, [page])
  useEffect(() => {
    // localStorage.removeItem("orderId")
    localStorage.setItem("orderId", myArr)
    
  })
  const setItemArray = () => {
    localStorage.removeItem("orderId")
    localStorage.setItem("orderId", myArr)
  }
  return (
    <Container>
      <Header />
      <Title>GIỎ HÀNG</Title>
      <div style={{ display: "flex", marginLeft: "auto", marginRight: "auto", justifyContent: "space-between", width: "70%" }}>
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
        <Summary>
          <SummaryItem>
            <SummaryItemText>Tạm tính</SummaryItemText>
            <SummaryItemPrice>
              <NumericFormat value={totalPrice} displayType={'text'} thousandSeparator={true} suffix={'₫'} />
            </SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Tổng tiền</SummaryItemText>
            <SummaryItemPrice>
              <NumericFormat value={totalPrice} displayType={'text'} thousandSeparator={true} suffix={'₫'} />
            </SummaryItemPrice>
          </SummaryItem>
          <Link disabled={myArr.length > 0 ? false : true} to={"/checkout/payment"} className="btn btn-danger" >{myArr.length ? `Mua hàng (${myArr.length})` : "Mua hàng"}</Link>
        </Summary>
      </div>
    </Container>
  );
};

export default Cart;