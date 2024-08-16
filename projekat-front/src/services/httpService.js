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

export const logIn = async (logInData) => {
    try {
        const response = await axNoToken.post('/current-user/log-in', logInData);
        if (response.status == 500) {
            return 'error';
        } 

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
        if (response.status == 500) {
            return 'error';
        }

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
        if (response.status == 500) {
            return 'error';
        } else if (response.status == 401) {
            return 'token expired'
        }

        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return 'error';
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await getAxios().get('/current-user/get-profile');
        if (response.status == 500) {
            return 'error';
        } else if (response.status == 401) {
            return 'token expired'
        }

        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return 'error';
    }
};

export const getDrivers = async () => {
    try {
        const response = await getAxios().get('/users/get-drivers');
        if (response.status == 500) {
            return 'error';
        } else if (response.status == 401) {
            return 'token expired'
        }

        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return 'error';
    }
};

export const getRides = async () => {
    try {
        const response = await getAxios().get('/rides/get-rides');
        if (response.status == 500) {
            return 'error';
        } else if (response.status == 401) {
            return 'token expired'
        }

        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        return 'error';
    }
};
