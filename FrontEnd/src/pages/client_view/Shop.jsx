import Books from '../../components/Books';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../../components/Header';
const Shop = () => {

    const [page, setPage] = useState(0);
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buttonLoad, setButtonLoad] = useState(false);
    const [keyword, setKeyword] = useState("");
    
    const handleKeyword = e => {
        setKeyword(e);
    }


    useEffect(() => {
        const getBookList = () => {
            setLoading(true);
            axios.get(`http://localhost:8080/api/v1/books/all?pageNo=${page}&keyword=${keyword}`)
            .then(res => {
                console.log(res.data.data)
                setBookList([...bookList, ...res.data.data.bookDtoList]);
                setLoading(false);
                setButtonLoad(res.data.data.last);
            });
        }
        getBookList();
    }, [page,keyword])

    return (
        <>
            <Header handleKeyword={handleKeyword}/>
        <div>
            <Books data={bookList}/>
            {!buttonLoad && <button className="btn btn-outline-danger" onClick={() => setPage(page + 1)}>{loading ? 'Đang tải...' : 'Xem thêm'}</button>}
        </div>
        </>
    )
}

export default Shop