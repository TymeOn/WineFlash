export class User {
    
    constructor(_username, _password, _isAdmin) {
        this.username = _username;
        this.password = _password;
    }

    // getters
    getUsername() { return this.username; }
    getPassword() { return this.password; }

    // setters
    setUsername(_username) { this.username = _username; }
    setPassword(_password) { this.password = _password; }

}
