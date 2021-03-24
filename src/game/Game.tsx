import { useEffect, useState } from "react";
import { CityId } from "../models/City";
import { Index } from "../models/Index";
import { Round } from "../models/Round";
import { DataService } from "../services/DataService";

type GameStage = "sat" | "map";

function Game(){
    const dataService = new DataService();
    const [cityIds, setCityIds] = useState<Set<CityId>>(new Set());
    const [index, setIndex] = useState<Index | null>(null);
    const [round, setRound] = useState<Round | null>(null);
    const [stage, setStage] = useState<GameStage>("sat");
    const [answers, setAnswers] = useState<CityId[]>([]);

    const shuffleArray = (originArray: any[]) => {
        const array = originArray.slice();
        const shuffled = new Array;
        while(array.length > 0){
            const n = Math.floor(Math.random() * array.length);
            shuffled.push(array.splice(n, 1)[0]);
        }
        return shuffled;
    };

    const submitAnswer = (answer: CityId) => {
        console.log(answer);
        console.log(round?.win);
        if(answer === round?.win){
            alert("VICTORY!");
        } else {
            alert("FAIL!");
        }
    }

    useEffect(()=>{
        dataService.getIndex()
        .then((index)=>{
            const newCityIds = new Set(index.cities.map((city) => city.id));
            setCityIds(newCityIds);
            setIndex(index);
        });
    }, []);

    if(round === null && index !== null && cityIds.size > 0){
        setRound(Round.randomRoundFromCityIds(cityIds));
        setTimeout(() => {
            setStage("map");
        }, 2000);
    }

    if(round !== null && answers.length === 0){
        setAnswers(shuffleArray(round.others.concat([round.win])));
    }

    return (<div>
        {round && stage === "sat" &&
            <img src={`/data/${round.win}.jpg`}/>
        }
        {round && stage === "map" && (
            <div>
                {answers.map((answer)=>{
                    return <img onClick={() => submitAnswer(answer)} src={`/data/${answer}.png`}/>;
                })}
            </div>
        )}
    </div>);
}
export default Game;