import { API } from "@config/env";
import { Car } from "@models/car.model";
import { Line } from "@models/line.model";
import { ResponseGetList } from "@models/response-getlist.model";
import { ResponseSearch } from "@models/response-search.model";
import { loadAbort } from "@utilities/axios.utility";
import axios from "axios";


export function Search(data:any){
    const controller = loadAbort();

    return {
        call: axios.post<ResponseSearch>(`${API}/cars/search`,data, {
            signal: controller.signal
        }),
        controller
    }
}


export function getLists(){
    const controller = loadAbort();
    return {
        call: axios.get<ResponseGetList>(`${API}/cars/getLists`, {
            signal: controller.signal
        }),
        controller
    }
}

export function getLinesByBrand(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<Line[]>(`${API}/cars/getLinesByBrand/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function createCar(data: Partial<Car>){
    const controller = loadAbort();
    return {
        call: axios.post<Car>(`${API}/cars`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function uploadImageCar(id: number, data: any){
    const controller = loadAbort();
    return {
        call: axios.post<any>(`${API}/cars/upload/${id}`,data,{
            signal: controller.signal,
        }),
        controller
    }
}