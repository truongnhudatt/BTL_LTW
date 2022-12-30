import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap"
import axios from "axios";
import { TextField } from '@mui/material';
import moment from 'moment';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';
import '../../css/addbook.css';
import Header from "../../components/Header";
function Addbook() {

    const { id } = useParams();

    const [book, setBook] = useState([]);
    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [typeBook, setTypeBook] = useState("");
    const [dateRelease, setDateRelease] = useState(moment().format("yyyy-MM-DD"));
    const [totalPage, setTotalPage] = useState(10);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(1000);
    const [imageList, setImageList] = useState([]);

    let jwtToken = JSON.parse(localStorage.getItem("jwtToken"));
    let user = JSON.parse(localStorage.getItem("user-info"));
    const navigate = useNavigate()
    useEffect(() => {
        const getBookByID = () => {
            axios.get(`http://localhost:8080/api/v1/books/detail/${id}`).then(
                (response) => {
                    console.log(response.data);
                    setTitle(response.data.data.title)
                    setAuthor(response.data.data.author)
                    setDateRelease(response.data.data.dateRelease)
                    setDescription(response.data.data.description)
                    setPrice(response.data.data.price)
                    setTotalPage(response.data.data.totalPage)
                    setTypeBook(response.data.data.typeBook)
                    setImageList(response.data.data.imageList)
                }
            )
        }
        getBookByID();
    }, [id])
    useEffect(() => {
        if (user === null && jwtToken === null) {
            navigate('/login');
        }
    })
    let data = new FormData();
    const solveBook = e => {
        e.preventDefault();
        data.append("title", title)
        data.append("author", author)
        data.append("typeBook", typeBook)
        data.append("description", description)
        data.append("dateRelease", dateRelease)
        data.append("totalPage", parseInt(totalPage, 10))
        data.append("price", parseFloat(price, 10))
        for (let index = 0; index < imageFiles.length; index++) {
            const element = imageFiles[index];
            data.append('image', element)
        }
        if (id === "-1") {
            axios.post("http://localhost:8080/api/v1/books/save", data).then(response => {
                if (response.status) {
                    setTimeout(alert('Lưu thông tin sách thành công'), 2000);
                    window.location.href = "http://localhost:3000/admin/control/book";

                }
            })
                .catch(error => {
                    console.log(error);
                    data = new FormData();
                })
        }
        else {
            axios.put(`http://localhost:8080/api/v1/books/detail/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    Accept: "application/json"
                }
            } ).then(
                response => {
                    console.log(response.data)
                    if (response.status) {
                        setTimeout(alert('Lưu thông tin sách thành công'), 2000);
                        window.location.href = "http://localhost:3000/admin/control/book";
                        data = new FormData();
                    }
                    else {
                        data = new FormData();

                    }
                }
            ).catch(error => {
                console.log(error)
                data = new FormData();


            })
        }
    }

    const changeHandler = (e) => {
        const { files } = e.target;
        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.match(imageTypeRegex)) {
                validImageFiles.push(file);
            }
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            return;
        }
        alert("Selected images are not of valid type!");
    };

    useEffect(() => {
        const images = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        images.push(result)
                    }
                    if (images.length === imageFiles.length && !isCancel) {
                        setImages(images);
                    }
                }
                fileReader.readAsDataURL(file);
            })
        };
        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }, [imageFiles]);

    return (
        <><Header />
            <div>
                {id ? (<h2 className="text-center">Sửa sách</h2>) : (<h2 className="text-center">Thêm sách</h2>)}
            </div>
            <div className="add_book">
                <div className="containet">
                    <div className="row">
                        <div className="card col-6">
                            <div className="card-body">
                                <form style={{ margin: "15px" }}>
                                    <div className="textfield-custom"><TextField

                                        value={title}
                                        // defaultValue={title}
                                        type="text"
                                        id="outlined-basic"
                                        label="Tiêu đề"
                                        variant="outlined"
                                        onChange={e => setTitle(e.target.value)}
                                        required fullWidth />
                                    </div>
                                    <div className="textfield-custom"><TextField
                                    value={author}
                                        type="text"
                                        id="outlined-basic"
                                        label="Tác giả"
                                        variant="outlined"
                                        onChange={e => setAuthor(e.target.value)}
                                        required fullWidth />
                                    </div>
                                    <div className="textfield-custom"><TextField
                                    value={typeBook}
                                        type="text"
                                        id="outlined-basic"
                                        label="Thể loại"
                                        variant="outlined"
                                        onChange={e => setTypeBook(e.target.value)}
                                        required fullWidth />
                                    </div>
                                    <div className="textfield-custom"><TextField
                                    value={moment(dateRelease).format("yyyy-MM-DD")}
                                        type="date"
                                        id="outlined-basic"
                                        label="Ngày xuất bản"
                                        variant="outlined"
                                        required fullWidth
                                        onChange={e => setDateRelease(e.target.value)}
                                        defaultValue={moment().format("yyyy-MM-DD")}
                                    />
                                    </div>
                                    <div className="textfield-custom"><TextField
                                        value={totalPage}
                                        type="number"
                                        inputProps={{ min: 0 }}
                                        id="outlined-basic"
                                        label="Tổng số trang"
                                        variant="outlined"
                                        onChange={e => setTotalPage(e.target.value)}
                                        defaultValue={0}
                                        required={true} fullWidth />
                                    </div>
                                    <div className="textfield-custom"><TextField
                                        value={description}
                                        multiline
                                        type="text"
                                        id="outlined-basic"
                                        label="Mô tả"
                                        variant="outlined"
                                        onChange={e => setDescription(e.target.value)}
                                        required fullWidth />
                                    </div>
                                    <div className="textfield-custom"><TextField
                                        value={price}
                                        type="number"
                                        id="outlined-basic"
                                        label="Giá"
                                        variant="outlined"
                                        onChange={e => setPrice(e.target.value)}
                                        defaultValue={1000}
                                        required fullWidth />
                                    </div>
                                    <br></br>
                                    <button className="btn btn-outline-warning">Huỷ</button>
                                    <button className="btn btn-outline-primary" onClick={e => solveBook(e)}>Lưu thông tin</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="textfield-custom__file">
                                <TextField
                                    type="file"
                                    id="outlined-basic"
                                    variant="outlined"
                                    required fullWidth inputProps={{
                                        multiple: true
                                    }}
                                    onChange={e => { changeHandler(e) }}
                                />
                            </div>
                            <div className="slide-container" >
                                {images.length > 1 ? (
                                    <Slide cssClass="display-image" autoplay={true} duration={500}>
                                    {images.map((image, index) => (
                                    <div className="each-fade" key={index}>
                                        <div className="image-container">
                                        <img src={image} alt="ho ho " width="50%" height="50%"/>
                                        </div>
                                    </div>
                                    ))}
                                </Slide>
                                ):  (images.length === 1 ? <div className="image-container"><img src={images[0]} alt=" ho ho" width="50%" height="50%"/></div>  : 
                                <>
                                    {imageList.length ? 
                                    <>
                                        <Slide cssClass="display-image" autoplay={true} duration={500}>
                                            {imageList.map((image, index) => (
                                            <div className="each-fade" key={index}>
                                                <div className="image-container">
                                                <img src={`http://localhost:8080/api/v1/books/image/${image.fileName}`} alt="ho ho " width="50%" height="50%"/>
                                                </div>
                                            </div>
                                            ))}
                                        </Slide>
                                    
                                    </>: <></>}
                                </>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Addbook;