import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbarr from "./Navbar";
import { mobile } from "../responsive";
import { NumericFormat } from "react-number-format";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
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
  text-align:left;

`;

const Image = styled.img`
  width: 120px;
`;

const Details = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
    display:inline-block;
  // flex: 1;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items:right;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top:35px;
  // margin-bottom: 20px;
`;

const ProductAmount = styled.input`
  font-size: 24px;
  margin: 5px;
  text-align:center;
  border:none;
  width:60px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  padding-top:35px;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
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
  background-color: black;
  color: white;
  font-weight: 600;
`;

const CartItem = ({ orderItem, handlePickItem }) => {

  const [isSelected, setSelection] = useState(false);
  const [quantity, setQuantity] = useState(orderItem.quantity);
  useEffect(() => {
    axios.put("http://localhost:8080/api/v1/orders/updateQuantity", {
      "orderDetailId": orderItem.id,
      "quantity": quantity
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        Accept: "application/json"
      }
    })
  }, [quantity])

  const sender = () => {
    handlePickItem({
      id: orderItem.id,
      isSelected: !isSelected,
    });
  }
  useEffect(() => {
    if(isSelected){
      handlePickItem({
        id: orderItem.id,
        isSelected: isSelected,
      });
    }
  }, [quantity])
  return (
    <Product>
      <input value={isSelected} type={"checkbox"} key={orderItem.id} onChange={ e => {
        setSelection(!isSelected);
        sender();
      }} />
      {/*  onClick={() => sender()} */}
      <ProductDetail className="col-7">
        {orderItem && (<Image src={`http://localhost:8080/api/v1/books/image/${orderItem.bookDto.imageList[0].fileName}`} />)}
        <Details>
          <ProductName>
            <b>{orderItem.bookDto.title}</b>
          </ProductName>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer className="col-2">
          <Remove onClick={() => { quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1) }} />
          <ProductAmount value={quantity} onChange={e => setQuantity(e.target.value)}></ProductAmount>
          <Add onClick={() => setQuantity(quantity + 1)} />
        </ProductAmountContainer>
      </PriceDetail>
      <ProductPrice className="col-3">
        <NumericFormat value={orderItem.price} displayType={'text'} thousandSeparator={true} suffix={'₫'} />
      </ProductPrice>
    </Product>
  );
};

export default CartItem;