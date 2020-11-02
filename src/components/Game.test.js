import React from 'react';
import {cleanup, render} from '@testing-library/react';
import Game from '../components/Game';
import {gameTypes} from '../constants/constants';

afterEach(cleanup);

describe('Main Menu clickEvents | Menu changes', () => {
    it("Should | start game | When | loaded", () => {
        const gameSelected = gameTypes.PIECE_OF_CAKE;
        const onExitGame = jest.fn();

        const {getByText} = render(
            <Game
                gameSelected={gameSelected}
                onExitGame={onExitGame}
            />,
        );

        const levelLabel = getByText('LEVEL 1');

        expect(levelLabel).toBeInTheDocument();
    });

    it("Should | load the game components | When | Game Starts", () => {
        const gameSelected = gameTypes.PIECE_OF_CAKE;
        const onExitGame = jest.fn();

        const {getByTestId} = render(
            <Game
                gameSelected={gameSelected}
                onExitGame={onExitGame}
            />,
        );

        const goal = getByTestId('goal');
        const map = getByTestId('map');
        const player = getByTestId('player');

        expect(goal).toBeInTheDocument();
        expect(map).toBeInTheDocument();
        expect(player).toBeInTheDocument();
    });
});
