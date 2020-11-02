import {generateMaze} from './MazeGeneratorHelper';

describe('GameHelper getInitialGameConfigurations by GameType', () => {
    it("Should | return tile map with one more tile than requested | When | request size 6x6", async () => {
        // Arrange - Params
        const mazeSize = 6;

        // Arrange - Results
        const mazeLength = mazeSize + 1;

        // Acta
        const result = generateMaze(mazeSize, mazeSize);

        console.log(result);
        // Assert
        expect(result).toHaveLength(mazeLength);
        expect(result[0]).toHaveLength(mazeLength);
    });

    it("Should | return tile map with one more tile than requested | When | request size 20x20", async () => {
        // Arrange - Params
        const mazeSize = 20;

        // Arrange - Results
        const mazeLength = mazeSize + 1;

        // Acta
        const result = generateMaze(mazeSize, mazeSize);

        // Assert
        expect(result).toHaveLength(mazeLength);
        expect(result[0]).toHaveLength(mazeLength);
    });
});
