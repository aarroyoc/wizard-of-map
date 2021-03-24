import { CityId } from "./City";
import { Index } from "./Index";

export class Round {
    constructor(public win: CityId, public others: CityId[]){

    }

    private static random(n: number): number {
        return Math.floor(Math.random() * n);
    }

    static randomRoundFromCityIds(set: Set<CityId>): Round {
        const ids = Array.from(set);
        const winIndex = this.random(ids.length);
        const win = ids[winIndex];
        ids.splice(winIndex, 1);
        const others = [];
        for(let i=0;i<3;i++){
            const otherIndex = this.random(ids.length);
            const other = ids[otherIndex];
            ids.splice(otherIndex, 1);
            others.push(other);
        }
        return new Round(win, others);

    }
}