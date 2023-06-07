import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerSchedule.scss';
import * as actions from '../../../../store/actions';
import { getScheduleByDorId_Date } from '../../../../services/userService'
import moment from 'moment';


class TableManagerSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TimeArr: [],
        }
    }

    async componentDidMount() {
        // let timeArr = await getScheduleByDorId_Date(this.props.doctorId, this.props.currentDate)
        // this.setState({
        //     TimeArr: timeArr
        // })
        // console.log('check state TimeArr: ', timeArr)
    }

    getSchedule = (doctorId, currentDate) => {
        let timeArr = getScheduleByDorId_Date(doctorId, currentDate);
        return timeArr
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId || prevProps.currentDate !== this.props.currentDate) {
            //let timeArr = await getScheduleByDorId_Date(this.props.doctorId, this.props.currentDate);
            //let timeData = timeArr.data;

            let timeData = await this.getSchedule(this.props.doctorId, this.props.currentDate)
            this.setState({
                TimeArr: timeData.data
            })
        }
    }

    handleDeleteUser = (schedule) => {
        this.props.Deleteuser(schedule);
    }

    handleEditSchedule = (schedule) => {
        this.props.handleEditScheduleFromParent(schedule)
    }

    render() {
        let TimeArr = this.state.TimeArr;
        //console.log('check state TimeArr: ', this.state.TimeArr)
        return (
            <React.Fragment>
                <table id='TableManagerSchedule'>
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>Ngày khám</th>
                            <th>Khung giờ</th>
                            <th>Sô lượng bệnh nhân</th>
                            <th></th>
                        </tr>

                        {TimeArr && TimeArr.length > 0 ?
                            TimeArr.map((item, index) => {
                                let time = item.timeTypeData.valueVi;
                                let date = moment.unix(+item.date / 1000).format('dddd - DD/MM/YYYY');
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{date} </td>
                                        <td>{time}</td>
                                        <td>{item.maxNumber} </td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditSchedule(item)}

                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteSchedule(item)}

                                            ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan='5' style={{ textAlign: 'center' }}>Chưa đặt khung giờ khám </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        //allUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getAllUsers: () => dispatch(actions.fetchAllUsersStart()),
        // Deleteuser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerSchedule);
