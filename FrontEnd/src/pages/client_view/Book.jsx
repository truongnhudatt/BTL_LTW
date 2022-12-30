import { Add, BorderStyle, Remove, WidthFull } from "@mui/icons-material";
import styled from "styled-components";
import { useNavigate, Link, useParams } from "react-router-dom";
import { mobile } from "../../responsive";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import 'react-slideshow-image/dist/styles.css'
import { Fade } from "react-slideshow-image";
import { NumericFormat } from "react-number-format";
import ReactStars from "react-rating-stars-component";
import { fontWeight } from "@mui/system";
import Table from 'react-bootstrap/Table';
import { Icon } from "@mui/material";
import "../../css/book.css"
import moment from 'moment';
import Header from "../../components/Header";
const Container = styled.div`
  background-color: rgb(245, 245, 250);
  padding-bottom:10px;
`;

const Wrapper = styled.div`
  background-color: #fff;
  margin-left:auto;
  margin-top:15px;
  margin-right:auto;
  width:60%;
  border: 1px solid #dadce0;
  border-radius: 5px;
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  align-items:center;
  display:flex;
  justify-content:center;
`;

const Image = styled.img`
  width: 50%;
  height: 50%;
  margin-left:10px
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    position:relative;
    display:block;
    flex: 1;    
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`;
const BuyContainer = styled.div`
    display: flex;
    margin-top:100px;
    flex-direction: column;
    // margin: 16px 0px 0px;
    padding: 16px 0px;
    border-top: 1px solid rgb(242, 242, 242);
  // align-items: flex-end;
  // ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
  font-size: 24px;
  text-align: left;
  // padding: 16px 28px 16px 0px;
  position: relative;
`;

const Desc = styled.p`
  margin: 10px 0px;
  text-align: left;
  white-space: pre-wrap;
`;

const Author = styled.h6`
    text-align: left;
    font-size: 13px;
`;

const Price = styled.div`
  // position: absolute;
  // font-weight: 100;
  // font-size: 30px;
  // text-align: left;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: rgb(250, 250, 250);
    padding: 0px 16px 12px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  
  width: 50%;
  display:block;
  background-color: rgb(255, 255, 255);
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-top: 8px;
  margin-left:80px;
`;

const Amount = styled.input`
  width: 30px;
  height: 30px;
  border-radius: 2px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  text-align:center;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const OrderButton = styled.button`
  // float:left;
  // margin-top:20px;
  margin-top: 16px;
  flex: 1 1 0%;
  display: flex;
  justify-content:center
`
const TextAmount = styled.div`
  margin-bottom:5px;
`

const Group = styled.div`
  padding: 10px;
  border: 1px solid #dadce0;
  border-radius: 5px;
  background-color: #fff;
  width: 60%;
  margin-left:auto;
  margin-right:auto;
  margin-top:10px;
  text-align:left;
  margin-bottom: 16px;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
`
const FilterReviewItem = styled.div`
  height : 32px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding: 6px 12px;
  border-radius: 100px;
  align-items: center;
  color: rgb(56, 56, 61);
  background: rgb(245, 245, 250);
  margin: 0px 12px 12px 0px;
  cursor: pointer;
  display: flex;
`

const ReviewComment = styled.div`
  padding: 32px 48px;
  display: flex;
  border-top: 1px solid rgb(242,242,242);

`

const ReviewCommentUser = styled.div`
  flex-basis: 335px;
  flex-shrink: 0;
