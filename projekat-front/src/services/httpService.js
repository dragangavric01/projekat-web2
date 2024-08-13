import axios from 'axios';
import { useContext } from 'react';
import { convertRoleToText, useRole, UserContext, getToken } from './stateService';


const ax = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, 
    headers: {
      'Content-Type': 'application/json',
    },
});

export const logIn = async (logInData) => {
    try {
        const response = await ax.post('/current-user/log-in', logInData);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};

export const register = async (user) => {
    try {
        const response = await ax.post('/current-user/register', user);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};

export const getDrivers = async () => {
    const token = getToken();

    try {
        const response = await ax.get('/users/get-drivers', {headers: {Authorization: "Bearer ${token}"}});
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};
