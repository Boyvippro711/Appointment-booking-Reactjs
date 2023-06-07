import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from "../../utils/emitter";



class UserManage extends Component {

   constructor(props) {
    super(props);
    this.state = {
        arrUsers: [],
        isOpenModalUser: false,
        isOpenModelEditUser: false,
        userEdit: {},
    }
   }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser : true,
        })       
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser : !this.state.isOpenModalUser,
        })       
    }

    toggleUserEditModal = () =>{
        this.setState({
            isOpenModelEditUser: !this.state.isOpenModelEditUser,
        })
    }

    createNewUser = async (data) => {
        try{
           let response = await createNewUserService(data);
           if(response && response.errCode !==0 ){
                alert(response.errMessage)
           }else{
            await this.getAllUserFromReact();
            this.setState({
                isOpenModalUser: false
            })
            emitter.emit('EVENT_CLEAR_MODAL_DATA')

           }
        }catch(e){
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try{
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0){
                await this.getAllUserFromReact();
            } else {
                alert(res.errMessage)
            }
            
        }catch(e){
            console.log(e)
        }
        console.log('click delete',user)
    }

    handleEditUser = (user) => {
        console.log('check edit user', user)
        this.setState({
            isOpenModelEditUser: true,
            userEdit: user
        })
    }

    UpdatetUser = async (user) =>{
        try{
            let res = await editUserService(user);
            if(res && res.errCode ===0){
                this.setState({
                    isOpenModelEditUser: false
                })

                await this.getAllUserFromReact();
            }
            else{
                alert(res.errMessage)
            }
        }catch(e){
            console.log(e)
        }
    }


    render() {
        let arrUsers = this.state.arrUsers;
        //console.log(arrUsers)
        return (
            <div className="users-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />

                {
                    this.state.isOpenModelEditUser && 
                    <ModalEditUser
                        isOpen = {this.state.isOpenModelEditUser}
                        toggleFromParent = {this.toggleUserEditModal}
                        currentUser = {this.state.userEdit}  
                        EditUser = {this.UpdatetUser}
                        
                    />}
                <div className='title text-center'> quản lý thông tin người dùng</div>
                
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                            onClick={() => this.handleAddNewUser()}
                            ><i className="fas fa-plus"></i>  Thêm mới </button>
                </div>


                
                <div className='users-table mt-3 mx-1'>
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Tài Khoản</th>
                            <th>Họ</th>
                            <th>Tên</th>
                            <th>Địa chỉ</th>
                            <th></th>
                        </tr>
                        
                            { arrUsers && arrUsers.map((item, index) =>{
                                return(
                                    <tr>
                                        <td>{item.email} </td>
                                        <td>{item.firstName} </td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td> 
                                            <button className='btn-edit'
                                                    onClick={() => this.handleEditUser(item)}
                                                    ><i className="fas fa-pencil-alt"></i></button> 
                                            <button className='btn-delete'
                                                    onClick={() => this.handleDeleteUser(item) }
                                                    ><i className="fas fa-trash"></i></button>
                                        </td>
                                        
                                    </tr>
                                )
                            })
                            }
                    </tbody>
      
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
