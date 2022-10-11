export class User {
    
    constructor(_id, _username, _password) {
        this.id = _id;
        this.username = _username;
        this.password = _password;
    }

    // getters
    getId() { return this.id; }
    getUsername() { return this.username; }
    getPassword() { return this.password; }

    // setters
    setId(_id) { this.id = _id; }
    setUsername(_username) { this.username = _username; }
    setPassword(_password) { this.password = _password; }

}
