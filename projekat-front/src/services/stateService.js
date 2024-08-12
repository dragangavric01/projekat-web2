import { UserRole } from '../model/User';
import { jwtDecode } from 'jwt-decode';


export function setToken(token) {
    localStorage.setItem('token', token);
}

export function setRole(role) {
    localStorage.setItem('role', role);
}

export function getToken() {
    return localStorage.getItem('token');
}

export function getRole() {
    localStorage.getItem('role');
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

