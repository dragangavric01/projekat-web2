
export const RegistrationRequestStatus = {
    PENDING: 0,
    ACCEPTED: 1,
    DENIED: 2
};


class DriverData {
    username;
    registrationRequestStatus;
    blocked;

    constructor(username, registrationRequestStatus, blocked) {
        this.username = username;
        this.registrationRequestStatus = registrationRequestStatus;
        this.blocked = blocked;
    }
}