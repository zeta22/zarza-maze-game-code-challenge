import Tile from './Tile';
import React from 'react';

const Map = ({cellSize, maze, skin}) => {
    return (
        <div data-testid="map">
            {maze.map((tileRow, i) => {
                return (
                    <div key={i} className="tile-row" style={{height: cellSize}}>
                        {tileRow.map((tile, i) =>
                            <Tile key={i} tile={tile} size={cellSize} skin={skin}/>
                        )}
                    </div>
                )
            })}
        </div>
    );
};

export default Map;
