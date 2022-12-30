import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { NumericFormat } from "react-number-format";
import Header from "./Header";
import Dialog from "./Dialog";


const Product = styled.div`
  margin-bottom:7px;
  border-bottom: 1px solid #d3d3d3;
  padding-bottom:20px;
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



const CartItem = ({ orderItem, handlePickItem }) => {
  let user = JSON.parse(localStorage.getItem("user-info"))
  let jwtToken = JSON.parse(localStorage.getItem("jwtToken"))
  const [isSelected, setSelection] = useState(false);
  const [quantity, setQuantity] = useState(orderItem.quantity);
  useEffect(() => {
    axios.put("http://localhost:8080/api/v1/orders/updateQuantity", {
      "orderDetailId": orderItem.id,
      "quantity": quantity
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
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
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    nameProduct: ""
  });
  const idProductRef = useRef();
  const handleDialog = (message, isLoading, id) => {
    setDialog({
      message,
      isLoading,
      id,
    });
  };

  const handleDelete = (id) => {
    handleDialog("Bạn có muốn xóa sản phẩm đang chọn?", true, id);
    idProductRef.current = id
  };
  const areUSureDelete = (choose) => {
    if (choose) {
      handleDialog("", false);
      // deleteBook(idProductRef.current)
      axios.delete(`http://localhost:8080/api/v1/orders/${user.username}/delete/detail-order/${idProductRef.current}`,
      {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: "application/json"
        }
      }
      ).then((response) => {
        window.location.reload();
      }).catch(console.error());
    } else {
      handleDialog("", false);
    }
  };
  return (
    <Product>
      <input value={isSelected} type={"checkbox"} key={orderItem.id} onChange={ e => {
        setSelection(!isSelected);
        sender();
      }} />
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
          <Remove onClick={() => { quantity > 1 ? setQuantity(quantity - 1) : handleDelete(orderItem.id) }} />
          <ProductAmount value={quantity} onChange={e => setQuantity(e.target.value)}></ProductAmount>
          <Add onClick={() => setQuantity(quantity + 1)} />
        </ProductAmountContainer>
      </PriceDetail>
      {dialog.isLoading && (
        <Dialog
        title={dialog.title}
        onDialog={areUSureDelete}
        message={dialog.message}
            />
        )}
      <ProductPrice className="col-3">
        <NumericFormat value={orderItem.price} displayType={'text'} thousandSeparator={true} suffix={'₫'} />
      </ProductPrice>
    </Product>

  );
};

export default CartItem;