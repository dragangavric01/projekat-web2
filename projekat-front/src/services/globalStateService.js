import { UserRole } from '../model/User';
import { jwtDecode } from 'jwt-decode';


export function setToken(token) {
    localStorage.setItem('token', token);
}

export function setRole(role) {
    localStorage.setItem('role', role);
}

export function setIsRideActive(isRideAcive) {
    localStorage.setItem('isRideAcive', isRideAcive);
}

export function getToken() {
    return localStorage.getItem('token');
}

export function getRole() {
    var role = parseInt(localStorage.getItem('role'));
    if (isNaN(role)) {
        return null
    }

    return role;
}

export function getIsRideActive() {
    const isRideAcive = localStorage.getItem('isRideAcive');
    if (isRideAcive == null) {
        return false;
    }

    return isRideAcive;
}

export function clearGlobalState() {
    localStorage.clear();
}


export function getRoleFromToken(token) {
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

