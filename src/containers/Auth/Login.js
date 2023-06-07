import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";


import './Login.scss';

import { FormattedMessage } from 'react-intl';
//import { handleLoginAPI } from '../../services/userService'
import { handleLoginAPI } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })

    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })

    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLoginAPI(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }

            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('thanh cong')
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('111111', error.response)
        }
    }

    hanleShowhidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }

    render() {
        return (
            <div className="login-backgroud">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Đăng Nhập</div>
                        <div className="col-12 form-group login-input">
                            <label>Tài khoản</label>
                            <input type='text'
                                className="form-control"
                                placeholder='Nhập tài khoản'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)} />
                        </div>

                        <div className="col-12 form-group login-input">
                            <label>Mật khẩu</label>
                            <div className='hide-show-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder='Nhập mật khẩu'
                                    value={this.state.password}
                                    onChange={(event) => { this.handleOnChangePassword(event) }}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span
                                    onClick={() => { this.hanleShowhidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>


                        <div className="col-12">
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Đăng Nhập</button>
                        </div>

                        <div className="col-12">
                            <span className='forgot-password'>Quên mật khẩu</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className='text-other-login'>Hoặc </span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>

                    </div>
                </div>

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
