export class Comment {
    
    constructor(_id, _text, _rating, _author, _wine) {
        this.id = _id;
        this.text = _text;
        this.rating = _rating;
        this.author = _author;
        this.wine = _wine;
    }

    // getters
    getId() { return this.id; }
    getText() { return this.text; }
    getRating() { return this.rating; }
    getAuthor() { return this.author; }
    getWine() { return this.wine; }

    // setters
    setId(_id) { this.id = _id; }
    setText(_text) { this.text = _text; }
    setRating(_rating) { this.rating = _rating; }
    setAuthor(_author) { this.author = _author; }
    setWine(_wine) { this.wine = _wine; }

}
