import {getInitialGameConfigurations} from './GameHelper';
import {gameTypes} from '../constants/constants';

describe('GameHelper getInitialGameConfigurations by GameType', () => {
    it("Should | return correct game configs | When | request difficulty PIECE", async () => {
        // Arrange - Params
        const type = gameTypes.PIECE_OF_CAKE;
        // Arrange - Results
        const mazeSize = 6;
        const cellSize = 50;
        const levels = 1;

        // Act
        const result = getInitialGameConfigurations(type);

        // Assert
        expect(result.levels).toHaveLength(levels);
        expect(result.levels[0].mazeSize).toEqual(mazeSize);
        expect(result.levels[0].cellSize).toEqual(cellSize);
    });

    it("Should | return correct game configs | When | request difficulty EASY", async () => {
        // Arrange - Params
        const type = gameTypes.EASY;
        // Arrange - Results
        const mazeSize = 10;
        const cellSize = 40;
        const levels = 2;

        // Act
        const result = getInitialGameConfigurations(type);

        // Assert
        expect(result.levels).toHaveLength(levels);
        expect(result.levels[0].mazeSize).toEqual(mazeSize);
        expect(result.levels[0].cellSize).toEqual(cellSize);
    });

    it("Should | return correct game configs | When | request difficulty NORMAL", async () => {
        // Arrange - Params
        const type = gameTypes.NORMAL;
        // Arrange - Results
        const mazeSize = 16;
        const cellSize = 40;
        const levels = 3;

        // Act
        const result = getInitialGameConfigurations(type);

        // Assert
        expect(result.levels).toHaveLength(levels);
        expect(result.levels[0].mazeSize).toEqual(mazeSize);
        expect(result.levels[0].cellSize).toEqual(cellSize);
    });

    it("Should | return correct game configs | When | request difficulty HARD", async () => {
        // Arrange - Params
        const type = gameTypes.HARD;
        // Arrange - Results
        const mazeSize = 20;
        const cellSize = 30;
        const levels = 4;

        // Act
        const result = getInitialGameConfigurations(type);

        // Assert
        expect(result.levels).toHaveLength(levels);
        expect(result.levels[0].mazeSize).toEqual(mazeSize);
        expect(result.levels[0].cellSize).toEqual(cellSize);
    });

    it("Should | return correct game configs | When | request difficulty VERY_HARD", async () => {
        // Arrange - Params
        const type = gameTypes.VERY_HARD;
        // Arrange - Results
        const mazeSize = 26;
        const cellSize = 26;
        const levels = 5;

        // Act
        const result = getInitialGameConfigurations(type);

        // Assert
        expect(result.levels).toHaveLength(levels);
        expect(result.levels[0].mazeSize).toEqual(mazeSize);
        expect(result.levels[0].cellSize).toEqual(cellSize);
    });

    it("Should | return correct game configs | When | request difficulty PAIN", async () => {
        // Arrange - Params
        const type = gameTypes.PAIN;
        // Arrange - Results
        const mazeSize = 40;
        const cellSize = 20;
        const levels = 6;

        // Act
        const result = getInitialGameConfigurations(type);

        // Assert
        expect(result.levels).toHaveLength(levels);
        expect(result.levels[0].mazeSize).toEqual(mazeSize);
        expect(result.levels[0].cellSize).toEqual(cellSize);
    });

    it("Should | return correct null | When | request incorrect difficulty", async () => {
        // Arrange - Params
        const type = 'wrong value';

        // Act
        const result = getInitialGameConfigurations(type);

        // Assert
        expect(result).toBeUndefined();
    });
});


