import React, { useState} from "react";
import {connect, useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import Button from "../../../components/atoms/Button";
import { actionUserName } from "../../../config/redux/action";
import {loginUserAPI} from '../../../config/redux/action';
import './Login.scss';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    // membuatnya menjadi asyncrohnus
    const handleChangeSubmit = async () => {
            const data = {
                email : email,
                password : password
            }

            const res = await this.props.loginAPI(data);
            // const navigate = useNavigate();
            
            // login untuk login
            if(res) {
                console.log('Login Success', res);
                setEmail('');
                setPassword('');
                // harus menggunakan react hook
                // return navigate('/');
            } else {
                console.log('Login Failed');
            }
    }

    return (
        <div className="login-page">
            <div className="card-login">
                <p className="title-login">login Page</p>
                <input id="email" className="input" type={'email'} placeholder={'email'} onChange={(e) => setEmail(e.target.value)} value={email}/>
                <input id="password" className="input" type={'password'} placeholder={'password'} onChange={(e) => setPassword(e.target.value)} value={password}/>
                <Button onClick={handleChangeSubmit} title='login'  />
            </div>
        </div>
    )
}

// konekan redux
const reduxState = (state) => {
    return {
        popupProps : state.popup,
        userName : state.user,
        isLoading : state.isLoading
    }
}

// fungsi utama dispatch
const reduxDispatch = (dispatch) => ({
    changeUserName : () => dispatch(actionUserName()),
    loginAPI : (data) => dispatch(loginUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Login);