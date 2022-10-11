export class Wine {

    constructor(
        _id,
        _barcode,
        _name,
        _description,
        _color,
        _year,
        _estate,
        _variety,
        _appellation,
        _winemaker,
        _price,
        _capacity,
        _bio
    ) {
        this.id = _id;
        this.barcode = _barcode;
        this.name = _name;
        this.description = _description;
        this.color = _color;
        this.year = _year;
        this.estate = _estate;
        this.variety = _variety;
        this.appellation = _appellation;
        this.winemaker = _winemaker;
        this.price = _price;
        this.capacity = _capacity;
        this.bio = _bio;
    }

    // getters
    getId() { return this.id; }
    getBarcode() { return this.barcode; }
    getName() { return this.name; }
    getDescription() { return this.description; }
    getColor() { return this.color; }
    getYear() { return this.year; }
    getEstate() { return this.estate; }
    getVariety() { return this.variety; }
    getAppellation() { return this.appellation; }
    getWinemaker() { return this.winemaker; }
    getPrice() { return this.price; }
    getCapacity() { return this.capacity; }
    isBio() { return this.bio; }

    // setters
    setId(_id) { this.id = _id; }
    setBarcode(_barcode) { this.barcode = _barcode; }
    setName(_name) { this.name = _name; }
    setDescription(_description) { this.description = _description; }
    setColor(_color) { this.color = _color; }
    setYear(_year) { this.year = _year; }
    setEstate(_estate) { this.estate = _estate; }
    setVariety(_variety) { this.variety = _variety; }
    setAppellation(_appellation) { this.appellation = _appellation; }
    setWinemaker(_winemaker) { this.winemaker = _winemaker; }
    setPrice(_price) { this.price = _price; }
    setCapacity(_capacity) { this.capacity = _capacity; }
    setBio(_bio) { this.bio = _bio; }

}
