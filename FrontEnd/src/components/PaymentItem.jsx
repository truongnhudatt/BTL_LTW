import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { NumericFormat } from "react-number-format";
import Header from "./Header";


const Product = styled.div`
    margin-bottom:7px;
    border-bottom: 1px solid #d3d3d3;
    padding-bottom:20px;
    display: flex;
    justify-content: space-between;
//   display: flex;
//   justify-content: space-between;
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

const CartItem = ({ orderItem }) => {

  const [quantity, setQuantity] = useState(orderItem.quantity);

  return (
    <Product>
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
          <ProductAmount disabled value={quantity} onChange={e => setQuantity(e.target.value)}></ProductAmount>
        </ProductAmountContainer>
      </PriceDetail>
      <ProductPrice className="col-3">
        <NumericFormat value={orderItem.price} displayType={'text'} thousandSeparator={true} suffix={'₫'} />
      </ProductPrice>
    </Product>
  );
};

export default CartItem;