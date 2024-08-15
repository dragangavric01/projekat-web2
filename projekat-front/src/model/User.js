
export const UserRole = {
    CLIENT: 0,
    DRIVER: 1,
    ADMIN: 2
};

export class User {
    username;
    email;
    password;
    firstName;
    lastName;
    dateOfBirth;
    address;
    role;
    picture;

    constructor(username, email, password, firstName, lastName, dateOfBirth, address, role, picture) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.role = role;
        this.picture = picture;
    }
}