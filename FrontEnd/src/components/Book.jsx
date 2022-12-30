
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import '../css/bookcompo.css'
const Book = ({ item }) => {
  console.log(item.imageList);
  const navigate = useNavigate();
  return (
    // <div className="col-11 col-md6 col-lg-3 mx-0 m-5" key={item.id}>
    //   <div className="card p-0 overflow-hidden h-100 shadow">
    //     <div style={{width:"500px", height:"500px"}}>
    //       <img src={`http://localhost:8080/api/v1/books/image/${item.imageList[0].fileName}`} alt="hoho" className="card-img-top" width="500px" height="500px" />
    //     </div>
    //     <div className="card-body">
    //       <h5 className="card-title"> {item.title}</h5>
    //       <p className="card-text">{`Tác giả: ${item.author}`}</p>
    //       <p className="card-text">Giá: <NumericFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={'₫'} /></p>
    //     </div>
    //   </div>
    // </div>
    <div class="card col-2 m-3" key={item.id}>
    <div className="">
        <img class="" src={`http://localhost:8080/api/v1/books/image/${item.imageList[0].fileName}`} width={"200px"} height={"200px"} alt="Ảnh bìa"  />
    </div>
    <div class="card-body">
        <h6 class="card-title">{item.title}</h6>
        <p class="card-text">Tác giả: <small class="text-muted">{item.author}</small></p>
    </div>
    <div className="btn-view-wrap">
        <Link to={`/book-detail/${item.id}`} class="btn-view-more">Xem chi tiết</Link>
    </div>
</div>
  );
};

export default Book;