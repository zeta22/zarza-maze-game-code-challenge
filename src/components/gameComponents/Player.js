import React from 'react';
import logo from '../../logo.svg';

const Player = ({characterPosition, cellSize}) => {
    return (
        <img
            data-testid="player"
            src={logo}
            width={cellSize}
            height={cellSize}
            className="App-logo"
            alt="logo"
            style={{
                position: 'absolute',
                top: characterPosition.y * cellSize,
                left: characterPosition.x * cellSize
            }}/>
    );
};

export default Player;
