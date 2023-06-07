import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerUser.scss';
import * as actions from '../../../store/actions';


// ----------------------------------

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

// -----------------------------------


class TableManagerUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userArr: []
        }
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allUsers !== this.props.allUsers) {
            this.setState({
                userArr: this.props.allUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.Deleteuser(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {
        let arrUsers = this.state.userArr
        return (
            <React.Fragment>
                <table id='TableManagerUser'>
                    <tbody>
                        <tr>
                            <th>Tài Khoản</th>
                            <th>Họ</th>
                            <th>Tên</th>
                            <th>Địa chỉ</th>
                            <th></th>
                        </tr>

                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email} </td>
                                        <td>{item.lastName}</td>
                                        <td>{item.firstName} </td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditUser(item)}

                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}

                                            ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}

            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        allUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(actions.fetchAllUsersStart()),
        Deleteuser: (id) => dispatch(actions.deleteUser(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
