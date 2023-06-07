import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStanding_Doctor from './Section/OutStanding_Doctor'; 
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';

import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class HomePage extends Component {

    handleAfterChange = (index,) => {

    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // afterChange: this

        }; 
       
        return (
            <div>
                <HomeHeader isShowBanner={true}/>
                <Specialty settings = {settings}/>
                <MedicalFacility settings = {settings}/>
                <OutStanding_Doctor settings = {settings}/>
                <HandBook settings = {settings}/>
                <About/>
                <HomeFooter/>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
