import React, { Component } from 'react';
import { connect } from "react-redux";
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import "./verifyemail.scss";

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
            //console.log('token', token, doctorId)
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { statusVerify, errCode } = this.state
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>
                            Đang chờ dữ liệu
                        </div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='result-booking'>Xác nhận lịch khám thành công</div>
                                :
                                <div className='result-booking'>Lịch khám đã được xác nhận hoặc không tồn tại</div>
                            }
                        </div>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
