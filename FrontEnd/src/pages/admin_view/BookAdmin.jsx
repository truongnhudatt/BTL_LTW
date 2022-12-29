import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import CTable from "react-bootstrap/Table";
import moment from 'moment';
import { Link } from 'react-router-dom';
function BookAmin() {

    let user = JSON.parse(localStorage.getItem("user-info"))
    let jwtToken = JSON.parse(localStorage.getItem("jwtToken"))
    const [page, setPage] = useState(0);
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buttonLoad, setButtonLoad] = useState(false);

    useEffect(() => {
        const getBookList = () => {
            setLoading(true);
            axios.get(`http://localhost:8080/api/v1/books/all?pageNo=${page}`)
            .then(res => {
                console.log(res.data.data)
                setBookList([...bookList, ...res.data.data.bookDtoList]);
                setLoading(false);
                setButtonLoad(res.data.data.last);
            });
        }
        getBookList();
    }, [page])

  return (
    <>
        <Header/>
        <div className="">
            <CTable 
                bordered
                borderColor="primary"
                hover
                tableHeadProps={{ color: "dark" }}
                >
                 <thead>
                    <tr>
                        <th className="text-center" scope="col">
                        Tiêu đề{" "}
                        </th>
                        <th className="text-center" scope="col">
                        Tác giả
                        </th>
                        <th className="text-center" scope="col">
                        Danh mục
                        </th>
                        <th className="text-center" scope="col">
                        Mô tả
                        </th>
                        <th className="text-center" scope="col">
                        Ngày xuất bản
                        </th>
                        <th className="text-center" scope="col">
                        Số trang
                        </th>
                        <th className="text-center" scope="col">
                        Giá
                        </th>
                        <th className="text-center" scope="col">
                        Ảnh bìa
                        </th>
                        <th className="text-center" scope="col">
                        Hành động    
                        </th>               
                    </tr>
                    </thead>     
                    <tbody>
                        {bookList && bookList.map((data,index) => (
                            <tr className="text-center">
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">
                                <textarea disabled className="title" name="title" id="" cols="30" rows="5" style={{ border:"none",resize:"none", width:"100%"}}>{data.title}</textarea>
                            </td>
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">{data.author}</td>
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">{data.typeBook}</td>
                            <td style={{whiteSpace:"pre-wrap", textAlign: "left", justifyContent: "left" }} className="text-left">
                                <textarea disabled className="description" name="description" id="" cols="70" rows="5" style={{resize:"none", width:"100%", border:"none"}}>{data.description}</textarea>
                            </td>
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">{moment(data.dateRelease).format("yyyy-MM-DD")}</td>
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">{data.totalPage}</td>
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">{data.price}</td>
                            <td style={{ textAlign: "center", justifyContent: "center" }} className="text-center">
                                <img src={`http://localhost:8080/api/v1/books/image/${data.imageList[0].fileName}`} alt="" width="100" height="100" />
                            </td>
                            <td style={{ textAlign: "center", justifyContent: "center" }} className="text-center">
                                <div className="button">
                                    <Link to={`/admin/control/book/${data.id}`} type="button" class="btn btn-primary">Cập nhật</Link>
                                    <button type="button" class="btn btn-danger">Xoá</button>
                                </div>
                            </td>
                            </tr>
                        ))}  
                    </tbody>  
            </CTable>
            {!buttonLoad && <button className="btn btn-outline-danger" onClick={() => setPage(page + 1)}>{loading ? 'Đang tải...' : 'Xem thêm'}</button>}
        </div>
    </>
  )
}

export default BookAmin