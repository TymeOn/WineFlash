export class User {
    
    constructor(_id, _username, _password, _admin) {
        this.id = _id;
        this.username = _username;
        this.password = _password;
        this.admin = _admin;
    }

    // getters
    getId() { return this.id; }
    getUsername() { return this.username; }
    getPassword() { return this.password; }
    isAdmin() { return this.admin; }

    // setters
    setId(_id) { this.id = _id; }
    setUsername(_username) { this.username = _username; }
    setPassword(_password) { this.password = _password; }
    setAdmin(_admin) { this.admin = _admin; }

}
