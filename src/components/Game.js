import React, {useState, useEffect} from 'react';
import GameLevel from "./GameLevel";

import {getInitialGameConfigurations} from '../helpers/GameHelper';

const Game = ({skin, gameSelected, onExitGame}) => {
    const [gameState, setGameState] = useState({});

    useEffect(() => {
        const initialState = getInitialGameConfigurations(gameSelected);
        setGameState(initialState);
    }, [gameSelected]);

    const onLevelFinished = () => {
        if (gameState.levels.length > gameState.currentLevel) {
            const newGameState = {...gameState, currentLevel: gameState.currentLevel + 1};
            setGameState(newGameState);
        }
    };

    const exitGame = () => {
        setGameState({});
        onExitGame()
    };

    if (gameState.start) {
        const level = gameState.levels[gameState.currentLevel];

        return (
            <GameLevel
                skin={skin}
                newCurrentLevel={gameState.currentLevel}
                initialLevelStatus={level}
                onLevelFinished={onLevelFinished}
                onExitGame={exitGame}
            />
        )
    }

    return (
        <div>Loading...</div>
    )
};

export default Game;
