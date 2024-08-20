import axios from 'axios';
import { useContext } from 'react';
import { convertRoleToText, useRole, UserContext, getToken } from './globalStateService';


const axNoToken = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, 
    headers: {
      'Content-Type': 'application/json'
    }
});

const axNoTokenFormData = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, 
});

function getAxios() {
    const token = getToken();

    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL, 
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
    })
}

function getAxiosFormData() {
    const token = getToken();

    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL, 
        headers: {
          "Authorization": `Bearer ${token}`
        }
    })
}

function getError(error) {
    if (error == undefined) {
        return 'error';
    } else if (error.response.status == 401) {
        return 'token expired';
    } else {
        return 'error';
    }
}


export const logIn = async (logInData) => {
    try {
        const response = await axNoToken.post('/current-user/log-in', logInData);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return 'error';
    }
};

export const register = async (user) => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("dateOfBirth", user.dateOfBirth);
    formData.append("address", user.address);
    formData.append("role", user.role);
    formData.append("picture", user.picture); 
    
    try {
        const response = await axNoTokenFormData.post('/current-user/register', formData);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return 'error';
    }
};

export const updateProfile = async (profileData) => {
    const formData = new FormData();
    formData.append("username", profileData.username);
    formData.append("email", profileData.email);
    formData.append("password", profileData.password);
    formData.append("firstName", profileData.firstName);
    formData.append("lastName", profileData.lastName);
    formData.append("dateOfBirth", profileData.dateOfBirth);
    formData.append("address", profileData.address);
    formData.append("role", profileData.role);
    formData.append("picture", profileData.picture); 
    
    try {
        const response = await getAxiosFormData().post('/current-user/update', formData);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await getAxios().get('/current-user/get-profile');
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError(error);
    }
};

export const orderRide = async (addresses) => {
    try {
        const response = await getAxios().post('/current-ride/order-ride', addresses);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError();
    }
};

export const confirmRide = async () => {
    try {
        const response = await getAxios().get('/current-ride/confirm-ride');
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError();
    }
};

export const cancelRide = async () => {
    try {
        const response = await getAxios().get('/current-ride/cancel-ride');
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError();
    }
};

export const getRideStatus = async () => {
    try {
        const response = await getAxios().get('/current-ride/get-ride-status');
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError();
    }
};

export const getRequestedRides = async () => {
    try {
        const response = await getAxios().get('/rides/get-requested-rides');
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError();
    }
};

export const acceptRide = async (rideRowKey) => {
    try {
        const response = await getAxios().post('/current-ride/accept-ride', rideRowKey);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError();
    }
};

export const rateDriver = async (rating) => {
    try {
        const response = await getAxios().post('/current-ride/rate-driver', rating);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError();
    }
};

export const getUsersRides = async () => {
    try {
        const response = await getAxios().get('/rides/get-users-rides');
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError();
    }
};

export const getRides = async () => {
    try {
        const response = await getAxios().get('/rides/get-rides');
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError();
    }
};

export const getDrivers = async () => {
    try {
        const response = await getAxios().get('/users/get-drivers');
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError(error);
    }
};

export const getDriver = async (driverUsername) => {
    try {
        const response = await getAxios().post('/users/get-driver', driverUsername);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError(error);
    }
};

export const getDriversAverageRating = async (driverUsername) => {
    try {
        const response = await getAxios().post('/rides/get-drivers-average-rating', driverUsername);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return getError(error);
    }
};


