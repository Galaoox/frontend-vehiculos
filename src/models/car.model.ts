import { Brand } from "./brand.model";
import { Line } from "./line.model";
import { State } from "./state.model";

export class Car {
    id: number;
    state: State;
    brand: Brand;
    line: Line;
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