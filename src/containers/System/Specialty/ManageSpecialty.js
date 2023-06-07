import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils'
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt;

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imgBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handldOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    hanldOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64,
            })
        }
    }

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success('Thêm mới chuyên khoa thành công')
            this.setState({
                name: '',
                imgBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error('Không thể thêm mới')
        }
        console.log('manage-specialty', res)
    }

    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='m-title'>Quản lý chuyên khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handldOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.hanldOnChangeImage(event)}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewSpecialty()}
                        >Lưu</button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
