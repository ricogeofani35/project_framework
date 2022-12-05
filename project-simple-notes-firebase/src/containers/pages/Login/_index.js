import React, {Component} from "react";
import {connect} from 'react-redux';
import Button from "../../../components/atoms/Button";
import { actionUserName } from "../../../config/redux/action";
import {loginUserAPI} from '../../../config/redux/action';
import './Login.scss';

class Login extends Component {
    // test redux thunk
    // changeUser = () => {
    //     this.props.changeUserName();
    // }

    state = {
        email : '',
        password : '',
    }
    handleChangeText = (e) => {
        // supaya hanya input dengan id tertentu yang diubah / destrucing variabel
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    // membuatnya menjadi asyncrohnus
    handleChangeSubmit = async () => {

        const res = await this.props.loginAPI(this.state);
        
        // login untuk login
        if(res) {
            console.log('Login Success', res);
            // menyimpan data ke localstorage //ubah menjadi string datanya
            localStorage.setItem('userData', JSON.stringify(res));
            this.setState({
                email: '',
                password: ''
            });
            // this.props.history.push('/')
        } else {
            console.log('Login Failed');
        }

    }

    render() {
        return (
            <div className="login-page">
                <div className="card-login">
                    <p className="title-login">login Page</p>
                    <input id="email" className="input" type={'email'} placeholder={'email'} onChange={this.handleChangeText} value={this.state.email}/>
                    <input id="password" className="input" type={'password'} placeholder={'password'} onChange={this.handleChangeText} value={this.state.password}/>
                    <Button onClick={this.handleChangeSubmit} title='login' loading={this.props.isLoading} />
                </div>
            </div>
        )
    }
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

// parameternya state, dispatch = untuk merubah reducer
export default connect(reduxState, reduxDispatch)(Login);