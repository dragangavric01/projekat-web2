
export const UserRole = {
    CLIENT: 0,
    DRIVER: 1,
    ADMIN: 2
};

class User {
    username;
    email;
    password;
    firstName;
    lastName;
    dateofBirth;
    address;
    role;
    picture;

    constructor(username, email, password, firstName, lastName, dateofBirth, address, role, picture) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateofBirth = dateofBirth;
        this.address = address;
        this.role = role;
        this.picture = picture;
    }
}