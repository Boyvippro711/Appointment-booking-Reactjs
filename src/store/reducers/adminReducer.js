// import actionTypes from '../actions/actionTypes';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    scheduleTime: [],
    allRequiredDoctorInfor: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_FAIDED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_START:
            let copystate = { ...state };
            copystate.isLoadingGender = true;
            return {
                ...copystate
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            //console.log('check action potions: ', state)
            state.isLoadingGender = false;
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_FAIDED:
            state.isLoadingGender = false;
            state.positions = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_START:
            let Copystate = { ...state };
            Copystate.isLoadingGender = true;
            return {
                ...Copystate
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            //console.log('check action role: ', action)
            state.roles = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_FAIDED:
            state.roles = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            // console.log('000000', state.users)
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USER_FAIDED:
            state.users = [];
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctor;
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTOR_FAIDED:
            state.topDoctors = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTOR_FAIDED:
            state.allDoctors = [];
            return {
                ...state
            }

        case actionTypes.FETCH_SCHEDULE_HOURS_SUCCESS:
            state.scheduleTime = action.dataTime;
            return {
                ...state
            }

        case actionTypes.FETCH_SCHEDULE_HOURS_FAIDED:
            state.scheduleTime = [];
            return {
                ...state
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            //.log('>>>>FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS', action)
            return {
                ...state
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;