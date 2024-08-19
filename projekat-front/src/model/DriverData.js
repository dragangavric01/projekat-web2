
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