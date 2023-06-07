import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            reason: '',
            doctorId: '',
            genders: '',
            address: '',
            birthday: '',
            selectGender: '',
            timeType: '',
            currentNumber: '',
            isLength: false,
            maxNumber: '',
            id: '',
        }
    }


    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = item.valueVi;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.gender !== this.props.gender) {
            this.setState({
                genders: this.buildDataGender(this.props.gender),
            })
        }
        if (prevProps.currentNumber !== this.props.currentNumber) {
            this.setState({
                currentNumber: this.props.currentNumber
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    hanldChangeSelect = (selectOption) => {
        this.setState({
            selectGender: selectOption
        })
    }

    buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueVi;
            let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY');
            return `${time} - ${date}`
        }
        return ''
    }

    buildDoctorName = (dataTime) => {
        let name = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
        return name
    }

    // buildcurrentNumber = (currentNumber1) => {
    //     return (
    //         this.setState({
    //             currentNumber: currentNumber1
    //         })
    //     )
    // }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        //this.buildcurrentNumber(this.props.currentNumber);
        let currentNumber = this.state.currentNumber;
        console.log('check currentNumber ', currentNumber)
        let maxNumber = this.props.dataTime.maxNumber;
        console.log('maxNumber ', maxNumber)
        let id = this.props.dataTime.id;
        console.log('id ', id)
        //console.log('check string state.currentNumber', this.state.currentNumber)
        let res = await postBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            reason: this.state.reason,
            doctorId: this.state.doctorId,
            address: this.state.address,
            date: this.props.dataTime.date,
            birthday: date,
            selectGender: this.state.selectGender.value,
            timeType: this.state.timeType,
            timeString: timeString,
            doctorName: doctorName,
            isLength: this.state.isLength,
            currentNumber: this.state.currentNumber,
            maxNumber: maxNumber,
            id: id,
        })
        if (res && res.errCode === 0) {
            console.log('check postBookAppointment state success', this.state)
            toast.success('Đặt lịch hẹn thành công')
            this.props.closeBookingModal();
        } else {
            toast.error('Đặt lịch thất bại')
            console.log('check postBookAppointment state error', res)
        }
    }

    render() {
        let { isOpenModal, closeBookingModal, dataTime, currentNumber } = this.props;
        console.log('check reder data time ', dataTime.id)
        console.log('check reder data time ', currentNumber)
        console.log('check reder data time ', dataTime.maxNumber)
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'} size='lg' centered >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span className='right'
                            onClick={closeBookingModal}
                        ><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescription={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên</label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Ngày sinh</label>
                                <DatePicker className='form-control'
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.birthday}

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <Select
                                    value={this.state.selectGender}
                                    onChange={this.hanldChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking()}
                        >Xác nhận</button>
                        <button className='btn-booking-cancel' onClick={closeBookingModal}>
                            Hủy</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        gender: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
