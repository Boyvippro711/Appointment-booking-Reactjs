import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import { CRUD_ACTIONS, CommonUtils } from '../../../utils';
import TableManagerUser from './TableManagerUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            preViewImg: '',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            userEditId: '',
            action: '',
        }
    }

    async componentDidMount() {
        this.props.getRoleStart();
        this.props.getGenderStart();
        this.props.getPositionStart();

        // try{
        //    let res = await getAllCodeService('gender');
        //    if(res && res.errCode === 0){
        //     this.setState({
        //         genderArr: res.data
        //     })
        //    }
        // }catch(e){
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.gender !== this.props.gender) {
            let arrGenders = this.props.gender;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.role !== this.props.role) {
            let arrRole = this.props.role;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }
        if (prevProps.position !== this.props.position) {
            let arrposition = this.props.position;
            this.setState({
                positionArr: arrposition,
                position: arrposition && arrposition.length > 0 ? arrposition[0].keyMap : ''
            })
        }
        if (prevProps.allUsers !== this.props.allUsers) {
            let arrGender = this.props.gender
            let arrRole = this.props.role
            let arrPosition = this.props.position

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                preViewImg: '',
            })
        }
    }

    hanldOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let Objurl = URL.createObjectURL(file);
            this.setState({
                preViewImg: Objurl,
                avatar: base64
            })
        }
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Bạn chưa điền thông tin: ' + arrCheck[i])
                break
            }
        }
        return isValid;
    }

    hanldCreateUser = () => {
        let isvalid = this.checkValidateInput();
        if (isvalid === false)
            return;

        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                phonenumber: this.state.phoneNumber,
                avatar: this.state.avatar
            });
        }

        if (action === CRUD_ACTIONS.EDIT) {
            this.props.UpdatetUser({
                id: this.state.userEditId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                phonenumber: this.state.phoneNumber,
                avatar: this.state.avatar,
            })
        }
    }

    handleEditUserFromParent = (user) => {
        //console.log('check handle edit parent', user)
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            userEditId: user.id,
            email: user.email,
            password: '********',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            //avatar: '',
            preViewImg: imageBase64,
            action: CRUD_ACTIONS.EDIT,
        })
    }


    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;

        let { email, password, firstName, lastName, phoneNumber,
            address, gender, position, role, avatar } = this.state;

        return (
            <div className='user-redux-container'>
                <div className="title" >QUẢN LÝ THÔNG TIN NGƯỜI DÙNG</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>Thêm mới người dùng</div>
                            <div className='col-3'>
                                <label>Tài khoản</label>
                                <input className='form-control' type='email' value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />
                            </div>
                            <div className='col-3'>
                                <label>Mật khẩu</label>
                                <input className='form-control' type='password' value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />
                            </div>
                            <div className='col-3'>
                                <label>Họ</label>
                                <input className='form-control' type='text' value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')} />
                            </div>
                            <div className='col-3'>
                                <label>Tên</label>
                                <input className='form-control' type='text' value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')} />
                            </div>
                            <div className='col-3'>
                                <label>Số điện thoại</label>
                                <input className='form-control' type='text' value={phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className='col-9'>
                                <label>Địa chỉ</label>
                                <input className='form-control' type='text' value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')} />
                            </div>
                            <div className='col-3'>
                                <label>Giới tính</label>
                                <select className='form-control' value={gender}
                                    onChange={(event) => this.onChangeInput(event, 'gender')}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {item.valueVi}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Chức vụ</label>
                                <select className='form-control' value={position}
                                    onChange={(event) => this.onChangeInput(event, 'position')}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {item.valueVi}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Vai trò</label>
                                <select className='form-control' value={role}
                                    onChange={(event) => this.onChangeInput(event, 'role')}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {item.valueVi}
                                                </option>
                                            )
                                        })}

                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Ảnh đại diện</label>
                                <div className='preview-Img'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.hanldOnChangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.preViewImg})` }}
                                    ></div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.hanldCreateUser()}
                                >{this.state.action === CRUD_ACTIONS.EDIT ? 'Lưu thay đổi' : 'Đăng ký'}
                                </button>
                            </div>

                            <div className='col-12 mb-5'>
                                <TableManagerUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        gender: state.admin.genders,
        role: state.admin.roles,
        position: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        allUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        UpdatetUser: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
