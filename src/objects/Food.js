export default class Food {
    id;
    name;
    date;
    image;

    constructor(name, date) {
        this.id = Date.now()
        this.name = name
        this.date = date
        this.image = null
    }
}