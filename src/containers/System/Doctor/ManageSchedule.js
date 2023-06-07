
import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
//import DatePicker from 'react-flatpickr';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import { dateFormat } from '../../../utils';
import _ from 'lodash'
import { saveScheduleDoctor } from '../../../services/userService';
import TableManagerSchedule from '../Doctor/Section/TableManagerSchedule';


class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: [],
            currentDate: '',
            rangeTime: [],
            numBer: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchScheduleHours();
    }

    buildDataInputSelect = (inputData) => {
        let res = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                object.label = `${item.lastName} ${item.firstName}`
                object.value = item.id
                res.push(object)
            })
        }
        return res;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect,
            })
        }
        if (prevProps.scheduleTime !== this.props.scheduleTime) {
            let data = this.props.scheduleTime;
            if (data && data.length > 0) {
                data.map(item => {
                    item.isSelected = false;
                    return item;
                })
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    handleChangeDoctor = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });

    }

    handleOnChangeDatePicker = (date) => {
        console.log('date:', date)
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickTime = (time) => {
        let { rangeTime } = this.state;
        console.log('before time', rangeTime)
        if (rangeTime && rangeTime.length > 0) {
            rangeTime.map(item => {
                if (item.id === time.id)
                    item.isSelected = !item.isSelected;
                return item;
            })

            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { selectedDoctor, currentDate, rangeTime, numBer } = this.state
        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        //let formatDate = moment(currentDate).unix();
        let formatDate = new Date(currentDate).getTime();
        let result = [];
        if (!currentDate) {
            toast.error('Thời gian không hợp lệ');
            return;
        }
        if (!selectedDoctor && _.isEmpty(formatDate)) {
            toast.error('Chưa có bác sĩ');
            return;
        }
        if (!numBer) {
            toast.error('Chưa chọn giới hạn bệnh nhân');
            return;
        }
        if (rangeTime && rangeTime.length > 0) {
            let selectTime = rangeTime.filter(item => item.isSelected === true);
            if (selectTime && selectTime.length > 0) {
                selectTime.map(time => {
                    let object = {
                        doctorId: selectedDoctor.value,
                        date: formatDate,
                        timeType: time.keyMap,
                    };
                    result.push(object);
                })
            } else {
                toast.error('Chưa chọn thời gian')
                return;
            }
        }

        let res = await saveScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatDate,
            maxNumber: numBer,
        })
        if (res && res.errCode === 0) {
            toast.success('Lưu thông tin thành công')
        } else {
            toast.error('Lưu thông tin thất bại')
            console.log('Lưu thông tin vào database thất bại', res)
        }
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditScheduleFromParent = (schedule) => {
        let { selectedDoctor, rangeTime } = this.state
        selectedDoctor.value = schedule.doctorId
        if (rangeTime && rangeTime.length > 0) {
            rangeTime.map(item => {
                if (item.keyMap === schedule.timeType)
                    item.isSelected = true;
                return item;
            })
        }
        this.setState({
            selectedDoctor: selectedDoctor,
            currentDate: schedule.date,
            numBer: schedule.maxNumber,
            rangeTime: rangeTime,
        })
    }


    render() {
        let { rangeTime, numBer, selectedDoctor, currentDate } = this.state;
        let formatDate = new Date(currentDate).getTime();
        //console.log('check selectedDoctor', selectedDoctor)
        //console.log('check formatDate', formatDate)
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    Quản lý lịch khám bệnh
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-5 form-group'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeDoctor}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-5 form-group'>
                            <label>Chọn ngày</label>
                            <DatePicker className='form-control'
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-2 form-group'>
                            <label>Số lượng bệnh nhân</label>
                            <input className='form-control' type='text' value={numBer}
                                onChange={(event) => this.onChangeInput(event, 'numBer')} />
                        </div>
                        <div className='col-12 pick-hour'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'} key={index}
                                            onClick={() => this.handleClickTime(item)}
                                        >{item.valueVi}</button>
                                    )
                                })}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >lưu thông tin</button>
                        </div>

                        <div className='col-12 mb-5'>
                            <TableManagerSchedule
                                handleEditScheduleFromParent={this.handleEditScheduleFromParent}
                                //action={this.state.action} 
                                doctorId={selectedDoctor.value}
                                currentDate={formatDate}
                            />
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        scheduleTime: state.admin.scheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchScheduleHours: () => dispatch(actions.fetchScheduleHours())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
