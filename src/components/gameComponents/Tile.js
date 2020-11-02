import React, {useEffect, useState} from 'react';

import wallImage from '../../assets/tile_stone.png';
import pathImage from '../../assets/tile_grass.png';

const Tile = ({tile, size}) => {
    const [tileColor, setTileColor] = useState('white');
    const [isWall, setIsWall] = useState(null);

    useEffect(() => {
        switch (tile) {
            case ' ':
                //setTileColor('white');
                setIsWall(false);
                break;
            case 'x':
                setTileColor('red');
                setIsWall(true);
                break;
            case 'v':
                setTileColor('white');
                setIsWall(false);
                break;
            case 'h':
                setTileColor('white');
                setIsWall(false);
                break;
            default:
                throw Error('Detected a problem generating the tile map!');
        }
    }, [tile]);

    return (
        <div
            className=""
            style={{
                display: 'inline-block',
                width: size - 2,
                height: size - 2,
                border: '1px solid black',
            }}>
            {isWall
                ? <img src={wallImage} width={size} height={size} alt="wall"/>
                : <img src={pathImage} width={size} height={size} alt="path"/>
            }
        </div>
    );

    return (
        <div
            className="tile" style={{
            display: 'inline-block',
            width: size - 2,
            height: size - 2,
            border: '1px solid black',
            backgroundColor: tileColor || null
        }}/>
    )
};

export default Tile;
