import React, {useState} from 'react';
import Game from "./Game";

import {gameTypes, skins} from '../constants/constants';

import ashImage from '../assets/player_ash.png';
import linkImage from '../assets/player_link.png';
import marioImage from '../assets/player_mario.png';

const MainMenu = () => {
    const [view, setView] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [skin, setSkin] = useState(null);

    const newGame = () => {
        setView('newGame');
    };

    const backToMain = () => {
        setView(null);
        setDifficulty(null);
        setSkin(null);
    };

    const renderFooter = () => {
        return (
            <>
                <span>By Gonzalo "Zeta" Zarza</span>
                <span>Please enjoy ... and hire me :)</span>
            </>
        )
    };

    if (difficulty && skin) {
        return (
            <Game
                data-testid="game"
                gameSelected={difficulty}
                skin={skin}
                onExitGame={() => {
                    setView(null);
                    setDifficulty(null);
                    setSkin(null);
                }}
            />
        )
    }

    if (difficulty) {
        return (
            <div className="main-menu-container" data-testid="main-menu-container">
                <h1>NEW GAME</h1>
                <h2>CHOOSE YOUR CHARACTER</h2>
                <div className="characters-container">
                    <div
                        onClick={() => setSkin(skins.POKEMON)}
                        className="character-container"
                    >
                        <img
                            src={ashImage}
                            width={50}
                            height={50}
                            alt="character"
                        />
                    </div>
                    <div
                        onClick={() => setSkin(skins.ZELDA)}
                        className="character-container"
                    >
                        <img
                            src={linkImage}
                            width={50}
                            height={50}
                            alt="character"
                        />
                    </div>
                    <div
                        onClick={() => setSkin(skins.MARIO)}
                        className="character-container"
                    >
                        <img
                            onClick={() => setSkin(skins.MARIO)}
                            src={marioImage}
                            width={50}
                            height={50}
                            alt="character"
                        />
                    </div>
                </div>
                <button
                    onClick={backToMain}
                    className="menu-button">
                    BACK TO MAIN
                </button>
            </div>
        );
    }

    if (view === 'newGame') {
        return (
            <div className="main-menu-container" data-testid="main-menu-container">
                <h1>NEW GAME</h1>
                <h2>CHOOSE GAME TYPE</h2>
                <button
                    onClick={() => setDifficulty(gameTypes.PIECE_OF_CAKE)}
                    className="menu-button"
                    data-testid="piece-of-cake-difficulty"
                >
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
                {renderFooter()}
            </div>
        )
    }

    return (
        <div className="main-menu-container">
            <h1>CODE-CHALLENGE MAZE</h1>
            <button onClick={newGame} className="menu-button">NEW GAME</button>
            {renderFooter()}
        </div>
    )
};

export default MainMenu;
