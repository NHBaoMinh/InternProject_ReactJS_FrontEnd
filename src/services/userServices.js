import axios from "axios";

const handleLoginAPI = (email, password) => {
    console.log("called");
    return axios
        .post(process.env.REACT_APP_BACKEND_URL + "/api/login", {
            email,
            password,
        })
        .then((response) => {
            return response.data;
        });
};

const handleSignUpAPI = (
    email,
    password,
    surname,
    lastname,
    birthDate,
    confirmPass
) => {
    return axios
        .post(process.env.REACT_APP_BACKEND_URL + "/api/signup", {
            email,
            password,
            surname,
            lastname,
            birthDate,
            confirmPass,
        })
        .then((response) => {
            return response.data;
        });
};

const checkUserRoleHandler = (sessionID) => {
    return axios
        .post(process.env.REACT_APP_BACKEND_URL + "/api/auth_session", {
            sessionID,
        })
        .then((response) => {
            return response.data;
        });
};

const orderProcessHandler = (data) => {
    return axios
        .post(process.env.REACT_APP_BACKEND_URL + "/api/order_process", {
            data,
        })
        .then((response) => {
            return response.data;
        });
};

export {
    handleLoginAPI,
    handleSignUpAPI,
    checkUserRoleHandler,
    orderProcessHandler,
};
