import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../../css/login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import Navbarr from '../../components/Navbar';
function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [errorUser, setErrorUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user-info")) !== null) {
            navigate('/home');
        }
    })

    const checkLogin = e => {
        setErrorUser("");
        axios.post("http://localhost:8080/api/v1/users/login", {
            username: username,
            password: password
        })
            .then((response) => {
                console.log(response);
                localStorage.setItem("user-info", JSON.stringify(response.data.data.userDto));
                localStorage.setItem("jwtToken", JSON.stringify(response.data.data.token));
                setMessage(response.data.data);
                navigate('/home');
            })
            .catch(error => {
                if (error.response.data.length === 0) {
                    setErrorMessage("");
                    setErrorUser("Tên người dùng hoặc mật khẩu không chính xác");
                }
                else {
                    // setErrorMessage(error.response.data.data);
                    let errormess = error.response.data.data;
                    let objkey = Object.keys(errormess);
                    if(objkey.includes("username")){
                        setErrorUsername(errormess.username);
                    }
                    if(objkey.includes("password")){
                        setErrorPassword(errormess.password);
                    }
                }
            })
    }

    return (
        <>
        <Navbarr/>
        <div id="login-page">
            <div>
                <h1>Đăng nhập</h1>
            </div>
            <div className='form-container'>
                <div className='form-custom'>
                    <TextField
                        error={true ? errorUsername : false}
                        helperText={errorUsername}
                        className='form-custom-input'
                        type="text"
                        id="outlined-basic"
                        label="Tên người dùng"
                        variant="outlined"
                        required onChange={e => {
                            setUsername(e.target.value);
                            setErrorUsername("");
                        }} />

                </div>
                <div className='form-custom'>
                    <TextField
                        error={true ? errorPassword : false}
                        helperText={errorPassword}
                        className='form-custom-input'
                        type="password"
                        id="outlined-basic"
                        label="Mật khẩu"
                        variant="outlined"
                        required onChange={e => {
                            setPassword(e.target.value);
                            setErrorPassword("");
                        }} />

                </div>
                <span style={{ color: "red" }}>{errorUser}</span>
                <div className='form-custom form-custom-btn'>
                    <div className='form-custom-btn-login'>
                        <Link to="/register">
                            <button className='btn btn-outline-secondary'>Đăng kí</button>
                        </Link>
                    </div>
                    <div className='form-custom-btn-signup'>
                        <button className='btn btn-outline-primary' onClick={e => checkLogin(e)}>Đăng nhập</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Signup;