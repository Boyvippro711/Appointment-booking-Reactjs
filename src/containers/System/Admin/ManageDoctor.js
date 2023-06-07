import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getInforDoctor } from '../../../services/userService';
import { CRUD_ACTIONS } from '../../../utils/constant';

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            selectedDoctor: '',
            listDoctors: [],
            isHasData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectClinic: '',
            selectSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let res = [];
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = `${item.lastName} ${item.firstName}`;
                    object.value = item.id
                    res.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.valueVi;
                    object.value = item.keyMap
                    res.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.valueVi;
                    object.value = item.keyMap
                    res.push(object)
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name;
                    object.value = item.id
                    res.push(object)
                })
            }
        }
        return res;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect,
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty
            })
        }
    }

    handleSaveContentMarkdwon = () => {
        let { isHasData } = this.state;
        this.props.saveInforDoctor({
            doctorId: this.state.selectedDoctor.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action: isHasData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }

    handleChangeDoctor = async (selectedDoctor, name) => {
        this.setState({ selectedDoctor });
        let { listPayment, listPrice, listProvince } = this.state;

        let res = await getInforDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.markdown) {
            let markdown = res.data.markdown;

            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '',
                selectedPrice = '', selectedPayment = '', selectedProvince = '';

            if (res.data.doctor_infor) {
                addressClinic = res.data.doctor_infor.addressClinic;
                nameClinic = res.data.doctor_infor.nameClinic;
                note = res.data.doctor_infor.note

                paymentId = res.data.doctor_infor.paymentId;
                priceId = res.data.doctor_infor.priceId;
                provinceId = res.data.doctor_infor.provinceId;

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                isHasData: true,
                addressClinic: addressClinic,
                note: note,
                nameClinic: nameClinic,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                isHasData: false,
                addressClinic: '',
                note: '',
                nameClinic: '',
            })
        }
    }

    handleChangeSelectDoctorInfor = (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy
        })
        console.log('slect', selectedDoctor, stateName)
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }


    render() {
        let { isHasData, listSpecialty } = this.state;
        console.log('steateA', this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Bổ sung thông tin bác sĩ Lưu thông tin
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeDoctor}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>

                <div className='doctor-infor-extra row' >
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 from-group'>
                        <label>Địa chỉ</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tỉnh/Thành</label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={'Chọn Tỉnh/Thành'}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Giá tiền</label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={'Chọn Giá tiền'}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Phương thức thanh toán</label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={'Chọn Phương thức thanh toán'}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Ghi chú</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label>Chuyên khoa</label>
                        <Select
                            value={this.state.selectSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={'Chọn chuyên khoa'}
                            name='selectSpecialty'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Phòng khám</label>
                        <Select
                            value={this.state.selectClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={'Chọn phòng khám'}
                            name='selectClinic'
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} value={this.state.contentMarkdown} />
                </div>

                <button className={isHasData === true ? 'save-infor-doctor' : 'create-infor-doctor'}
                    onClick={() => this.handleSaveContentMarkdwon()}
                >
                    {isHasData === true ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveInforDoctor: (data) => dispatch(actions.postInforDoctor(data)),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
