import React, {useState, useEffect} from 'react';

import {skins} from "../../constants/constants";

import ashImage from '../../assets/player_ash.png';
import linkImage from '../../assets/player_link.png';
import marioImage from '../../assets/player_mario.png';

const Player = ({characterPosition, cellSize, skin}) => {
    const [playerImage, setPlayerImage] = useState(null);

    useEffect(() => {
        switch (skin) {
            case skins.ZELDA:
                setPlayerImage(linkImage);
                break;
            case skins.POKEMON:
                setPlayerImage(ashImage);
                break;
            case skins.MARIO:
                setPlayerImage(marioImage);
                break;
            default:
                return;
        }
    }, [skin]);

    return (
        <img
            data-testid="player"
            src={playerImage}
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
