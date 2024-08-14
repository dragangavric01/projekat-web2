import axios from 'axios';
import { useContext } from 'react';
import { convertRoleToText, useRole, UserContext, getToken } from './globalStateService';


const axNoToken = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, 
    headers: {
      'Content-Type': 'application/json'
    }
});


function getAxios() {
    const token = getToken();

    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL, 
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer ${token}"
        }
    })
}

export const logIn = async (logInData) => {
    try {
        const response = await axNoToken.post('/current-user/log-in', logInData);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};

export const register = async (user) => {
    try {
        const response = await axNoToken.post('/current-user/register', user);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};

export const getDrivers = async () => {
    try {
        const response = await getAxios().get('/users/get-drivers', {headers: {"Content-Type": 'application/json'}});
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};

export const getRides = async () => {
    try {
        const response = await getAxios().get('/rides/get-rides', {headers: {Authorization: "Bearer ${token}", "Content-Type": 'application/json'}});
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};
