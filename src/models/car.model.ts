export class Car {
    id: number;
    state: string;
    brand: string;
    line: string;
    year: number;
    averagePrice: number;
    

    constructor(data: Car) {
        this.id = data.id;
        this.state = data.state;
        this.brand = data.brand;
        this.line = data.line;
        this.year = data.year;
        this.averagePrice = data.averagePrice;
    }
}