import React, {useEffect, useState} from 'react';

import Map from './Map'
import Player from './Player';
import Goal from './Goal';

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
                case 'ArrowLeft':
                    targetTileCoords = {...characterPosition, x: characterPosition.x - 1};
                    break;
                case 'ArrowRight':
                    targetTileCoords = {...characterPosition, x: characterPosition.x + 1};
                    break;
                case 'ArrowUp':
                    targetTileCoords = {...characterPosition, y: characterPosition.y - 1};
                    break;
                case 'ArrowDown':
                    targetTileCoords = {...characterPosition, y: characterPosition.y + 1};
                    break;
                default:
                    return;
            }

            if (targetTileCoords) {
                const targetTileType = tilesMaze[targetTileCoords.y][targetTileCoords.x];
                const isMovementValid = targetTileType !== 'x';

                if (isMovementValid) {
                    game.movementsLeft--;
                    setGame(game);
                    const newPosition = targetTileCoords;
                    setCharacterPosition(newPosition);

                    const playerWon = newPosition.x === game.goalPosition.x && newPosition.y === game.goalPosition.y;

                    if (playerWon) {
                        levelFinished('won');
                    } else {
                        if (!game.movementsLeft) {
                            levelFinished('lost');
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

    const nextLevel = () => {
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

    const renderLostMenu = () => {
        return (
            <>
                <div style={{
                    backgroundColor: 'black',
                    opacity: '0.5',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0
                }}/>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    top: 0
                }}>
                    <span style={{color: '#ff0220', fontSize: 20}}>No more moves!</span>
                    <span style={{color: '#ff3448', fontSize: 42, fontWeight: 'bold'}}>Level Failed!</span>
                    <div style={{flexDirection: 'row'}}>
                        <button onClick={restartLevel} className="game-button">Try Again</button>
                        <button onClick={exitGame} className="game-button">Give up</button>
                    </div>
                </div>
            </>
        );
    };

    const renderWonMenu = () => {

        return (
            <>
                <div style={{
                    backgroundColor: 'black',
                    opacity: '0.5',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0
                }}/>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    top: 0
                }}>
                    {game.isLastLevel
                        ? <span style={{color: '#08b90f', fontSize: 42, fontWeight: 'bold'}}>Game Cleared!</span>
                        : <span style={{color: '#08b90f', fontSize: 42, fontWeight: 'bold'}}>Level Cleared!</span>
                    }
                    <div style={{flexDirection: 'row'}}>
                        <button onClick={exitGame} className="game-button">Exit Game</button>
                        {!game.isLastLevel && <button onClick={nextLevel} className="game-button">Next Level</button>}
                    </div>
                </div>
            </>
        );
    };

    return (
        <div>
            <div className="level-container">LEVEL: 1</div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{position: 'relative'}}>
                    {tilesMaze && <Map maze={tilesMaze} cellSize={game.cellSize}/>}
                    <Player characterPosition={characterPosition} cellSize={game.cellSize}/>
                    <Goal goalPosition={game.goalPosition} cellSize={game.cellSize}/>
                    {game.finished &&
                    <div>
                        {game.status === 'won'
                            ? renderWonMenu()
                            : renderLostMenu()
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
