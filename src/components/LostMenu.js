import React from 'react';
import TransparentOverlay from './TransparentOverlay';

const LostMenu = ({restartLevel, exitGame}) => (
    <>
        <TransparentOverlay/>
        <div className="game-finish-pop-up-menu">
            <span className="lost-no-moves-text">No more moves!</span>
            <span className="lost-level-failed-text">Level Failed!</span>
            <div className="row">
                <button onClick={restartLevel} className="game-button">Try Again</button>
                <button onClick={exitGame} className="game-button">Give up</button>
            </div>
        </div>
    </>
);

export default LostMenu;
