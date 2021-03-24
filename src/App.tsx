import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Screen } from "./screen";
import Menu from './menu/Menu';
import Game from './game/Game';

function App() {
  const [screen, setScreen] = useState<Screen>("menu");
  return (
    <div className="App">
      {screen === "menu" && <Menu onScreenChange={(newScreen: Screen) => setScreen(newScreen)}/>}
      {screen === "game" && <Game/>}
    </div>
  );
}

export default App;
