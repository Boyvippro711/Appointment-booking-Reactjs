import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from "../../utils/emitter";
import _ from 'lodash';

class ModalEditUser extends Component {

   constructor(props){
    super(props);
    this.state = {
        id: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: ''
    }

   }

    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })

        }
        console.log('00000', this.props.currentUser)
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
        //console.log(event.target.value, id)
    }

    checkValidateInput = () => {
        let isValie = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for(let i =0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValie = false;
                alert('thieu thong tin' + arrInput[i]);
                break;
            }
        }
        return  isValie;
    }

    handleSaveUser = () => {
        let isVaild = this.checkValidateInput();
        if(isVaild === true){
            //console.log('check props', this.props)
            this.props.EditUser(this.state);

        }
    }


    render() {
        return (
            <Modal  
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => {this.toggle()}}>Cập nhật</ModalHeader>   
                <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                    <label>Tài khoản</label>
                                    <input type='text'onChange={(event) => {this.handleOnChangeInput(event, 'email')}} value={this.state.email} disabled/>
                            </div>

                            <div className='input-container'>
                                    <label>Mật khẩu</label>
                                    <input type='password' onChange={(event) => {this.handleOnChangeInput(event, 'password')}} value={this.state.password} disabled/>
                            </div>

                            <div className='input-container'>
                                    <label>Họ</label>
                                    <input type='text' onChange={(event) => {this.handleOnChangeInput(event, 'firstName')}}value={this.state.firstName}/>
                            </div>

                            <div className='input-container'>
                                    <label>Tên</label>
                                    <input type='text' onChange={(event) => {this.handleOnChangeInput(event, 'lastName')}}value={this.state.lastName}/>
                            </div>

                            <div className='input-container max-width-input'>
                                    <label>Địa chỉ</label>
                                    <input type='text' onChange={(event) => {this.handleOnChangeInput(event, 'address')}}value={this.state.address}/>
                            </div>
                        </div>
                                
                            
                 </ModalBody>
                 <ModalFooter>
                    <Button color='primary' className='px-3' 
                            onClick={() => {this.handleSaveUser()}}>Lưu</Button>
                    <Button color='secondary' className='px-3' onClick={() => {this.toggle()}}>Đóng</Button>

                 </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
