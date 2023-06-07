import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'; 
import { withRouter } from 'react-router'


class OutStanding_Doctor extends Component {
    constructor(props){
        super(props);
            this.state = {
                arrDoctors: [],
            }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topDoctor !== this.props.topDoctor) {
            this.setState({
                arrDoctors: this.props.topDoctor
            })
        }
    }

    componentDidMount() {
        this.props.loadDoctors();
    }

    handleViewDetailDoctor = (input) => {
        if(this.props.history){
            this.props.history.push(`/detail-doctor/${input.id}`)
        }
    }

    render() {
       let arrDoctors = this.state.arrDoctors;
    //    arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
       console.log('123456', arrDoctors)
        return (
            <div className='section-share section-outstanding-doctor'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Các bác sĩ nổi bật</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                <div className='section-body'>
                    <Slider {...this.props.settings}>
                        {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                            let imageBase64 = '';
                            if(item.image){
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                            let name = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                            return (
                                <div className='section-customize' key={index}
                                    onClick={() => this.handleViewDetailDoctor(item)}
                                >
                                    <div className = 'customize-border'>
                                        <div className='outer-bg'>
                                            <div className='bg-image section-outstanding-doctor'
                                                style={{backgroundImage: `url(${imageBase64})`}}
                                            />
                                        </div>
                                        <div className='position text-center'> 
                                            <div>{name}</div>
                                            <div>Cơ xương khớp 1</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </Slider>
                </div>     
            </div>
        </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctor: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStanding_Doctor));

