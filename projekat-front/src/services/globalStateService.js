import { UserRole } from '../model/User';
import { jwtDecode } from 'jwt-decode';


export function setToken(token) {
    localStorage.setItem('token', token);
}

export function setIsRideActive(isRideActive) {
    localStorage.setItem('isRideActive', convertBooltoString(isRideActive));
}

export function getToken() {
    return localStorage.getItem('token');
}

export function getIsRideActive() {
    const isRideActive = localStorage.getItem('isRideActive');
    if (isRideActive == null) {
        return false;
    }

    return convertStringToBool(isRideActive);
}

export function clearGlobalState() {
    localStorage.clear();
}


export function getRoleFromToken(token) {
    if (token == null) {
        return null;
    }

    const decodedToken = jwtDecode(token);
    const role = decodedToken.role || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return convertRoleToInt(role);
}

export function convertRoleToText(role) {
    if (role == UserRole.CLIENT) {
        return "Client";
    } else if (UserRole.DRIVER) {
        return "Driver";
    } else {
        return "Admin";
    }
}

export function convertRoleToInt(role) {
    if (role == "Client") {
        return UserRole.CLIENT;
    } else if (role == "Driver") {
        return UserRole.DRIVER;
    } else {
        return UserRole.ADMIN;
    }
}

function convertBooltoString(bool) {
    if (bool) {
        return "true";
    } else {
        return "false";
    }
}

function convertStringToBool(boolString) {
    return (boolString == "true");
}

