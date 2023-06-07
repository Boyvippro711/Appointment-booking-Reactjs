import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ROLE } from '../../utils';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }

        this.setState({
            menuApp: menu
        })
    }

    render() {
        let wel = 'xin chào, ';
        const { processLogout, userInfo } = this.props;
        // console.log('check userinfo', userInfo)
        return (
            <div className="header-container">
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>


                <div className='Logout'>
                    <div className='welcome'> {wel}
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''} ! </div>

                    <div className="btn btn-logout" onClick={processLogout} title='Thoát'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
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
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
