import { Brand } from "./brand.model";
import { State } from "./state.model";


export class ResponseGetList {
    listBrands: Brand[];
    listStates: State[];


    constructor(data: ResponseGetList) {
        this.listBrands = data.listBrands;
        this.listStates = data.listStates;
    }
}