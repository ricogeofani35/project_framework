import React, {Component} from "react";
import './Register.scss';
import Button from "../../../components/atoms/Button";
import {connect} from 'react-redux';
import {registerUserAPI} from '../../../config/redux/action';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


class Register extends Component {
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
    handleChangeSubmit = () => {

        this.props.registerAPI(this.state);

        this.setState({
            email: '',
            password: ''
        })

        // const auth = getAuth();
        // createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
        // .then((result) => {
        //     console.log('success : ', result);
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log('errorCode : ', errorCode);
        //     console.log('errorMessage : ', errorMessage);
        // });
    }

    render() {
        return (
            <div className="register-page">
                <div className="card-register">
                    <p className="title-register">Register Page</p>
                    <input id="email" className="input" type={'email'} placeholder={'email'} onChange={this.handleChangeText} value={this.state.email}/>
                    <input id="password" className="input" type={'password'} placeholder={'password'} onChange={this.handleChangeText} value={this.state.password}/>
                    <Button onClick={this.handleChangeSubmit} title='Register' loading={this.props.isLoading} />
                </div>
                {/* <button>Go To Login</button> */}
            </div>
        )
    }
}

const reduxState = (state) => {
    return {
        isLoading : state.isLoading
    }
}

const reduxDispatch = (dispatch) => {
    return {
        registerAPI : (data) => dispatch(registerUserAPI(data))
    }
}

export default connect(reduxState, reduxDispatch)(Register);
// export default Register;