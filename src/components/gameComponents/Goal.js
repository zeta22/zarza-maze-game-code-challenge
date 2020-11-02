import React from 'react';

import goalImage from '../../assets/goal_flag.png';

const Goal = ({goalPosition, cellSize}) => {
    return (
        <img
            data-testid="goal"
            src={goalImage}
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
