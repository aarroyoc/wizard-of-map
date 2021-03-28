import { useEffect, useState } from "react";
import { CityId } from "../models/City";
import { Index } from "../models/Index";
import { Round } from "../models/Round";
import { DataService } from "../services/DataService";
import "./Game.css";

type GameStage = "sat" | "map" | "end";

function Game(){
    const waitMs = 2000;
    const dataService = new DataService();
    const [points, setPoints] = useState(0);
    const [timerEnabled, setTimerEnabled] = useState(false);
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
        if(answer === round?.win){
            setPoints(points + 1);
            setRound(null);
            setStage("sat");
        } else {
            setStage("end");
        }
    }

    const startTimer = () => {
        setTimeout(() => {
            setStage("map");
            setTimerEnabled(false);
        }, waitMs);
        setTimerEnabled(true);
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
        const round = Round.randomRoundFromCityIds(cityIds)
        setAnswers(shuffleArray(round.others.concat([round.win])));
        setRound(round);
    }

    return (<div className="Game">
        {round && stage === "sat" && (<>
            <h2>Score: {points}</h2>
            <div className={timerEnabled ? "timeBar" : ""}></div>
            <img onLoad={() => startTimer()} src={`/data/${round.win}.jpg`}/>
        </>)}
        {round && stage === "map" && (<>
            <p>Choose the correct map</p>
            <div className="GameGrid">
                {answers.map((answer)=>{
                    return <img onClick={() => submitAnswer(answer)} src={`/data/${answer}.png`}/>;
                })}
            </div>
        </>)}
        {stage === "end" && (<>
            <h1>Game ended!</h1>
            <h2>Score: {points}</h2>
        </>)}
    </div>);
}
export default Game;