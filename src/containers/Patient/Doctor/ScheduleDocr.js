import React, { Component } from 'react';
import { connect } from "react-redux";
import './ScheduleDocr.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleByDate } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';


class ScheduleDocr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ofDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
            currentNumber: '',
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = () => {
        let ofDay = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let uppercase = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${uppercase}`;
                object.label = today;
            } else {
                let uppercase = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(uppercase)
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            ofDay.push(object);
        }
        return ofDay;
    }

    async componentDidMount() {
        let allDays = this.getArrDays();
        this.setState({
            ofDays: allDays,
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let allDays = this.getArrDays();
            let res = await getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvalableTime: res.data ? res.data : [],
            })
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }



        }
    }

    handleClickScheduleTime = (time) => {
        let currentNumber = time.currentNumber;
        console.log('check time:', time)
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
            currentNumber: currentNumber
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        //console.log('check allAvalableTime: ', this.state.allAvalableTime)
        let { ofDays, allAvalableTime, isOpenModalBooking, dataScheduleTimeModal, currentNumber } = this.state;

        return (
            <>
                <div className='doctor-schedule-container' >
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {ofDays && ofDays.length > 0 &&
                                ofDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                    <div className='all-valilable-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span>Lịch khám</span></i>
                        </div>
                        <div className='time-content'>
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvalableTime.map((item, index) => {
                                            return (
                                                <button
                                                    key={index}
                                                    className='btn-vi'
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >
                                                    {item.timeTypeData.valueVi}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className='book-free'>
                                        <span>Chọn <i className='far fa-hand-point-up'></i> và đặt (miễn phí)</span>
                                    </div>
                                </>
                                :
                                <div className='no-schedule'>Hiện không có lịch hẹn trong thời gian này, vui vòng chuyển sang thời gian khác</div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                    currentNumber={currentNumber}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDocr);
