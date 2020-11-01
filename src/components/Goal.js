import React from 'react';
import logo from '../logo.svg';

const Goal = ({goalPosition, cellSize}) => {
    return (
        <img
            src={logo}
            width={cellSize}
            height={cellSize}
            className="App-logo"
            alt="logo"
            style={{
                position: 'absolute',
                top: goalPosition.y * cellSize,
                left: goalPosition.x * cellSize
            }}/>
    );
};

export default Goal;
