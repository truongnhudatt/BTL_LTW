import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../../css/signup.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import Navbarr from '../../components/Navbar';
function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorFistName, setErrorFistName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorUserExist, setErrorUserExist] = useState("");
    const [errorPasswordNotMatch, setErrorPasswordNotMatch] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (password === confirmPassword) {
            setErrorPasswordNotMatch("");
            // setErrorPasswordNotMatch("Nhập lại mật khẩu không chính xác");
        }
        else {
            setErrorPasswordNotMatch("Nhập lại mật khẩu không chính xác");
        }
    })
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user-info")) !== null) {
            navigate('/home');
        }
    })
    const userSignup = e => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/v1/users/registration", {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === 'BAD_REQUEST') {
                    setErrorUserExist(response.data.data);
                } else {
                    navigate("/login");
                }
            })
            .catch((error) => {
                let errMess = error.response.data.data;
                let objkey = Object.keys(errMess);
                if (objkey.includes("firstName")) {
                    setErrorFistName(errMess.firstName);
                }
                if (objkey.includes("lastName")) {
                    setErrorLastName(errMess.lastName);
                }
                if (objkey.includes("username")) {
                    setErrorUsername(errMess.username);
                }
                if (objkey.includes("email")) {
                    setErrorEmail(errMess.email);
                }
                if (objkey.includes("password")) {
                    setErrorPassword(errMess.password);
                }
                console.log("Loi~")
                console.log(errMess)
            });
    }

    return (
        <><Navbarr/>
        <div id="signup-page">
            <div>
                <h1>Đăng ký</h1>
            </div>
            <div className='form-container'>
                <div className='form-custom form-custom__fullname'>
                    <div className='form-custom__firstName'>
                        <TextField
                            error={true ? errorFistName : false}
                            helperText={errorFistName}
                            className='form-custom-input'
                            id="outlined-basic"
                            label="Họ"
                            variant="outlined"
                            required onChange={e => {
                                setFirstName(e.target.value);
                                setErrorFistName("");
                                setErrorUserExist("");
                            }} />

                    </div>

                    <div className='form-custom__lastName'>
                        <TextField
                            error={true ? errorLastName : false}
                            helperText={errorLastName}
                            className='form-custom-input'
                            id="outlined-basic"
                            label="Tên"
                            variant="outlined"
                            required onChange={e => {
                                setLastName(e.target.value);
                                setErrorLastName("");
                                setErrorUserExist("");
                            }} />
                    </div>
                </div>

                <div className='form-custom'>
                    <TextField
                        error={true ? errorUsername : false}
                        helperText={errorUsername}
                        className='form-custom-input'
                        id="outlined-basic"
                        label="Tên người dùng"
                        variant="outlined"
                        required onChange={e => {
                            setUsername(e.target.value);
                            setErrorUsername("");
                            setErrorUserExist("");
                        }} />
                </div>


                <div className='form-custom'>

                    <TextField
                        error={true ? errorEmail : false}
                        helperText={errorEmail}
                        className='form-custom-input'
                        type="email"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        required onChange={e => {
                            setEmail(e.target.value);
                            setErrorEmail("");
                            setErrorUserExist("");
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
                            setErrorUserExist("");
                        }} />
                </div>


                <div className='form-custom'>
                    <TextField
                        error={true ? errorPasswordNotMatch.length > 10 : false}
                        helperText={errorPasswordNotMatch}
                        className='form-custom-input'
                        type="password"
                        id="outlined-basic"
                        label="Nhập lại mật khẩu"
                        variant="outlined"
                        required onChange={e => {
                            setConfirmPassword(e.target.value);
                            setErrorUserExist("");
                        }} />
                </div>

                <span className='col-2' style={{ color: "red" }}>{errorUserExist}</span>

                <div className='form-custom form-custom-btn'>
                    <div className='form-custom-btn-login'>
                        <Link to="/login">
                            <button className='btn btn-outline-secondary'>Đăng nhập</button>
                        </Link>
                    </div>

                    <div className='form-custom-btn-signup'>
                        <button className='btn btn-outline-primary' onClick={e => userSignup(e)}>Đăng ký</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Signup;