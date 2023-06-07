import React, { Component } from 'react';
import { connect } from "react-redux";
import './ExtraInfoDoctor.scss';
import { getExtraInforDoctort } from '../../../services/userService';
import NumericFormat from 'react-number-format';


class ExtraInfoDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            extraInfor: {},
        }
    }


    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctort(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
            //console.log('res', res)

        }
    }

    isShowHide = (state) => {
        this.setState({
            isShow: state
        })
    }


    render() {
        let { isShow, extraInfor } = this.state;
        //console.log(' this.state', this.state)
        return (
            <div className='doctor-extra-info-container' >
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='clinic-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShow === false ?
                        <div className='short-infor'>
                            GIÁ KHÁM:
                            {extraInfor && extraInfor.priceTypeData &&
                                <NumericFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true} suffix={'VND'}
                                />
                            }
                            <span className='detail' onClick={() => this.isShowHide(true)}>Xem chi tiết</span>
                        </div>
                        :
                        <>
                            <div className='title-price'>GIÁ KHÁM:  </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Giá khám: </span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData &&
                                            <NumericFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true} suffix={'VND'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                Người bệnh có thể thanh toán chi phí bằng hình thức:
                                {extraInfor && extraInfor.paymentTypeData ? extraInfor.paymentTypeData.valueVi : ''}
                            </div>
                            <div className='hide-infor'><span onClick={() => this.isShowHide(false)}>
                                Ẩn bảng giá</span></div>
                        </>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ExtraInfoDoctor);
