
class Ride {
    startAddress;
    destinationAddress;
    price;
    driverUsername;
    clientUsername;
    status;
    dateAndTime;

    constructor(startAddress, destinationAddress, price, driverUsername, clientUsername, status, dateAndTime) {
        this.startAddress = startAddress;
        this.destinationAddress = destinationAddress;
        this.price = price;
        this.driverUsername = driverUsername;
        this.clientUsername = clientUsername;
        this.status = status;
        this.dateAndTime = dateAndTime;
    }
}