import React, { Component } from 'react';
import { connect } from "react-redux";
import '../../HomePage/HomeHeader';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getInforDoctor } from '../../../services/userService';
import ScheduleDocr from './ScheduleDocr';
import ExtraInfoDoctor from './ExtraInfoDoctor';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        //console.log('detail doctor', this.state)
        let { detailDoctor } = this.state;
        let name = '';
        if (detailDoctor && detailDoctor.positionData) {
            name = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }
        let imageBase64 = '';
        if (detailDoctor && detailDoctor.image ? detailDoctor.image : '') {
            imageBase64 = new Buffer(detailDoctor.image, 'base64').toString('binary');
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${imageBase64})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {name}
                            </div>
                            <div className='down'>
                                {detailDoctor.markdown && detailDoctor.markdown.description &&
                                    <span>
                                        {detailDoctor.markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <ScheduleDocr
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                        <div className='content-right'>
                            <ExtraInfoDoctor
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor.markdown && detailDoctor.markdown.contentMarkdown &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.markdown.contentHTML }}>

                            </div>
                        }
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
