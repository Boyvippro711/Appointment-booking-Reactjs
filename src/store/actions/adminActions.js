import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService,
    getTopDoctorHomeService, getAllDoctors, saveInforDoctor, getAllSpecialty
} from '../../services/userService';
// import { toast } from 'react-toastify';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }

        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderFailed error', e)
        }
    }
}

export const fetchGenderSuccess = (GenderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: GenderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})


export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                //console.log('getstate: ', res)
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }

        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed error', e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED
})


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch ({type: actionTypes.FETCH_ROLE_START})
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                //console.log('role: ', res)
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }

        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed error', e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED
})

export const createNewUser = (dataInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(dataInput);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess())
                toast.success("Thêm người dùng thành công")
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Lỗi thêm mới")
                dispatch(createUserFailed())
            }

        } catch (e) {
            dispatch(createUserFailed());
            console.log('createUserFailed error', e)
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FALIDED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error("Lỗi truy xuất người dùng")
                dispatch(fetchAllUsersFailed())
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data,
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIDED,
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Đã xóa người dùng")
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Xóa thất bại")
                dispatch(deleteUserFailed())
            }

        } catch (e) {
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAIDED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                console.log('00000000000')
                toast.success("Cập nhật thông tin thành công")
                // *
                dispatch(fetchAllUsersStart())
                // *
            } else {
                toast.error("Lỗi cập nhật 1")
                dispatch(editUserFailed())
            }

        } catch (e) {
            //toast.error("Lỗi cập nhật 2")
            dispatch(editUserFailed());
            console.log('editUserFailed error', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAIDED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIDED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAIDED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIDED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAIDED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTOR_FAIDED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAIDED
            })
        }
    }
}

export const postInforDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInforDoctor(data);
            //console.log("check postInforDoctor ", res)
            if (res && res.errCode === 0) {
                toast.success('Lưu thông tin thành công')
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS,
                })
            } else {
                toast.error('Lưu thông tin thất bại')
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_FAIDED,
                })
            }
        } catch (e) {
            toast.error('Lưu thông tin thất bại')
            console.log('SAVE_INFOR_DOCTOR_FAIDED', e)
            dispatch({
                type: actionTypes.SAVE_INFOR_DOCTOR_FAIDED
            })
        }
    }
}

export const fetchScheduleHours = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            //console.log("check ScheduleHours ", res)
            if (res && res.errCode === 0) {
                //toast.success('Lưu thông tin thành công')
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_HOURS_SUCCESS,
                    dataTime: res.data
                })
            } else {
                toast.error('Không thể lấy khung giờ')
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_HOURS_FAIDED,
                })
            }
        } catch (e) {
            toast.error('Lưu thông tin thất bại')
            console.log('FETCH_SCHEDULE_HOURS_FAIDED', e)
            dispatch({
                type: actionTypes.FETCH_SCHEDULE_HOURS_FAIDED
            })
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFailed())
            }

        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchRequiredDoctorInforFailed error', e)
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED
})



