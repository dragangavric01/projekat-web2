
class DriverData {
    driverUsername;
    registrationRequestStatus;
    isBlocked;

    constructor(driverUsername, registrationRequestStatus, isBlocked) {
        this.driverUsername = driverUsername;
        this.registrationRequestStatus = registrationRequestStatus;
        this.isBlocked = isBlocked;
    }
}