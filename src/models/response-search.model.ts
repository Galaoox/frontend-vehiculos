import { Car } from "./car.model";

interface Info {
    total: number;
    limit: number;
    page: number;
    maxPage: number;
    next: number;
}

export class ResponseSearch {
    data: Car[];
    info: Info;

    constructor(data: ResponseSearch) {
        this.data = data.data;
        this.info = data.info;
    }
}