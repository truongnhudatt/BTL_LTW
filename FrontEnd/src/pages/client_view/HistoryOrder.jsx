import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import CTable from "react-bootstrap/Table";
import moment from 'moment';
import { Link } from 'react-router-dom';
function HistoryOrder() {

    let user = JSON.parse(localStorage.getItem("user-info"))
    let jwtToken = JSON.parse(localStorage.getItem("jwtToken"))
    const [page, setPage] = useState(0);
    const [historyList, setHistoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buttonLoad, setButtonLoad] = useState(false);

    useEffect(() => {
        const getBillList = () => {
            setLoading(true);
            axios.get(`http://localhost:8080/api/v1/bills/all?username=${user.username}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    Accept: "application/json"
                }
            })
            .then(res => {
                console.log(res.data.data.billDtoList)
                setHistoryList(res.data.data);
            }).catch(error => {
                setButtonLoad(false);
            });
        }
        getBillList();
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
                        Họ và tên
                        </th>
                        <th className="text-center" scope="col">
                        Số điện thoại
                        </th>
                        <th className="text-center" scope="col">
                        Địa chỉ
                        </th>
                        <th className="text-center" scope="col">
                        Tiêu đề
                        </th>
                        <th className="text-center" scope="col">
                        Ảnh bìa
                        </th>
                        <th className="text-center" scope="col">
                        Số lượng
                        </th>
                        <th className="text-center" scope="col">
                        Tổng tiền
                        </th>
                        <th className="text-center" scope="col">
                        Trạng thái
                        </th> 
                    </tr>
                    </thead>     
                    <tbody>
                    {historyList.billDtoList && historyList.billDtoList.map((data,index) => (
                            <tr className="text-center">
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">
                                {`${data.userDto.firstName} ${data.userDto.lastName} `}
                            </td>
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">{data.phone}</td>
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">{data.address}</td>
                            <td style={{textAlign: "left", justifyContent: "left" }} className="text-left">
                                <textarea disabled className="description" name="description" id="" cols="30" rows="5" style={{resize:"none", width:"100%", border:"none"}}>{data.orderDetailDto[0].bookDto.title}</textarea>
                            </td>
                            <td style={{ textAlign: "center", justifyContent: "center" }} className="text-center">
                                <img src={`http://localhost:8080/api/v1/books/image/${data.orderDetailDto[0].bookDto.imageList[0].fileName}`} alt="" width="100" height="100" />
                            </td>
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">{data.orderDetailDto[0].quantity}</td>
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">{data.orderDetailDto[0].unitPrice}</td>
                            <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">{data.billStatus}</td>

                            {/* <td style={{ textAlign: "left", justifyContent: "left" }} className="text-left">{moment(data.dateRelease).format("yyyy-MM-DD")}</td> */}
                         {/*   
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
                            </td> */}
                            </tr>
                        ))}
                    </tbody>  
            </CTable>
            {/* {!buttonLoad && <button className="btn btn-outline-danger" onClick={() => setPage(page + 1)}>{loading ? 'Đang tải...' : 'Xem thêm'}</button>} */}
        </div>
    </>
  )
}

export default HistoryOrder