import { Screen } from "../screen";

type Props = {
    onScreenChange: (newScreen: Screen) => void;
}

function Menu({onScreenChange}: Props){

    const startGame = () => {
        onScreenChange("game");
    };

    return (<>
        <div className="top">
            <h1>The Wizard of Map</h1>
        </div>
        <div className="middle">
            <a onClick={() => startGame()}>Start Game</a>
        </div>
        <div className="bottom">
            <small><a href="https://adrianistan.eu">&copy; Adrián Arroyo Calle 2021</a></small>
        </div>
    </>);
}

export default Menu;