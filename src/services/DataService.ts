import { Index } from "../models/Index";
import { City } from "../models/City";

export class DataService {
    constructor(){

    }

    async getIndex(): Promise<Index> {
        const response = await fetch("/data/index.json");
        const json = await response.json();
        return json as Index;
    }

}