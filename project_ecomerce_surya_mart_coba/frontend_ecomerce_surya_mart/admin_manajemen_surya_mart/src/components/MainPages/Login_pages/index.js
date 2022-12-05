//import hook react
import React, { useState, useEffect } from "react";

//import hook useHitory from react router dom
// import { useNavigate } from 'react-router';

//import axios
import axios from 'axios';
import { API_URL } from "../../../utils/apiUrl";

const Login = () => {

    const [user_email, setUser_email] = useState('');
    const [user_password, setUser_password] = useState('');

    const [validation, setValidation] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('user')) {
            console.log('login sucess', localStorage.getItem('user'));
        }
    }, [])


    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('user_email', user_email);
        formData.append('user_password', user_password);

        await axios.post(API_URL + 'login', formData)
        .then((response) => {
            console.log(response);
            localStorage.setItem('user', response.data);
            console.log('login success');
        })
        .catch((error) => {
            setValidation(error.response.data);
            console.log('login failed', error.response.data);
        })
    }

    return (
        <div className="container" style={{ marginTop: '120px' }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                        <h4 className="fw-bold">HALAMAN LOGIN</h4>
                            <hr/>
                            {
                                validation.message && (
                                    <div className="alert alert-danger">
                                        {validation.message}
                                    </div>
                                )
                            }
                            <form onSubmit={loginHandler}>
                                <div className="mb-3">
                                    <label className="form-label">EMAIL</label>
                                    <input type="text" className="form-control" value={user_email} onChange={(e) => setUser_email(e.target.value)} placeholder="Masukkan Email"/>
                                </div>
                            
                                <div className="mb-3">
                                    <label className="form-label">PASSWORD</label>
                                    <input type="password" className="form-control" value={user_password} onChange={(e) => setUser_password(e.target.value)} placeholder="Masukkan Password"/>
                                </div>
            
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">LOGIN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;