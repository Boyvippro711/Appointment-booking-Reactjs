import axios from '../axios';

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    //return axios.delete('/api/delete-user', {id: userId})

    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputdata) => {
    //return axios.delete('/api/delete-user', {id: userId})

    return axios.put('/api/edit-user', inputdata);
}

const getAllCodeService = (inputype) => {
    return axios.get(`/api/allcode?type=${inputype}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveInforDoctor = (data) => {
    return axios.post(`/api/save-infor-doctors`, data);
}

const getInforDoctor = (inpuntId) => {
    return axios.get(`/api/get-infor-doctor-by-id?id=${inpuntId}`);
}

const getScheduleByDorId_Date = (doctorId, date) => {
    return axios.get(`/api/get-schedules-by-date?doctorId=${doctorId}&date=${date}`);
}

const saveScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedules-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctort = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctor = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
}



export {
    handleLoginAPI, getAllUsers, createNewUserService,
    deleteUserService, editUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctors, saveInforDoctor,
    getInforDoctor, getScheduleByDorId_Date, saveScheduleDoctor,
    getScheduleByDate, getExtraInforDoctort, getProfileDoctor,
    postBookAppointment, postVerifyBookAppointment, getAllPatientForDoctor,
    postSendRemedy, createNewSpecialty, getAllSpecialty,
}