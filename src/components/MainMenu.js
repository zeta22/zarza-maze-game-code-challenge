import React, {useState} from 'react';
import Game from "./Game";

import {gameTypes} from '../constants/constants';

const MainMenu = () => {
    const [view, setView] = useState(null);
    const [difficulty, setDifficulty] = useState(null);

    const newGame = () => {
        setView('newGame');
    };

    const backToMain = () => {
        setView(null);
    };

    if (difficulty) {
        return (
            <Game
                gameSelected={difficulty}
                onExitGame={() => {
                    setView(null);
                    setDifficulty(null)
                }}
            />
        )
    }

    if (view === 'newGame') {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <h1>NEW GAME</h1>
                <h2>CHOOSE GAME TYPE</h2>
                <button
                    onClick={() => setDifficulty(gameTypes.PIECE_OF_CAKE)}
                    className="menu-button">
                    Piece of cake (1 level | 5x5)
                </button>
                <button
                    onClick={() => setDifficulty(gameTypes.EASY)}
                    className="menu-button">
                    Easy (2 levels | 9x9)
                </button>
                <button
                    onClick={() => setDifficulty(gameTypes.NORMAL)}
                    className="menu-button">
                    Normal (3 levels | 15x15)
                </button>
                <button
                    onClick={() => setDifficulty(gameTypes.HARD)}
                    className="menu-button">
                    Hard (4 levels | 19x19)
                </button>
                <button
                    onClick={() => setDifficulty(gameTypes.VERY_HARD)}
                    className="menu-button">
                    Very Hard (5 levels | 25x25)
                </button>
                <button
                    onClick={() => setDifficulty(gameTypes.PAIN)}
                    className="menu-button">
                    I like pain (6 levels | 39x39)
                </button>
                <button
                    onClick={backToMain}
                    className="menu-button">
                    BACK TO MAIN
                </button>
                <span>By Gonzalo "Zeta" Zarza</span>
                <span>Please enjoy and contract me :)</span>
            </div>
        )
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1>CODE-CHALLENGE MAZE</h1>
            <button onClick={newGame} className="menu-button">NEW GAME</button>
            <span>By Gonzalo "Zeta" Zarza</span>
            <span>Please enjoy and contract me :)</span>
        </div>
    )
};

export default MainMenu;
