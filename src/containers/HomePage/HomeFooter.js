import React, { Component } from 'react';
import { connect } from 'react-redux';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2023 <a>BookingCare - Nền tảng y tế sức khỏe toàn diện </a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
