import React from 'react';

import Map from './gameComponents/Map'
import Player from './gameComponents/Player';
import Goal from './gameComponents/Goal';
import LostMenu from './popUps/LostMenu';
import WinMenu from './popUps/WinMenu';

import usePlayLevelHook from '../hooks/usePlayLevelHook';

import {gameStates} from '../constants/constants';

const GameLevel = ({skin, newCurrentLevel, initialLevelStatus, onLevelFinished, onExitGame}) => {

    const {
        game,
        currentLevel,
        tilesMaze,
        characterPosition,
        restartLevel
    } = usePlayLevelHook(newCurrentLevel, initialLevelStatus);

    if (!game) {
        return <div>Loading</div>
    }

    return (
        <div>
            <div className="level-container">LEVEL {currentLevel + 1}</div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{position: 'relative'}}>
                    {tilesMaze && <Map maze={tilesMaze} cellSize={game.cellSize} skin={skin}/>}
                    <Player characterPosition={characterPosition} cellSize={game.cellSize} skin={skin}/>
                    <Goal goalPosition={game.goalPosition} cellSize={game.cellSize}/>
                    {game.finished &&
                    <div>
                        {game.status === gameStates.WON
                            ? <WinMenu
                                isLastLevel={game.isLastLevel}
                                goToNextLevel={onLevelFinished}
                                exitGame={onExitGame}
                            />
                            : <LostMenu
                                restartLevel={restartLevel}
                                exitGame={onExitGame}
                            />
                        }
                    </div>
                    }
                    <button onClick={restartLevel} className="game-button">Restart</button>
                    <button onClick={onExitGame} className="game-button">Give up</button>
                    <div className="movements-left">
                        {game.movementsLeft}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameLevel;