`


let arr = []
const Book = () => {
  const myRef = useRef(null)
  let user = JSON.parse(localStorage.getItem("user-info"))
  let jwtToken = JSON.parse(localStorage.getItem("jwtToken"))

  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");
  const [ratingg, setRatingg] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState({});
  const [review, setReview] = useState([]);
  const mapScore = {
    1: "Rất không hài lòng",
    2: "Không hài lòng",
    3: "Bình thường",
    4: "Hài lòng",
    5: "Cực kì hài lòng"
  }
  const executeScroll = () => myRef.current.scrollIntoView()
  const ratingChanged = (newRating) => {
    setScore(newRating);
  };
  const addToOrder = () => {
    if(user) {
      const data = {
        username: user.username,
        orderDetailRequest: {
          bookId: id,
          quantity: quantity
        }
      };
      axios.post("http://localhost:8080/api/v1/orders/create", data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          Accept: "application/json"
        }
      })
      setTimeout(() => {
        navigate("/cart")
      }, 500);
    }
    else{
      window.location.href = "http://localhost:3000/login"
    }
  }

  const postReview = () => {
    const data = {
      username: user.username,
      bookId: id,
      score: score,
      comment: comment
    };
    axios.post("http://localhost:8080/api/v1/reviews/create", data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: "application/json"
      }
    }).then(response => console.log(response.data))
      .catch(console.error())
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  useEffect(() => {
    const getReview = () => {
      axios.get(`http://localhost:8080/api/v1/reviews/book/${id}`, {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          Accept: "application/json"
        }
      }).then(response => {
        console.log(response.data)
        setReview(response.data);
      })
    }
    setTimeout(() => {
      getReview();
    }, 500);
  }, [id])

  useEffect(() => {
    const getBookDetail = () => {
      axios.get(`http://localhost:8080/api/v1/books/detail/${id}`).then(response => {
        setBook(response.data.data);
        setTitle(response.data.data.title)
        setDescription(response.data.data.description)
        setPrice(response.data.data.price)
        setImages(response.data.data.imageList)
        setAuthor(response.data.data.author)
        console.log(response.data.data.rating)
        setRatingg(response.data.data.rating)
        console.log(ratingg)

      }).catch(error => {
        console.log(error.response);
        navigate('/shop')
      });
    }
    setTimeout(() => {
      getBookDetail();
    }, 0);
  }, [id])
  return (
    <Container>
      <Header />
      <Wrapper>
        <ImgContainer>
          <div className="slide-container" style={{ width: "500px" }}>
            {images.length > 1 ? (
              <Fade cssClass="display-image" autoplay={true} duration={500}>
                {images.map((image, index) => (
                  <div className="each-fade" key={index}>
                    <div className="image-container">
                      <Image src={`http://localhost:8080/api/v1/books/image/${images[index].fileName}`} />
                    </div>
                  </div>
                ))}
              </Fade>
            ) : (images.length === 1 ? <>
              <Fade cssClass="display-image" autoplay={true} duration={500}>
                {images.map((image, index) => (
                  <div className="each-fade" key={index}>
                    <div className="image-container">
                      <Image src={`http://localhost:8080/api/v1/books/image/${images[index].fileName}`} />
                    </div>
                  </div>
                ))}
              </Fade>
            </> : <></>)}
          </div>
        </ImgContainer>
        <div style={{ flex: "1 1 0%", display: "block" }}>
          <InfoContainer>
            <Author>
              Tác giả: {author}
            </Author>
            <Title>
              {title}
            </Title>
            <div className="below-title">
              <div style={{
                display: "flex"
              }}>
                <div className="hfvjwg">
                  <div style={{
                    position: "relative"
                  }}>
                    {book.rating ? (<ReactStars
                      edit={false}
                      value={book.rating}
                      count={5}
                      size={20}
                      activeColor="#ffd700"
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                    />) : <><ReactStars
                      edit={false}
                      value={0}
                      count={5}
                      size={20}
                      activeColor="#ffd700"
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                    /></>}
                    <div>
                      <a class="number" onClick={executeScroll}>(Xem {review.length} đánh giá)</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <OrderButton className="btn btn-danger" onClick={() => addToOrder()}>Chọn mua</OrderButton> */}
          </InfoContainer>
          <Price>
            <NumericFormat style={{ color: "red", fontWeight: "600" }} value={price} displayType={'text'} thousandSeparator={true} suffix={' ₫'} />
          </Price>
          <BuyContainer>
            <div className="qty-and-message">
              <TextAmount>Số lượng</TextAmount>
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => { quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1) }} />
                  <Amount value={quantity} onChange={e => setQuantity(e.target.value)}></Amount>
                  <Add onClick={() => setQuantity(quantity + 1)} />
                </AmountContainer>
              </AddContainer>
              <OrderButton className="btn btn-danger" onClick={() => addToOrder()}>Chọn mua</OrderButton>
            </div>
          </BuyContainer>
        </div>
      </Wrapper>
      <Group>
        <h2 style={{ fontSize: 20, marginBottom: "10px" }}>Thông tin chi tiết</h2>
        <div style={{ display: "inline-block", width: "100%" }}>
          <Table bordered hover>
            <tbody>
              <tr>
                <td style={{ backgroundColor: "rgb(239, 239, 239)", width: "20%", fontWeight: "600" }}>Ngày xuất bản</td>
                <td>{moment(book.dateRelease).format("yyyy-MM-DD")}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "rgb(239, 239, 239)", width: "20%", fontWeight: "600" }}>Số trang</td>
                <td>{book.totalPage}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "rgb(239, 239, 239)", width: "20%", fontWeight: "600" }}>Thể loại</td>
                <td>{book.typeBook}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Group>
      <Group>
        <h2 style={{ fontSize: 20, marginBottom: "10px" }}>Mô tả sản phẩm</h2>
        <div className="content">
          <Desc>{description}</Desc>
        </div>
      </Group>
      <Group ref={myRef}>
        <h2 style={{ fontSize: 20, marginBottom: "10px" }}>Đánh Giá - Nhận Xét Từ Khách Hàng</h2>
        <div className="customer-review">
          <div className="customer-review__top">
            <div className="review-rating__summary">
              <div className="review-rating__point">{book.rating}</div>
              <div className="review-rating__stars">
                <div>
                  {review.length && <><ReactStars
                    edit={false}
                    value={book.rating}
                    count={5}
                    size={20}
                    activeColor="#ffd700"
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                  /></>}
                </div>
                <div className="review-rating__total">
                  {review.length} nhận xét
                </div>
              </div>
            </div>
            <div style={{ display: "flex", padding: "48px 0px 32px" }}>
              <div className="star-comment__wrapper" >
                <ReactStars
                  edit={true}
                  value={0}
                  count={5}
                  onChange={ratingChanged}
                  size={20}
                  activeColor="#ffd700"
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                />
              </div>
              <div className="reply-comment__wrapper">
                <div style={{ display: "block", position: "relative", zIndex: "1", flexGrow: "1" }}>
                  <textarea placeholder="Viết nhận xét" className="hVhEzE reply-comment__input" rows="1" onChange={e => setComment(e.target.value)}></textarea>
                  <img src="https://salt.tikicdn.com/ts/upload/1e/49/2d/92f01c5a743f7c8c1c7433a0a7090191.png" alt="" className="reply-comment__submit" onClick={() => postReview()} />
                </div>
              </div>
            </div>
            {review.map((value, index) => (
              <ReviewComment>
                <ReviewCommentUser>
                  <div>
                    <div>{value.userDto.firstName + " " + value.userDto.lastName}</div>
                  </div>
                  <div className="review-comment__user-info">
                    <img src="https://salt.tikicdn.com/ts/upload/c6/67/f1/444fc9e1869b5d4398cdec3682af7f14.png" alt="" />Đã viết:
                    <span>2 Đánh giá</span>
                  </div>
                </ReviewCommentUser>
                <div style={{ flexGrow: "1", display: "block" }}>

                  <div className="review-comment__rating-title" style={{
                    display: "flex",
                    margin: "0px 0px 4px",
                    alignItems: "center"
                  }}>

                    <div style={{
                      position: 'relative',
                      zIndex: "1",
                      display: "inline-block"
                    }}>
                      <ReactStars
                        edit={false}
                        value={value.score}
                        count={5}
                        size={20}
                        activeColor="#ffd700"
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                      />
                    </div>

                    <div className="review-comment__title" style={{
                      margin: "0px 0px 0px 12px",
                      fontSize: "15px",
                      lineHeight: "24px",
                      fontWeight: "500",
                      color: "rgb(36, 36, 36)",
                      display: "-webkit-box"
                    }}>
                      {mapScore[value.score]}
                    </div>

                  </div>

                  <div className="review-comment__seller-name-attributes">
                    <div class="review-comment__seller-name">
                      <span class="review-comment__check-icon"></span>
                      Đã mua hàng
                    </div>
                  </div>

                  <div className="wrapper-rating-attribute" style={{
                    marginBottom: "8px",
                    display: "block"

                  }} >

                    <div className="rating-attribute" style={{
                      display: "flex",
                      alignItems: "flex-start"
                    }}>

                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                        marginRight: "7px",
                        minWidth: "16px",
                        minHeight: "17px"
                      }}>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8036 4.34615C13.9988 4.54142 13.9988 4.858 13.8036 5.05326L6.47401 12.3828C6.38024 12.4766 6.25307 12.5292 6.12046 12.5292C5.98785 12.5292 5.86067 12.4766 5.7669 12.3828L2.14645 8.76234C1.95118 8.56708 1.95118 8.2505 2.14645 8.05524C2.34171 7.85998 2.65829 7.85998 2.85355 8.05524L6.12046 11.3221L13.0964 4.34615C13.2917 4.15089 13.6083 4.15089 13.8036 4.34615Z" fill="#00AB56"></path></svg>
                      <span class="rating-attribute__attributes" style={{
                        fontWeight: "400",
                        fontSize: "13px",
                        lineHeight: "20px",
                        color: "rgb(128, 128, 137)"
                      }}>{value.comment}</span>

                    </div>

                  </div>

                  <div className="review-comment__created-date" style={{
                    fontSize: "13px",
                    lineHeight: "20px",
                    margin: "0px 0px 16px",
                    color: "rgb(128,128,137)"
                  }}>
                    <span style={{
                      fontSize: "13px",
                      lineHeight: "20px",
                      color: "rgb(128,128,137)"
                    }}>Đánh giá vào 3 tháng trước</span>
                  </div>

                </div>
              </ReviewComment>
            ))}
          </div>
        </div>
      </Group>
    </Container>
  );
};
export default Book;