import React, {useEffect, useState} from 'react';

import {skins} from '../../constants/constants';

import pokemonWallImage from '../../assets/tile_poke_wall.png';
import pokemonPathImage from '../../assets/tile_poke_floor.png';

import zeldaWallImage from '../../assets/tile_stone.png';
import zeldaPathImage from '../../assets/tile_grass.png';

import marioWallImage from '../../assets/tile_gray_wall.png';
import marioPathImage from '../../assets/tile_gray_floor.png';

const Tile = ({tile, size, skin}) => {
    const [isWall, setIsWall] = useState(null);
    const [wallImage, setWallImage] = useState(null);
    const [pathImage, setPathImage] = useState(null);

    useEffect(() => {
        switch (tile) {
            case ' ':
            case 'h':
            case 'v':
                setIsWall(false);
                break;
            case 'x':
                setIsWall(true);
                break;
            default:
                throw Error('Detected a problem generating the tile map!');
        }
    }, [tile]);

    useEffect(() => {
        switch (skin) {
            case skins.ZELDA:
                setWallImage(zeldaWallImage);
                setPathImage(zeldaPathImage);
                break;
            case skins.POKEMON:
                setWallImage(pokemonWallImage);
                setPathImage(pokemonPathImage);
                break;
            case skins.MARIO:
                setWallImage(marioWallImage);
                setPathImage(marioPathImage);
                break;
            default:
                throw Error('Detected a problem generating the tile map!');
        }
    }, [skin]);

    return (
        <div
            className="tile"
            style={{
                width: size - 2,
                height: size - 2
            }}>
            {isWall
                ? <img src={wallImage} width={size} height={size} alt="wall"/>
                : <img src={pathImage} width={size} height={size} alt="path"/>
            }
        </div>
    );
};

export default Tile;
