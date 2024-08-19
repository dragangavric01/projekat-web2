
export const RideStatus = {
    REQUESTED: 0,
    INPROGRESS: 1,
    FINISHED: 2
};

class Ride {
    startAddress;
    destinationAddress;
    price;
    driverUsername;
    clientUsername;
    status;
    driverRating;
    creationDateAndTime;

    constructor(startAddress, destinationAddress, price, driverUsername, clientUsername, status, driverRating, creationDateAndTime) {
        this.startAddress = startAddress;
        this.destinationAddress = destinationAddress;
        this.price = price;
        this.driverUsername = driverUsername;
        this.clientUsername = clientUsername;
        this.status = status;
        this.driverRating = driverRating;
        this.creationDateAndTime = creationDateAndTime;
    }
}