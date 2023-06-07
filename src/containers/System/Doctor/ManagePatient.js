import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
//import { getAllPatientForDoctor } from '../../../services/userService';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isLoading: false
        }
    }

    async componentDidMount() {
        this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formateDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formateDate
        })
        //console.log('0000000000000000s', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }

    handleBtnConfirm = (item) => {
        // console.log("item:", item)
        // return;
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isLoading: true
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName,
        })
        //console.log('dataModal check', dataModal)
        if (res && res.errCode === 0) {
            this.setState({
                isLoading: false
            })
            toast.success('Gửi đơn thuốc thành công')
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isLoading: false
            })
            toast.error('Gửi đơn thuốc thất bại')
            console.log(' error send remedy: ', res)
        }
    }


    render() {
        let { dataPatient, dataModal, isOpenRemedyModal } = this.state
        //console.log('asdas', dataPatient)
        return (
            <>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Đang truyền dữ liệu...'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-2 form-group'>
                                <label>Chọn ngày khám</label>
                                <DatePicker className='form-control'
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.currentDate}
                                //minDate={yesterday}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và Tên</th>
                                            <th>Giới tính</th>
                                            <th>Địa chỉ</th>
                                            <th>Điện thoại</th>
                                            <th></th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = item.timeTypeDataPatient.valueVi;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.genderData.valueVi}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{item.patientData.phoneNumber}</td>
                                                        <td>
                                                            <button className='btn-confirm'
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >Xác nhận</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan='7' style={{ textAlign: 'center' }}>Không có lịch hẹn</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
