
class DriverData {
    driverUsername;
    registrationRequestStatus;
    isBlocked;
    averageRating;

    constructor(driverUsername, registrationRequestStatus, isBlocked, averageRating) {
        this.driverUsername = driverUsername;
        this.registrationRequestStatus = registrationRequestStatus;
        this.isBlocked = isBlocked;
        this.averageRating = averageRating;
    }
}