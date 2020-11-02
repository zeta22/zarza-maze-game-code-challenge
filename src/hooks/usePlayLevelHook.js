import {useEffect, useState} from 'react';
import {generateMaze} from '../helpers/MazeGeneratorHelper';
import {gameStates, keyCodes, tileCodes} from '../constants/constants';

export default function usePlayLevelHook(newCurrentLevel, initialLevelStatus) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyPressed]);

    const restartLevel = () => {
        const newGame = {...initialLevelStatus};
        setCharacterPosition(initialPlayerPosition);
        setGame(newGame);
    };

    const handleKeyDown = e => {
        if (!e || !e.key) {
            return;
        }
        e.preventDefault();
        setKeyPressed(e);
    };

    return {
        game,
        currentLevel,
        tilesMaze,
        characterPosition,
        restartLevel
    }
};