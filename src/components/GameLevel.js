import React, {useEffect, useState} from 'react';

import Map from './Map'
import Player from './Player';
import Goal from './Goal';
import LostMenu from './LostMenu';
import WinMenu from './WinMenu';

import {keyCodes, gameStates, tileCodes} from '../constants/constants';

import {generateMaze} from '../helpers/MazeGeneratorHelper';

const GameLevel = ({newCurrentLevel, initialLevelStatus, onLevelFinished, onExitGame}) => {
    const initialPlayerPosition = {x: 1, y: 1};

    const [tilesMaze, setTilesMaze] = useState(null);
    const [characterPosition, setCharacterPosition] = useState(initialPlayerPosition);
    const [game, setGame] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(null);
    const [keyPressed, setKeyPressed] = useState(null);

    useEffect(() => {
        document.body.addEventListener('keydown', handleKeyDown);
        return (() => {
            document.body.removeEventListener('keydown', handleKeyDown);
        })
    }, []);

    useEffect(() => {
        if (currentLevel !== newCurrentLevel) {
            document.body.addEventListener('keydown', handleKeyDown);

            const newGame = {...initialLevelStatus};
            setGame(newGame);

            setCurrentLevel(newCurrentLevel);
            const newMaze = generateMaze(newGame.mazeSize, newGame.mazeSize);

            setTilesMaze(newMaze);
            restartLevel();
        }
    }, [newCurrentLevel, initialLevelStatus, currentLevel]);


    const levelFinished = (finishStatus) => {
        game.status = finishStatus;
        game.finished = true;
        setGame(game);
    };

    useEffect(() => {
        if (keyPressed !== null) {
            if (game && game.finished) {
                return;
            }

            let targetTileCoords;
            switch (keyPressed.key) {
                case keyCodes.ARROW_LEFT:
                    targetTileCoords = {...characterPosition, x: characterPosition.x - 1};
                    break;
                case keyCodes.ARROW_RIGHT:
                    targetTileCoords = {...characterPosition, x: characterPosition.x + 1};
                    break;
                case keyCodes.ARROW_UP:
                    targetTileCoords = {...characterPosition, y: characterPosition.y - 1};
                    break;
                case keyCodes.ARROW_DOWN:
                    targetTileCoords = {...characterPosition, y: characterPosition.y + 1};
                    break;
                default:
                    return;
            }

            if (targetTileCoords) {
                const targetTileType = tilesMaze[targetTileCoords.y][targetTileCoords.x];
                const isMovementValid = targetTileType !== tileCodes.WALL;

                if (isMovementValid) {
                    game.movementsLeft--;
                    setGame(game);
                    const newPosition = targetTileCoords;
                    setCharacterPosition(newPosition);

                    const playerWon = newPosition.x === game.goalPosition.x && newPosition.y === game.goalPosition.y;

                    if (playerWon) {
                        levelFinished(gameStates.WON);
                    } else {
                        if (!game.movementsLeft) {
                            levelFinished(gameStates.LOST);
                        }
                    }
                }
            }
        }
    }, [keyPressed]);

    const restartLevel = () => {
        const newGame = {...initialLevelStatus};
        setCharacterPosition(initialPlayerPosition);
        setGame(newGame);
    };

    const exitGame = () => {
        onExitGame()
    };

    const goToNextLevel = () => {
        onLevelFinished();
    };

    const handleKeyDown = e => {
        if (!e || !e.key) {
            return;
        }
        e.preventDefault();
        setKeyPressed(e);
    };

    if (!game) {
        return <div>Loading</div>
    }

    return (
        <div>
            <div className="level-container">LEVEL {currentLevel + 1}</div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{position: 'relative'}}>
                    {tilesMaze && <Map maze={tilesMaze} cellSize={game.cellSize}/>}
                    <Player characterPosition={characterPosition} cellSize={game.cellSize}/>
                    <Goal goalPosition={game.goalPosition} cellSize={game.cellSize}/>
                    {game.finished &&
                    <div>
                        {game.status === 'won'
                            ? <WinMenu
                                isLastLevel={game.isLastLevel}
                                goToNextLevel={goToNextLevel}
                                exitGame={exitGame}
                            />
                            : <LostMenu
                                restartLevel={restartLevel}
                                exitGame={exitGame}
                            />
                        }
                    </div>
                    }
                    <button onClick={restartLevel} className="game-button">Restart</button>
                    <button onClick={exitGame} className="game-button">Give up</button>
                    <div className="movements-left">
                        {game.movementsLeft}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameLevel;
