import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { getProfileDoctor } from '../../../services/userService';
import NumericFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';


class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }


    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = [];
        if (id) {
            let res = await getProfileDoctor(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            // this.getInforDoctor(this.props.doctorId)
        }
    }

    renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueVi;
            let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY');
            return (
                <>
                    <div>{time} - {date}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { dataProfile } = this.state
        let { isShowDescription, dataTime } = this.props
        //console.log('chel dataProfile.props,', dataTime)
        let name = '';
        if (dataProfile && dataProfile.positionData) {
            name = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {name}
                        </div>
                        <div className='down'>
                            {isShowDescription === true ?
                                <>
                                    {dataProfile.markdown && dataProfile.markdown.description &&
                                        <span>
                                            {dataProfile.markdown.description}
                                        </span>
                                    }
                                </>
                                : <>{this.renderTimeBooking(dataTime)}</>
                            }
                        </div>
                    </div>

                </div>

                <div className='price'>
                    Giá khám:
                    {dataProfile && dataProfile.doctor_infor ?
                        <NumericFormat
                            className='currency'
                            value={dataProfile.doctor_infor.priceTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true} suffix={'VND'}
                        />
                        : ''
                    }

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
