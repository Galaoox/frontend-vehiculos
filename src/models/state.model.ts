export class State {
    id: number;
    name: string;
    

    constructor(data: State) {
        this.id = data.id;
        this.name = data.name;
    }
}