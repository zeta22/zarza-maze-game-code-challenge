import React from 'react';
import TransparentOverlay from './TransparentOverlay';

const LostMenu = ({isLastLevel, goToNextLevel, exitGame}) => (
    <>
        <TransparentOverlay/>
        <div className="game-finish-pop-up-menu">
            {isLastLevel
                ? <span className="win-level-text">Game Cleared!</span>
                : <span className="win-level-text">Level Cleared!</span>
            }
            <div className="row">
                <button onClick={exitGame} className="game-button">Exit Game</button>
                {!isLastLevel && <button onClick={goToNextLevel} className="game-button">Next Level</button>}
            </div>
        </div>
    </>
);

export default LostMenu;
