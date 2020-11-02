import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import MainMenu from '../components/MainMenu';

afterEach(cleanup);

describe('Main Menu clickEvents | Menu changes', () => {
    it('Should | Display Footer', () => {
        const {getByText} = render(
            <MainMenu/>,
        );

        const element = getByText('By Gonzalo "Zeta" Zarza');

        expect(element).toBeInTheDocument();
    });

    it("Should | change menu | When | New Game is clicked", () => {
        const {getByText} = render(<MainMenu/>);

        const newGameButton = getByText('NEW GAME');
        expect(newGameButton).toBeInTheDocument();

        fireEvent.click(newGameButton);

        let chooseGameTitle = getByText('CHOOSE GAME TYPE');

        expect(chooseGameTitle).toBeInTheDocument();
    });

    it("Should | show complete menu | When | New Game is clicked", () => {
        const {getByText, getByTestId} = render(<MainMenu/>);

        const newGameButton = getByText('NEW GAME');
        expect(newGameButton).toBeInTheDocument();

        fireEvent.click(newGameButton);

        const container = getByTestId('main-menu-container');

        expect(container).toBeInTheDocument();
        expect(container.children.length).toBe(11);
    });
});
