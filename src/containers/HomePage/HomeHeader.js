import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/Logo.svg';
import { withRouter } from 'react-router'


class HomeHeader extends Component {
    returnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home/`)
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo}
                                onClick={() => this.returnHome()}
                            />
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div className='subs-title'> <b>Chuyên Khoa</b></div>
                                <div>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div className='subs-title'> <b>Cơ sở y tế</b></div>
                                <div>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div className='subs-title'> <b>Bác sĩ</b></div>
                                <div>Chọn bác sĩ</div>
                            </div>
                            <div className='child-content'>
                                <div className='subs-title'> <b>Gói khám</b></div>
                                <div>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"> Hỗ trợ </i>
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>NỀN TẢNG Y TẾ </div>
                            <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='tìm kiếm tổng quát' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="far fa-hospital"></i></div>
                                    <div className='text-child'>Khám chuyên khoa</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'>Khám từ xa</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-stethoscope"></i></div>
                                    <div className='text-child'>Khám tổng quát</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-flask"></i></div>
                                    <div className='text-child'>xét nghiệm y học</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'>Sức khỏe tinh thần</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'>Khám nha khoa</div>
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
